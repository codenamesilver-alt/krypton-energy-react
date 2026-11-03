<?php
declare(strict_types=1);

define('KRYPTON_BLOG', true);
require_once __DIR__ . '/../bootstrap.php';
require_once __DIR__ . '/../lib/auth.php';
require_once __DIR__ . '/../lib/uploads.php';

no_cache();
auth_require();

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed.']);
    exit;
}

require_csrf();

$file = $_FILES['image'] ?? null;

if (!is_array($file)) {
    http_response_code(200);
    echo json_encode(['ok' => false, 'error' => 'Choose an image first.']);
    exit;
}

$stored = upload_store($file, 'inline');

if (!$stored['ok'] || !is_string($stored['path'])) {
    echo json_encode(['ok' => false, 'error' => (string) ($stored['error'] ?? 'The image could not be uploaded.')]);
    exit;
}

echo json_encode([
    'ok'  => true,
    'url' => blog_url($stored['path']),
]);
