<?php
declare(strict_types=1);

define('KRYPTON_BLOG', true);
require_once __DIR__ . '/../bootstrap.php';
require_once __DIR__ . '/../lib/auth.php';

no_cache();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    header('Content-Type: text/plain; charset=utf-8');
    header('Allow: POST');
    echo 'Method not allowed.';
    exit;
}

require_csrf();
auth_logout();
redirect(blog_url('admin/login.php'));
