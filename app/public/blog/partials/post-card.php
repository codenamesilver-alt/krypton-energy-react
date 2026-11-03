<?php
declare(strict_types=1);

/**
 * One article card.
 *
 * Expected: $post (array), $assetBase (string), $featured (bool, optional)
 */

$featured = $featured ?? false;
$assetBase = $assetBase ?? '';
$title = (string) ($post['title'] ?? '');
$url = post_url($post);
$category = trim((string) ($post['category'] ?? ''));
$excerpt = (string) ($post['excerpt'] ?? '');
$cover = trim((string) ($post['cover_image'] ?? ''));
$when = (string) ($post['published_at'] ?? $post['created_at'] ?? '');
$date = $when !== '' ? date('j M Y', strtotime($when)) : '';
$minutes = reading_time((string) ($post['content_html'] ?? ''));

if ($featured): ?>
  <article data-featured class="featured-card fade-up group">
    <a href="<?= e($url) ?>" class="featured-card__media block" aria-hidden="true" tabindex="-1">
      <?php if ($cover !== ''): ?>
        <img src="<?= e($assetBase . $cover) ?>" alt="<?= e($title) ?>" loading="eager" decoding="async">
      <?php else: ?>
        <span class="absolute inset-0 grid place-items-center text-6xl font-extrabold text-[#e4d18e]/20">K</span>
      <?php endif; ?>
    </a>
    <div class="flex flex-col justify-center gap-4 p-6 sm:p-9">
      <div class="flex flex-wrap items-center gap-3">
        <span class="chip">Featured</span>
        <?php if ($category !== ''): ?>
          <span class="text-[11px] uppercase tracking-[0.16em] text-gray-400"><?= e($category) ?></span>
        <?php endif; ?>
      </div>
      <h2 class="font-display text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl">
        <a href="<?= e($url) ?>" class="transition-colors hover:text-[#e4d18e]"><?= e($title) ?></a>
      </h2>
      <p class="text-sm leading-relaxed text-gray-300 sm:text-[15px]"><?= e($excerpt) ?></p>
      <div class="meta">
        <span><?= e($date) ?></span>
        <span><?= $minutes ?> min read</span>
      </div>
      <a href="<?= e($url) ?>" class="read-link">
        Read the article
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M5 12h14m0 0-6-6m6 6-6 6"/></svg>
      </a>
    </div>
  </article>
<?php else: ?>
  <article data-post-card class="post-card fade-up group">
    <a href="<?= e($url) ?>" class="post-card__media <?= $cover === '' ? 'post-card__media--fallback' : '' ?> block" aria-hidden="true" tabindex="-1">
      <?php if ($cover !== ''): ?>
        <img src="<?= e($assetBase . $cover) ?>" alt="<?= e($title) ?>" loading="lazy" decoding="async">
      <?php endif; ?>
    </a>
    <div class="post-card__body">
      <div class="flex flex-wrap items-center gap-2">
        <?php if ($category !== ''): ?>
          <span class="chip"><?= e($category) ?></span>
        <?php endif; ?>
        <span class="text-[11px] text-gray-500"><?= e($date) ?></span>
      </div>
      <h3 class="font-display text-lg font-semibold leading-snug tracking-tight text-white">
        <a href="<?= e($url) ?>" class="transition-colors hover:text-[#e4d18e]"><?= e($title) ?></a>
      </h3>
      <p class="line-clamp-3 text-[13px] leading-relaxed text-gray-400"><?= e($excerpt) ?></p>
      <div class="mt-auto flex items-center justify-between pt-2">
        <span class="text-[11px] text-gray-500"><?= $minutes ?> min read</span>
        <a href="<?= e($url) ?>" class="read-link" aria-label="Read <?= e($title) ?>">
          Read
          <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M5 12h14m0 0-6-6m6 6-6 6"/></svg>
        </a>
      </div>
    </div>
  </article>
<?php endif; ?>
