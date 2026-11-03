<?php
declare(strict_types=1);

require_once __DIR__ . '/bootstrap.php';
require_once __DIR__ . '/lib/posts.php';

$slug = trim((string) filter_input(INPUT_GET, 'slug', FILTER_UNSAFE_RAW));
$post = post_find_by_slug($slug, true);

if ($post === null) {
    http_response_code(404);
    require __DIR__ . '/404.php';
    exit;
}

$assetBase = '';
$isAdmin = false;

$title = (string) $post['title'];
$canonical = post_url($post);
$description = excerpt_from_html((string) $post['content_html'], 155);
if ($description === '') {
    $description = (string) ($post['excerpt'] ?? '');
}
$pageTitle = $title . ' | Krypton Energy Journal';
$pageDescription = $description;
$ogImage = trim((string) $post['cover_image']) !== '' ? rtrim(blog_url(), '/') . '/' . ltrim((string) $post['cover_image'], '/') : site_url_for('hero-poster-v3.jpg');
$ogType = 'article';

require __DIR__ . '/partials/head.php';
?>
<div id="top"></div>
<?php require __DIR__ . '/partials/header.php'; ?>

<article class="mx-auto max-w-4xl px-4 pt-10 sm:px-6 sm:pt-14 lg:px-8">
  <header class="mx-auto max-w-3xl">
    <nav class="mb-6 flex flex-wrap items-center gap-2 text-xs text-gray-500" aria-label="Breadcrumb">
      <a href="<?= e(blog_url()) ?>" class="transition-colors hover:text-[#e4d18e]">Journal</a>
      <span aria-hidden="true">/</span>
      <?php if (trim((string) $post['category']) !== ''): ?>
        <span><?= e((string) $post['category']) ?></span>
      <?php else: ?>
        <span>Article</span>
      <?php endif; ?>
    </nav>

    <div class="flex flex-wrap items-center gap-3">
      <?php if (trim((string) $post['category']) !== ''): ?>
        <span class="chip"><?= e((string) $post['category']) ?></span>
      <?php endif; ?>
      <div class="meta">
        <span><?= date('j F Y', strtotime((string) ($post['published_at'] ?? $post['created_at'] ?? 'now'))) ?></span>
        <span><?= reading_time((string) $post['content_html']) ?> min read</span>
      </div>
    </div>

    <h1 class="mt-5 font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"><?= e($title) ?></h1>
    <?php if ($description !== ''): ?>
      <p class="mt-5 max-w-2xl text-base leading-relaxed text-gray-300"><?= e($description) ?></p>
    <?php endif; ?>
  </header>

  <?php if (trim((string) $post['cover_image']) !== ''): ?>
    <figure class="mt-10 overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/50">
      <img src="<?= e($assetBase . $post['cover_image']) ?>" alt="<?= e($title) ?>" class="h-full w-full object-cover" loading="eager" decoding="async">
    </figure>
  <?php endif; ?>

  <div class="prose mx-auto mt-10 sm:mt-14">
    <?= $post['content_html'] ?>
  </div>

  <footer class="mx-auto mt-14 max-w-3xl border-t border-white/10 pt-8">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <a href="<?= e(blog_url()) ?>" class="btn-ghost">
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15 19l-7-7 7-7"/></svg>
        Back to the journal
      </a>
      <a href="<?= e(site_url_for('index.html?quote=1')) ?>" class="btn-gold">Start a solar project</a>
    </div>
  </footer>
</article>

<?php
$article = $post;
$related = post_related($article, 3);
if ($related !== []): ?>
  <section class="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
    <div class="mb-8 flex items-end justify-between gap-4 border-b border-white/10 pb-4">
      <h2 class="font-display text-xl font-semibold tracking-tight text-white">Continue reading</h2>
      <span class="text-[11px] uppercase tracking-[0.16em] text-gray-500">Related</span>
    </div>
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <?php foreach ($related as $post): ?>
        <?php require __DIR__ . '/partials/post-card.php'; ?>
      <?php endforeach; ?>
    </div>
  </section>
<?php endif; ?>

<?php require __DIR__ . '/partials/footer.php'; ?>
<script src="<?= e($assetBase) ?>assets/blog.js"></script>

<script type="application/ld+json">
<?= json_encode([
    '@context' => 'https://schema.org',
    '@type' => 'BlogPosting',
    'headline' => $title,
    'description' => $description,
    'image' => $ogImage,
    'datePublished' => date('c', strtotime((string) ($article['published_at'] ?? $article['created_at'] ?? 'now'))),
    'dateModified' => date('c', strtotime((string) ($article['updated_at'] ?? $article['published_at'] ?? $article['created_at'] ?? 'now'))),
    'author' => [
        '@type' => 'Organization',
        'name' => 'Krypton Energy',
    ],
    'publisher' => [
        '@type' => 'Organization',
        'name' => 'Krypton Energy',
        'logo' => [
            '@type' => 'ImageObject',
            'url' => site_url_for('kryptonlogo.png'),
        ],
    ],
    'mainEntityOfPage' => [
        '@type' => 'WebPage',
        '@id' => $canonical,
    ],
], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) ?>
</script>
</body>
</html>
