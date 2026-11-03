<?php
declare(strict_types=1);

/**
 * KRYPTON blog configuration — EXAMPLE.
 *
 * Copy this file to `config.php` and fill in the real values:
 *
 *     copy blog\config.example.php blog\config.php
 *
 * `blog/config.php` is git-ignored because it holds database credentials.
 * This example file is safe to commit.
 *
 * The returned array refuses to run unless it was included by the blog's own
 * bootstrap, so a direct HTTP request can never dump the password.
 */

if (!defined('KRYPTON_BLOG')) {
    http_response_code(403);
    header('Content-Type: text/plain; charset=utf-8');
    echo 'Forbidden';
    exit;
}

return [
    // ---- Database ----
    'db_host'    => 'localhost',
    'db_port'    => 3306,
    'db_name'    => 'krypton_blog',
    'db_user'    => 'root',
    'db_pass'    => '',
    'db_charset' => 'utf8mb4',

    // ---- Site ----
    // Absolute URL of the main site, without a trailing slash.
    'site_url' => 'http://localhost/KRYPTON',

    // Show errors on screen. Always false in production.
    'debug' => false,

    // true  -> /blog/<slug>
    // false -> /blog/post.php?slug=<slug>
    // Both forms always resolve; this only decides which one is emitted.
    'pretty_urls' => true,

    // One-time secret for the web installer. Set a long random value before
    // opening /blog/install.php?token=<value>, then clear it after setup.
    'install_token' => '',
];
