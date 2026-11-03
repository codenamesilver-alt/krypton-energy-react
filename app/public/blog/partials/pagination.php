<?php
declare(strict_types=1);

/** @var int $page */
/** @var int $pages */

$page = max(1, (int) ($page ?? 1));
$pages = max(1, (int) ($pages ?? 1));

if ($pages < 2) {
    return;
}

$link = static fn (int $n): string => blog_url($n === 1 ? '' : '?page=' . $n);

// Keep the control compact when there are many pages.
$window = [];
for ($n = 1; $n <= $pages; $n++) {
    if ($n === 1 || $n === $pages || abs($n - $page) <= 2) {
        $window[] = $n;
    }
}
?>
<nav class="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6" aria-label="Blog pages">
  <div>
    <?php if ($page > 1): ?>
      <a href="<?= e($link($page - 1)) ?>" class="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-gray-200 transition-colors hover:border-[#e4d18e]/60 hover:text-[#e4d18e]">
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15 19l-7-7 7-7"/></svg>
        Newer
      </a>
    <?php endif; ?>
  </div>

  <ol class="flex items-center gap-1.5">
    <?php $previous = 0; ?>
    <?php foreach ($window as $n): ?>
      <?php if ($previous !== 0 && $n > $previous + 1): ?>
        <li class="px-1 text-gray-500" aria-hidden="true">&hellip;</li>
      <?php endif; ?>
      <li>
        <?php if ($n === $page): ?>
          <span aria-current="page" class="inline-flex h-9 min-w-9 items-center justify-center rounded-full border border-[#e4d18e]/60 bg-[#e4d18e]/10 px-2 text-sm font-semibold text-[#e4d18e]"><?= $n ?></span>
        <?php else: ?>
          <a href="<?= e($link($n)) ?>" class="inline-flex h-9 min-w-9 items-center justify-center rounded-full border border-transparent px-2 text-sm text-gray-300 transition-colors hover:border-white/15 hover:text-[#e4d18e]"><?= $n ?></a>
        <?php endif; ?>
      </li>
      <?php $previous = $n; ?>
    <?php endforeach; ?>
  </ol>

  <div>
    <?php if ($page < $pages): ?>
      <a href="<?= e($link($page + 1)) ?>" class="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-gray-200 transition-colors hover:border-[#e4d18e]/60 hover:text-[#e4d18e]">
        Older
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 5l7 7-7 7"/></svg>
      </a>
    <?php endif; ?>
  </div>
</nav>
