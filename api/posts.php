<?php
declare(strict_types=1);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

require __DIR__ . '/db.php';
$pdo = require __DIR__ . '/db.php';
$config = require __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];

// Helper: verify admin token
function verifyToken(string $token, array $config): bool {
    // Simple token: base64(username:password_hash_prefix:secret)
    // For production, use JWT. This is a simplified version.
    $decoded = base64_decode($token, true);
    if ($decoded === false) return false;
    $parts = explode(':', $decoded);
    if (count($parts) !== 3) return false;
    [$username, $hashPrefix, $secret] = $parts;
    if ($secret !== $config['jwt_secret']) return false;
    
    $stmt = $GLOBALS['pdo']->prepare('SELECT password_hash FROM blog_admins WHERE username = ?');
    $stmt->execute([$username]);
    $row = $stmt->fetch();
    if (!$row) return false;
    return substr($row['password_hash'], 0, 10) === $hashPrefix;
}

// GET - list or single post
if ($method === 'GET') {
    $slug = $_GET['slug'] ?? null;
    $id = $_GET['id'] ?? null;
    $all = isset($_GET['all']); // admin: include drafts
    
    if ($slug) {
        $stmt = $pdo->prepare('SELECT * FROM blog_posts WHERE slug = ?');
        $stmt->execute([$slug]);
        $post = $stmt->fetch();
        if (!$post) {
            http_response_code(404);
            echo json_encode(['error' => 'Post not found']);
            exit;
        }
        // Don't expose drafts to public
        if ($post['status'] === 'draft' && !$all) {
            http_response_code(404);
            echo json_encode(['error' => 'Post not found']);
            exit;
        }
        echo json_encode($post);
        exit;
    }
    
    if ($id) {
        $stmt = $pdo->prepare('SELECT * FROM blog_posts WHERE id = ?');
        $stmt->execute([$id]);
        $post = $stmt->fetch();
        if (!$post) {
            http_response_code(404);
            echo json_encode(['error' => 'Post not found']);
            exit;
        }
        echo json_encode($post);
        exit;
    }
    
    // List posts
    if ($all) {
        $stmt = $pdo->query('SELECT * FROM blog_posts ORDER BY created_at DESC');
    } else {
        $stmt = $pdo->query("SELECT * FROM blog_posts WHERE status = 'published' ORDER BY published_at DESC");
    }
    $posts = $stmt->fetchAll();
    echo json_encode($posts);
    exit;
}

// POST - create post
if ($method === 'POST') {
    $token = str_replace('Bearer ', '', $_SERVER['HTTP_AUTHORIZATION'] ?? '');
    if (!verifyToken($token, $config)) {
        http_response_code(401);
        echo json_encode(['error' => 'Unauthorized']);
        exit;
    }
    
    $data = json_decode(file_get_contents('php://input'), true);
    if (!$data || empty($data['title']) || empty($data['content_html'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Title and content are required']);
        exit;
    }
    
    $title = trim($data['title']);
    $slug = $data['slug'] ?? '';
    if (empty($slug)) {
        $slug = strtolower(trim(preg_replace('/[^a-zA-Z0-9]+/', '-', $title), '-'));
    }
    // Ensure unique slug
    $baseSlug = $slug;
    $counter = 1;
    while (true) {
        $stmt = $pdo->prepare('SELECT COUNT(*) FROM blog_posts WHERE slug = ?');
        $stmt->execute([$slug]);
        if ($stmt->fetchColumn() == 0) break;
        $slug = $baseSlug . '-' . $counter++;
    }
    
    $status = $data['status'] ?? 'draft';
    $publishedAt = ($status === 'published') ? date('Y-m-d H:i:s') : null;
    $excerpt = $data['excerpt'] ?? '';
    if (empty($excerpt)) {
        $excerpt = mb_substr(strip_tags($data['content_html']), 0, 180);
    }
    
    $stmt = $pdo->prepare('INSERT INTO blog_posts (title, slug, category, excerpt, content_html, cover_image, status, published_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
    $stmt->execute([
        $title,
        $slug,
        $data['category'] ?? null,
        $excerpt,
        $data['content_html'],
        $data['cover_image'] ?? null,
        $status,
        $publishedAt
    ]);
    
    $id = $pdo->lastInsertId();
    $stmt = $pdo->prepare('SELECT * FROM blog_posts WHERE id = ?');
    $stmt->execute([$id]);
    echo json_encode($stmt->fetch());
    exit;
}

// PUT - update post
if ($method === 'PUT') {
    $token = str_replace('Bearer ', '', $_SERVER['HTTP_AUTHORIZATION'] ?? '');
    if (!verifyToken($token, $config)) {
        http_response_code(401);
        echo json_encode(['error' => 'Unauthorized']);
        exit;
    }
    
    $id = $_GET['id'] ?? null;
    if (!$id) {
        http_response_code(400);
        echo json_encode(['error' => 'Post ID required']);
        exit;
    }
    
    $data = json_decode(file_get_contents('php://input'), true);
    if (!$data) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid data']);
        exit;
    }
    
    // Get current post
    $stmt = $pdo->prepare('SELECT * FROM blog_posts WHERE id = ?');
    $stmt->execute([$id]);
    $current = $stmt->fetch();
    if (!$current) {
        http_response_code(404);
        echo json_encode(['error' => 'Post not found']);
        exit;
    }
    
    $title = trim($data['title'] ?? $current['title']);
    $slug = $data['slug'] ?? $current['slug'];
    $status = $data['status'] ?? $current['status'];
    
    // If publishing for the first time, set published_at
    $publishedAt = $current['published_at'];
    if ($status === 'published' && $publishedAt === null) {
        $publishedAt = date('Y-m-d H:i:s');
    }
    
    $excerpt = $data['excerpt'] ?? $current['excerpt'];
    if (empty($excerpt) && isset($data['content_html'])) {
        $excerpt = mb_substr(strip_tags($data['content_html']), 0, 180);
    }
    
    $stmt = $pdo->prepare('UPDATE blog_posts SET title = ?, slug = ?, category = ?, excerpt = ?, content_html = ?, cover_image = ?, status = ?, published_at = ? WHERE id = ?');
    $stmt->execute([
        $title,
        $slug,
        $data['category'] ?? $current['category'],
        $excerpt,
        $data['content_html'] ?? $current['content_html'],
        $data['cover_image'] ?? $current['cover_image'],
        $status,
        $publishedAt,
        $id
    ]);
    
    $stmt = $pdo->prepare('SELECT * FROM blog_posts WHERE id = ?');
    $stmt->execute([$id]);
    echo json_encode($stmt->fetch());
    exit;
}

// DELETE - delete post
if ($method === 'DELETE') {
    $token = str_replace('Bearer ', '', $_SERVER['HTTP_AUTHORIZATION'] ?? '');
    if (!verifyToken($token, $config)) {
        http_response_code(401);
        echo json_encode(['error' => 'Unauthorized']);
        exit;
    }
    
    $id = $_GET['id'] ?? null;
    if (!$id) {
        http_response_code(400);
        echo json_encode(['error' => 'Post ID required']);
        exit;
    }
    
    $stmt = $pdo->prepare('DELETE FROM blog_posts WHERE id = ?');
    $stmt->execute([$id]);
    echo json_encode(['success' => true]);
    exit;
}