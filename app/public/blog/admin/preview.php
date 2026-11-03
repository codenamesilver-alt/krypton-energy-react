<?php
declare(strict_types=1);

define('KRYPTON_BLOG', true);
require_once __DIR__ . '/../bootstrap.php';
require_once __DIR__ . '/../lib/auth.php';
require_once __DIR__ . '/../lib/content.php';

no_cache();
auth_require();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    header('Content-Type: text/plain; charset=utf-8');
    header('Allow: POST');
    echo 'Method not allowed.';
    exit;
}

require_csrf();

$title = trim((string) ($_POST['title'] ?? ''));
$category = trim((string) ($_POST['category'] ?? ''));
$excerpt = trim((string) ($_POST['excerpt'] ?? ''));
$content = sanitize_html((string) ($_POST['content_html'] ?? ''));
$slug = trim((string) ($_POST['slug'] ?? ''));

if ($title === '') {
    $title = 'Untitled article';
}

if ($excerpt === '') {
    $excerpt = excerpt_from_html($content, 180);
}

$assetBase = '../';
$isAdmin = true;
$pageTitle = 'Preview: ' . $title . ' | Krypton Journal Admin';
$pageDescription = $excerpt !== '' ? $excerpt : 'Draft preview.';
$robots = 'noindex, nofollow';
$canonical = blog_url('admin/preview.php');

require __DIR__ . '/../partials/head.php';
?>
<div class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
  <a href="edit.php<?= $slug !== '' ? '?slug=' . e(rawurlencode($slug)) : '' ?>" class="btn-ghost">
    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15 19l-7-7 7-7"/></svg>
    Back to the editor
  </a>
  <img src="../../kryptonlogo.png" alt="Krypton Energy" class="h-10 w-auto">
</div>

<div class="border-y border-amber-400/40 bg-amber-400/10 px-4 py-3 text-center text-sm text-amber-100" role="status">
  <strong class="font-semibold">Preview — not saved.</strong>
  This is how the article will look once you publish it. Nothing has been written to the database.
</div>

<article class="mx-auto max-w-4xl px-4 pt-10 sm:px-6 sm:pt-14 lg:px-8">
  <header class="mx-auto max-w-3xl">
    <div class="flex flex-wrap items-center gap-3">
      <?php if ($category !== ''): ?>
        <span class="chip"><?= e($category) ?></span>
      <?php endif; ?>
      <div class="meta">
        <span><?= e(date('j F Y')) ?></span>
        <span><?= reading_time($content) ?> min read</span>
      </div>
    </div>
    <h1 class="mt-5 font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"><?= e($title) ?></h1>
    <?php if ($excerpt !== ''): ?>
      <p class="mt-5 max-w-2xl text-base leading-relaxed text-gray-300"><?= e($excerpt) ?></p>
    <?php endif; ?>
  </header>

  <div class="prose mx-auto mt-10 sm:mt-14">
    <?= $content ?>
  </div>
</article>

<p class="mx-auto mt-14 max-w-4xl px-4 pb-16 text-center text-xs text-gray-500 sm:px-6">
  <a href="dashboard.php" class="transition-colors hover:text-[#e4d18e]">Back to articles</a>
</p>
</body>
</html>
