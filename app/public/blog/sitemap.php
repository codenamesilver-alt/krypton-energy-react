<?php
declare(strict_types=1);

require_once __DIR__ . '/bootstrap.php';
require_once __DIR__ . '/lib/db.php';
require_once __DIR__ . '/lib/posts.php';

header('Content-Type: application/xml; charset=utf-8');

$posts = db_fetch_all(
    "SELECT slug, updated_at, published_at FROM blog_posts
     WHERE status = 'published'
     ORDER BY published_at DESC, id DESC"
);

$xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
$xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";

$xml .= "  <url>\n";
$xml .= '    <loc>' . htmlspecialchars(blog_url(), ENT_XML1 | ENT_QUOTES, 'UTF-8') . "</loc>\n";
$xml .= '    <changefreq>weekly</changefreq>' . "\n";
$xml .= "  </url>\n";

foreach ($posts as $post) {
    $lastmod = (string) ($post['updated_at'] ?? $post['published_at'] ?? '');
    $xml .= "  <url>\n";
    $xml .= '    <loc>' . htmlspecialchars(post_url($post), ENT_XML1 | ENT_QUOTES, 'UTF-8') . "</loc>\n";
    if ($lastmod !== '') {
        $xml .= '    <lastmod>' . date('c', strtotime($lastmod)) . "</lastmod>\n";
    }
    $xml .= "  </url>\n";
}

$xml .= '</urlset>' . "\n";

echo $xml;
