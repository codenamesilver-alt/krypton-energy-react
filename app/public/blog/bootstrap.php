<?php
declare(strict_types=1);

/**
 * Blog bootstrap: configuration, helpers, session.
 *
 * Every public and admin entry point includes this file first.
 */

if (!defined('KRYPTON_BLOG')) {
    define('KRYPTON_BLOG', true);
}

require_once __DIR__ . '/lib/db.php';

date_default_timezone_set('Asia/Kolkata');

/**
 * Read the configuration array, or one key from it.
 *
 * @return mixed
 */
function blog_config(?string $key = null, mixed $default = null): mixed
{
    static $config = null;

    if ($config === null) {
        $path = __DIR__ . '/config.php';
        if (!is_file($path)) {
            http_response_code(500);
            header('Content-Type: text/plain; charset=utf-8');
            echo 'Blog is not configured yet. Copy config.example.php to config.php.';
            exit;
        }

        $loaded = require $path;
        if (!is_array($loaded)) {
            http_response_code(500);
            header('Content-Type: text/plain; charset=utf-8');
            echo 'Blog configuration must return an array.';
            exit;
        }

        $config = $loaded;
    }

    if ($key === null) {
        return $config;
    }

    return array_key_exists($key, $config) ? $config[$key] : $default;
}

function e(?string $value): string
{
    return htmlspecialchars((string) $value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

/** Absolute URL of a path inside the blog. */
function blog_url(string $path = ''): string
{
    return rtrim((string) blog_config('site_url'), '/') . '/blog/' . ltrim($path, '/');
}

/** Absolute URL of a path inside the main site. */
function site_url_for(string $path = ''): string
{
    return rtrim((string) blog_config('site_url'), '/') . '/' . ltrim($path, '/');
}

/**
 * Canonical URL for an article, following the configured URL style.
 */
function post_url(array $post): string
{
    $slug = (string) ($post['slug'] ?? '');

    if (blog_config('pretty_urls', true) === true) {
        return blog_url(rawurlencode($slug));
    }

    return blog_url('post.php?slug=' . rawurlencode($slug));
}

function redirect(string $path): never
{
    header('Location: ' . $path, true, 302);
    exit;
}

/**
 * Set a flash message, or read and clear one.
 */
function flash(string $key, ?string $message = null): ?string
{
    if ($message !== null) {
        $_SESSION['flash'][$key] = $message;
        return null;
    }

    $value = $_SESSION['flash'][$key] ?? null;
    unset($_SESSION['flash'][$key]);

    return is_string($value) ? $value : null;
}

function csrf_token(): string
{
    if (empty($_SESSION['csrf_token']) || !is_string($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }

    return $_SESSION['csrf_token'];
}

function csrf_field(): string
{
    return '<input type="hidden" name="_token" value="' . e(csrf_token()) . '">';
}

/**
 * Reject the request unless it carries the current session's CSRF token.
 */
function require_csrf(): void
{
    $sent = $_POST['_token'] ?? '';

    if (!is_string($sent) || $sent === '' || !hash_equals(csrf_token(), $sent)) {
        http_response_code(400);
        header('Content-Type: text/plain; charset=utf-8');
        echo 'Invalid request token. Reload the page and try again.';
        exit;
    }
}

function no_cache(): void
{
    header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
    header('Pragma: no-cache');
    header('Expires: 0');
}

/** True when the current request arrived over HTTPS. */
function is_https(): bool
{
    if (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') {
        return true;
    }

    return isset($_SERVER['HTTP_X_FORWARDED_PROTO'])
        && strtolower((string) $_SERVER['HTTP_X_FORWARDED_PROTO']) === 'https';
}

// ---- Session -----------------------------------------------------------------

if (session_status() === PHP_SESSION_NONE) {
    $secure = is_https();

    // The cookie has to cover the blog wherever it is installed: /blog/ at a
    // domain root, or /KRYPTON/blog/ inside a local XAMPP htdocs folder.
    $sitePath = (string) (parse_url((string) blog_config('site_url'), PHP_URL_PATH) ?? '');
    $cookiePath = rtrim($sitePath, '/') . '/blog/';

    session_set_cookie_params([
        'lifetime' => 0,
        'path'     => $cookiePath,
        'secure'   => $secure,
        'httponly' => true,
        'samesite' => 'Lax',
    ]);
    session_name('krypton_blog_session');
    session_start();
}
