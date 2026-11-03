<?php
declare(strict_types=1);

if (!defined('KRYPTON_BLOG')) {
    http_response_code(403);
    header('Content-Type: text/plain; charset=utf-8');
    echo 'Forbidden';
    exit;
}

return [
    'db_host'    => 'localhost',
    'db_port'    => 3306,
    'db_name'    => 'krypton_blog_v2',
    'db_user'    => 'root',
    'db_pass'    => '',
    'db_charset' => 'utf8mb4',
    'site_url'   => 'http://localhost',
    'debug'      => false,
    'pretty_urls' => true,
    'install_token' => '',
];
