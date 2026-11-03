<?php
declare(strict_types=1);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

require __DIR__ . '/db.php';
$pdo = require __DIR__ . '/db.php';
$config = require __DIR__ . '/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$username = trim($data['username'] ?? '');
$password = $data['password'] ?? '';

if (empty($username) || empty($password)) {
    http_response_code(400);
    echo json_encode(['error' => 'Username and password required']);
    exit;
}

$stmt = $pdo->prepare('SELECT id, username, password_hash FROM blog_admins WHERE username = ?');
$stmt->execute([$username]);
$admin = $stmt->fetch();

if (!$admin || !password_verify($password, $admin['password_hash'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Invalid credentials']);
    exit;
}

// Generate token
$token = base64_encode($admin['username'] . ':' . substr($admin['password_hash'], 0, 10) . ':' . $config['jwt_secret']);

// Update last login
$stmt = $pdo->prepare('UPDATE blog_admins SET last_login_at = NOW() WHERE id = ?');
$stmt->execute([$admin['id']]);

echo json_encode([
    'token' => $token,
    'username' => $admin['username']
]);