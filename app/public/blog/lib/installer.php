<?php
declare(strict_types=1);

/**
 * Installer building blocks, kept in a library so they can be tested.
 */

function install_connect(): PDO
{
    $config = blog_config();
    $name = (string) $config['db_name'];
    $safeName = str_replace('`', '', $name);

    try {
        $server = new PDO(
            sprintf('mysql:host=%s;port=%d', (string) $config['db_host'], (int) $config['db_port']),
            (string) $config['db_user'],
            (string) $config['db_pass'],
            [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
        );
        $server->exec(
            'CREATE DATABASE IF NOT EXISTS `' . $safeName . '` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci'
        );
    } catch (Throwable) {
        // Shared hosts usually forbid CREATE DATABASE; the database already
        // exists in hPanel and db() will connect to it below.
    }

    return db();
}

function install_schema(PDO $pdo): void
{
    $path = __DIR__ . '/../schema.sql';
    $sql = is_file($path) ? (string) file_get_contents($path) : '';

    foreach (explode(';', $sql) as $statement) {
        $lines = preg_split('/\r?\n/', $statement) ?: [];
        $lines = array_filter($lines, static fn (string $line): bool => !str_starts_with(ltrim($line), '--'));
        $clean = trim(implode("\n", $lines));

        if ($clean !== '') {
            $pdo->exec($clean);
        }
    }
}

function install_admin_exists(PDO $pdo): bool
{
    $stmt = $pdo->query('SELECT COUNT(*) FROM blog_admins');

    return (int) $stmt->fetchColumn() > 0;
}

function install_create_admin(PDO $pdo, string $username, string $password): bool
{
    $username = trim($username);

    if ($username === '' || mb_strlen($username, 'UTF-8') > 60) {
        return false;
    }

    if (mb_strlen($password, 'UTF-8') < 12) {
        return false;
    }

    $check = $pdo->prepare('SELECT id FROM blog_admins WHERE username = ? LIMIT 1');
    $check->execute([$username]);
    if ($check->fetch() !== false) {
        return false;
    }

    $insert = $pdo->prepare('INSERT INTO blog_admins (username, password_hash) VALUES (?, ?)');
    $insert->execute([$username, password_hash($password, PASSWORD_DEFAULT)]);

    return true;
}

function install_token_matches(string $expected, string $given): bool
{
    if ($expected === '' || $given === '') {
        return false;
    }

    return hash_equals($expected, $given);
}

function install_token_valid(string $given): bool
{
    return install_token_matches((string) blog_config('install_token', ''), $given);
}

function install_ensure_uploads(): void
{
    $dir = __DIR__ . '/../uploads';
    if (!is_dir($dir)) {
        @mkdir($dir, 0775, true);
    }

    $htaccess = $dir . '/.htaccess';
    if (!is_file($htaccess)) {
        @file_put_contents($htaccess, "Options -Indexes\n\n<FilesMatch \"\\.(php|phtml|phar|cgi|pl|py|sh|htm|html)$\">\n  Require all denied\n</FilesMatch>\n");
    }
}
