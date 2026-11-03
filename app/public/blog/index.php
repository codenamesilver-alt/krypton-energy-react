<?php
declare(strict_types=1);

require_once __DIR__ . '/bootstrap.php';
require_once __DIR__ . '/lib/posts.php';

$pageParam = filter_input(INPUT_GET, 'page', FILTER_VALIDATE_INT);
$page = is_int($pageParam) && $pageParam > 0 ? $pageParam : 1;

$result = post_paginate($page);

if ($result['total'] > 0 && $page > $result['pages']) {
    http_response_code(404);
    $pageTitle = 'Page not found | Krypton Energy';
    require __DIR__ . '/404.php';
    exit;
}

$assetBase = '';
$isAdmin = false;
$pageTitle = $page > 1
    ? 'Insights — page ' . $page . ' | Krypton Energy'
    : 'Insights | Krypton Energy';
$pageDescription = 'Practical thinking on solar, storage, and smart EV charging from the Krypton Energy team.';
$canonical = blog_url($page > 1 ? '?page=' . $page : '');
$ogImage = site_url_for('hero-poster-v3.jpg');

$posts = $result['posts'];
$featuredPost = null;
$grid = $posts;

if ($page === 1 && $posts !== []) {
    $featuredPost = array_shift($grid);
}

require __DIR__ . '/partials/head.php';
?>
<div id="top"></div>
<?php require __DIR__ . '/partials/header.php'; ?>

<main id="main-content" class="flex-1">
  <section class="blog-hero relative">
    <div class="relative mx-auto max-w-6xl px-4 pb-14 pt-16 sm:px-6 sm:pb-16 sm:pt-20 lg:px-8">
      <p class="eyebrow fade-up">The Krypton Journal</p>
      <h1 class="hero-title fade-up mt-5 max-w-3xl text-4xl text-white sm:text-5xl lg:text-6xl">
        Ideas that power a <em>cleaner</em> tomorrow.
      </h1>
      <p class="fade-up mt-5 max-w-2xl text-sm leading-relaxed text-gray-300 sm:text-base">
        Field notes on rooftop solar, battery storage, and EV charging — written for Indian homes and businesses making the switch.
      </p>
      <div class="fade-up mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-[11px] uppercase tracking-[0.18em] text-gray-500">
        <span><?= (int) $result['total'] ?> article<?= $result['total'] === 1 ? '' : 's' ?></span>
        <span class="h-px w-10 bg-[#e4d18e]/40"></span>
        <span>Updated for <?= e(date('Y')) ?></span>
      </div>
    </div>
  </section>

  <section class="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8" aria-label="Articles">
    <?php if ($result['total'] === 0): ?>
      <div class="empty-state">
        <p class="eyebrow justify-center">Coming soon</p>
        <h2 class="mt-4 font-display text-2xl font-bold text-white">The first article is on its way.</h2>
        <p class="mx-auto mt-3 max-w-md text-sm leading-relaxed text-gray-400">
          We are writing up the practical details behind solar design, storage sizing, and charging at home. Check back shortly.
        </p>
        <a href="<?= e(site_url_for('index.html?quote=1')) ?>" class="btn-gold mt-7">Talk to our team</a>
      </div>
    <?php else: ?>
      <?php if ($featuredPost !== null): ?>
        <div class="mb-12 sm:mb-16">
          <?php
          $post = $featuredPost;
          $featured = true;
          require __DIR__ . '/partials/post-card.php';
          ?>
        </div>
      <?php endif; ?>

      <?php if ($grid !== []): ?>
        <div class="mb-8 flex items-end justify-between gap-4 border-b border-white/10 pb-4">
          <h2 class="font-display text-xl font-semibold tracking-tight text-white">
            <?= $page === 1 ? 'Latest writing' : 'More from the journal' ?>
          </h2>
          <span class="text-[11px] uppercase tracking-[0.16em] text-gray-500">Page <?= (int) $result['page'] ?> of <?= (int) $result['pages'] ?></span>
        </div>
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <?php foreach ($grid as $post): ?>
            <?php
            $featured = false;
            require __DIR__ . '/partials/post-card.php';
            ?>
          <?php endforeach; ?>
        </div>
      <?php endif; ?>

      <?php
      $page = $result['page'];
      $pages = $result['pages'];
      require __DIR__ . '/partials/pagination.php';
      ?>
    <?php endif; ?>
  </section>
</main>

<?php require __DIR__ . '/partials/footer.php'; ?>
<script src="<?= e($assetBase) ?>assets/blog.js"></script>
</body>
</html>
