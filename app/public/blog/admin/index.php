<?php
declare(strict_types=1);

define('KRYPTON_BLOG', true);
require_once __DIR__ . '/../bootstrap.php';
require_once __DIR__ . '/../lib/auth.php';

if (auth_check()) {
    redirect(blog_url('admin/dashboard.php'));
}

redirect(blog_url('admin/login.php'));
