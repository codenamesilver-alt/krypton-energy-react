<?php
declare(strict_types=1);

/**
 * Admin authentication, sessions, and login rate limiting.
 */

function client_ip(): string
{
    $ip = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';

    return substr((string) $ip, 0, 45);
}

function auth_user(): ?array
{
    $id = $_SESSION['admin_id'] ?? null;
    if (!is_int($id) && !ctype_digit((string) $id)) {
        return null;
    }

    $row = db_fetch(
        'SELECT id, username, created_at, last_login_at FROM blog_admins WHERE id = ?',
        [(int) $id]
    );

    if ($row === null) {
        unset($_SESSION['admin_id']);
        return null;
    }

    return $row;
}

function auth_check(): bool
{
    return auth_user() !== null;
}

function auth_require(): void
{
    if (!auth_check()) {
        redirect(blog_url('admin/login.php'));
    }
}

function auth_attempts_exceeded(string $ip, string $username, int $max = 5, int $minutes = 15): bool
{
    $cutoff = date('Y-m-d H:i:s', time() - ($minutes * 60));
    $row = db_fetch(
        'SELECT COUNT(*) AS total FROM blog_login_attempts
         WHERE ip = ? AND username = ? AND attempted_at >= ?',
        [$ip, $username, $cutoff]
    );

    return (int) ($row['total'] ?? 0) >= $max;
}

function auth_record_attempt(string $ip, string $username): void
{
    db_exec(
        'INSERT INTO blog_login_attempts (ip, username, attempted_at) VALUES (?, ?, ?)',
        [$ip, $username, date('Y-m-d H:i:s')]
    );

    // Keep the table small; only the last day can matter.
    db_exec('DELETE FROM blog_login_attempts WHERE attempted_at < ?', [
        date('Y-m-d H:i:s', time() - 86400),
    ]);
}

function auth_clear_attempts(string $ip, string $username): void
{
    db_exec('DELETE FROM blog_login_attempts WHERE ip = ? AND username = ?', [$ip, $username]);
}

function auth_regenerate(): void
{
    if (!headers_sent()) {
        session_regenerate_id(true);
    }
}

function auth_login(string $username, string $password): bool
{
    $username = trim($username);
    $ip = client_ip();

    if ($username === '' || $password === '') {
        return false;
    }

    if (auth_attempts_exceeded($ip, $username)) {
        return false;
    }

    $row = db_fetch('SELECT * FROM blog_admins WHERE username = ?', [$username]);

    if ($row === null || !password_verify($password, (string) $row['password_hash'])) {
        auth_record_attempt($ip, $username);
        return false;
    }

    if (password_needs_rehash((string) $row['password_hash'], PASSWORD_DEFAULT)) {
        db_exec('UPDATE blog_admins SET password_hash = ? WHERE id = ?', [
            password_hash($password, PASSWORD_DEFAULT),
            (int) $row['id'],
        ]);
    }

    auth_regenerate();
    $_SESSION['admin_id'] = (int) $row['id'];

    db_exec('UPDATE blog_admins SET last_login_at = NOW() WHERE id = ?', [(int) $row['id']]);
    auth_clear_attempts($ip, $username);

    return true;
}

function auth_logout(): void
{
    unset($_SESSION['admin_id']);
    auth_regenerate();
}

function auth_change_password(int $adminId, string $current, string $new): bool
{
    if (mb_strlen($new, 'UTF-8') < 12) {
        return false;
    }

    $row = db_fetch('SELECT id, password_hash FROM blog_admins WHERE id = ?', [$adminId]);
    if ($row === null || !password_verify($current, (string) $row['password_hash'])) {
        return false;
    }

    db_exec('UPDATE blog_admins SET password_hash = ? WHERE id = ?', [
        password_hash($new, PASSWORD_DEFAULT),
        $adminId,
    ]);

    auth_regenerate();

    return true;
}
