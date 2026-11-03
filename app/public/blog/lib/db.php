<?php
declare(strict_types=1);

/**
 * PDO connection and thin query helpers.
 *
 * One connection per request. Prepared statements only; emulated prepares are
 * disabled so MySQL does the real parameter binding.
 */

function db(): PDO
{
    static $pdo = null;

    if ($pdo instanceof PDO) {
        return $pdo;
    }

    $config = blog_config();

    $dsn = sprintf(
        'mysql:host=%s;port=%d;dbname=%s;charset=%s',
        (string) $config['db_host'],
        (int) $config['db_port'],
        (string) $config['db_name'],
        (string) $config['db_charset']
    );

    $pdo = new PDO($dsn, (string) $config['db_user'], (string) $config['db_pass'], [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ]);

    return $pdo;
}

function db_query(string $sql, array $params = []): PDOStatement
{
    $stmt = db()->prepare($sql);
    $stmt->execute($params);

    return $stmt;
}

function db_fetch(string $sql, array $params = []): ?array
{
    $row = db_query($sql, $params)->fetch();

    return is_array($row) ? $row : null;
}

function db_fetch_all(string $sql, array $params = []): array
{
    return db_query($sql, $params)->fetchAll();
}

function db_exec(string $sql, array $params = []): int
{
    return db_query($sql, $params)->rowCount();
}
