<?php
declare(strict_types=1);

if (!defined('KRYPTON_BLOG')) {
    define('KRYPTON_BLOG', true);
}

require_once __DIR__ . '/bootstrap.php';

if (http_response_code() !== 404) {
    http_response_code(404);
}

$assetBase = '';
$isAdmin = false;
$pageTitle = $pageTitle ?? 'Page not found | Krypton Energy';
$pageDescription = 'That page is not part of the Krypton Journal.';
$canonical = blog_url();
$robots = 'noindex, follow';

require __DIR__ . '/partials/head.php';
?>
<div id="top"></div>
<?php require __DIR__ . '/partials/header.php'; ?>

<main id="main-content" class="mx-auto flex w-full max-w-3xl flex-1 flex-col items-start px-4 py-24 sm:px-6">
  <p class="eyebrow">404</p>
  <h1 class="mt-5 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
    This page is not in the journal.
  </h1>
  <p class="mt-4 max-w-lg text-sm leading-relaxed text-gray-400">
    The link may be old, or the article may have been unpublished. The full archive is one click away.
  </p>
  <div class="mt-8 flex flex-wrap gap-3">
    <a href="<?= e(blog_url()) ?>" class="btn-gold">Back to the journal</a>
    <a href="<?= e(site_url_for('index.html')) ?>" class="btn-ghost">Krypton Energy home</a>
  </div>
</main>

<?php require __DIR__ . '/partials/footer.php'; ?>
<script src="<?= e($assetBase) ?>assets/blog.js"></script>
</body>
</html>
