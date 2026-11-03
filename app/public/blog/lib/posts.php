<?php
declare(strict_types=1);

require_once __DIR__ . '/content.php';

/**
 * Post CRUD and queries.
 */

function post_find(int $id): ?array
{
    return db_fetch('SELECT * FROM blog_posts WHERE id = ?', [$id]);
}

function post_find_by_slug(string $slug, bool $publishedOnly = true): ?array
{
    $slug = trim($slug);
    if ($slug === '') {
        return null;
    }

    $sql = 'SELECT * FROM blog_posts WHERE slug = ?';
    if ($publishedOnly) {
        $sql .= " AND status = 'published'";
    }

    return db_fetch($sql . ' LIMIT 1', [$slug]);
}

function post_all(): array
{
    return db_fetch_all('SELECT * FROM blog_posts ORDER BY updated_at DESC, id DESC');
}

function post_published_count(): int
{
    $row = db_fetch("SELECT COUNT(*) AS total FROM blog_posts WHERE status = 'published'");

    return (int) ($row['total'] ?? 0);
}

/**
 * @return array{posts: array<int, array>, page: int, pages: int, total: int}
 */
function post_paginate(int $page, int $perPage = 9): array
{
    $page = max(1, $page);
    $perPage = max(1, $perPage);
    $total = post_published_count();
    $pages = max(1, (int) ceil($total / $perPage));

    if ($page > $pages) {
        $page = $pages;
    }

    $offset = ($page - 1) * $perPage;

    $posts = db_fetch_all(
        "SELECT * FROM blog_posts WHERE status = 'published'
         ORDER BY published_at DESC, id DESC
         LIMIT " . $perPage . ' OFFSET ' . $offset
    );

    return [
        'posts' => $posts,
        'page'  => $page,
        'pages' => $pages,
        'total' => $total,
    ];
}

/**
 * Create or update a post and return its id.
 */
function post_save(array $input, ?int $id = null): int
{
    $title = trim((string) ($input['title'] ?? ''));
    $content = sanitize_html((string) ($input['content_html'] ?? ''));

    $category = trim((string) ($input['category'] ?? ''));
    $category = $category === '' ? null : mb_substr($category, 0, 80, 'UTF-8');

    $excerpt = trim((string) ($input['excerpt'] ?? ''));
    if ($excerpt === '') {
        $excerpt = excerpt_from_html($content, 180);
    }
    $excerpt = mb_substr($excerpt, 0, 400, 'UTF-8');

    $cover = trim((string) ($input['cover_image'] ?? ''));
    $cover = $cover === '' ? null : $cover;

    $slugInput = trim((string) ($input['slug'] ?? ''));
    $slugBase = $slugInput !== '' ? $slugInput : $title;
    $slug = unique_slug(db(), $slugBase, $id);

    $status = ($input['status'] ?? 'draft') === 'published' ? 'published' : 'draft';

    $existing = $id !== null ? post_find($id) : null;
    $publishedAt = $existing['published_at'] ?? null;

    if ($status === 'published' && $publishedAt === null) {
        $publishedAt = date('Y-m-d H:i:s');
    }

    if ($id === null) {
        db_exec(
            'INSERT INTO blog_posts
                (title, slug, category, excerpt, content_html, cover_image, status, published_at)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [$title, $slug, $category, $excerpt, $content, $cover, $status, $publishedAt]
        );

        return (int) db()->lastInsertId();
    }

    db_exec(
        'UPDATE blog_posts
         SET title = ?, slug = ?, category = ?, excerpt = ?, content_html = ?,
             cover_image = ?, status = ?, published_at = ?
         WHERE id = ?',
        [$title, $slug, $category, $excerpt, $content, $cover, $status, $publishedAt, $id]
    );

    return $id;
}

function post_delete(int $id): bool
{
    return db_exec('DELETE FROM blog_posts WHERE id = ?', [$id]) > 0;
}

function post_set_status(int $id, string $status): bool
{
    if (!in_array($status, ['draft', 'published'], true)) {
        return false;
    }

    if ($status === 'published') {
        return db_exec(
            "UPDATE blog_posts SET status = 'published', published_at = COALESCE(published_at, NOW()) WHERE id = ?",
            [$id]
        ) > 0;
    }

    return db_exec("UPDATE blog_posts SET status = 'draft' WHERE id = ?", [$id]) > 0;
}

/**
 * Same-category posts first, then the latest other posts.
 *
 * @return array<int, array>
 */
function post_related(array $post, int $limit = 3): array
{
    $limit = max(0, $limit);
    if ($limit === 0) {
        return [];
    }

    $id = (int) ($post['id'] ?? 0);
    $category = trim((string) ($post['category'] ?? ''));
    $related = [];

    if ($category !== '') {
        $related = db_fetch_all(
            "SELECT * FROM blog_posts
             WHERE status = 'published' AND id <> ? AND category = ?
             ORDER BY published_at DESC, id DESC
             LIMIT " . $limit,
            [$id, $category]
        );
    }

    if (count($related) >= $limit) {
        return $related;
    }

    $exclude = array_merge([$id], array_map(static fn (array $row): int => (int) $row['id'], $related));
    $placeholders = implode(',', array_fill(0, count($exclude), '?'));

    $fill = db_fetch_all(
        "SELECT * FROM blog_posts
         WHERE status = 'published' AND id NOT IN ($placeholders)
         ORDER BY published_at DESC, id DESC
         LIMIT " . ($limit - count($related)),
        $exclude
    );

    return array_merge($related, $fill);
}
