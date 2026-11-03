<?php
declare(strict_types=1);

define('KRYPTON_BLOG', true);
require_once __DIR__ . '/../bootstrap.php';
require_once __DIR__ . '/../lib/auth.php';
require_once __DIR__ . '/../lib/posts.php';

no_cache();
auth_require();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    header('Content-Type: text/plain; charset=utf-8');
    header('Allow: POST');
    echo 'Method not allowed.';
    exit;
}

require_csrf();

$id = filter_input(INPUT_POST, 'id', FILTER_VALIDATE_INT);

if (!is_int($id) || $id <= 0 || post_find($id) === null) {
    flash('error', 'That article no longer exists.');
    redirect(blog_url('admin/dashboard.php'));
}

// The cover file is deliberately left on disk: the admin deliberately has no
// media manager, and an accidental delete should not destroy an image that is
// still referenced from an old cached page.
post_delete($id);

flash('notice', 'Article deleted.');
redirect(blog_url('admin/dashboard.php'));
