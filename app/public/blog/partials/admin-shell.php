<?php
declare(strict_types=1);

/**
 * Admin top bar and flash message.
 *
 * Expected: $adminTitle, $assetBase ('../'), $currentAdmin (array)
 */

$adminTitle = $adminTitle ?? 'Articles';
$assetBase = $assetBase ?? '../';
$currentAdmin = $currentAdmin ?? auth_user();
$notice = flash('notice');
$error = flash('error');
?>
<div class="border-b border-white/10 bg-[#1e222a]/70 backdrop-blur-xl">
  <div class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
    <a href="<?= e($assetBase) ?>admin/dashboard.php" class="flex items-center gap-3">
      <img src="<?= e($assetBase) ?>../kryptonlogo.png" alt="Krypton Energy" class="h-10 w-auto">
      <span class="hidden text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e4d18e] sm:inline">Journal admin</span>
    </a>

    <nav class="flex flex-wrap items-center gap-2 text-xs text-gray-300" aria-label="Admin">
      <a href="<?= e($assetBase) ?>admin/dashboard.php" class="rounded-full px-3 py-1.5 transition-colors hover:bg-white/10 hover:text-[#e4d18e]">Articles</a>
      <a href="<?= e($assetBase) ?>index.php" class="rounded-full px-3 py-1.5 transition-colors hover:bg-white/10 hover:text-[#e4d18e]">View blog</a>
      <a href="<?= e($assetBase) ?>admin/password.php" class="rounded-full px-3 py-1.5 transition-colors hover:bg-white/10 hover:text-[#e4d18e]">Password</a>
      <form method="post" action="<?= e($assetBase) ?>admin/logout.php" class="inline">
        <?= csrf_field() ?>
        <button type="submit" class="rounded-full px-3 py-1.5 transition-colors hover:bg-white/10 hover:text-[#e4d18e]">Log out</button>
      </form>
    </nav>
  </div>
</div>

<main id="main-content" class="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
  <div class="mb-8 flex flex-wrap items-center justify-between gap-3">
    <h1 class="font-display text-3xl font-bold tracking-tight text-white"><?= e($adminTitle) ?></h1>
    <?php if ($currentAdmin !== null): ?>
      <p class="text-xs text-gray-500">Signed in as <span class="text-gray-300"><?= e((string) $currentAdmin['username']) ?></span></p>
    <?php endif; ?>
  </div>

  <?php if (is_string($notice) && $notice !== ''): ?>
    <p class="mb-6 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100" role="status"><?= e($notice) ?></p>
  <?php endif; ?>
  <?php if (is_string($error) && $error !== ''): ?>
    <p class="mb-6 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-100" role="alert"><?= e($error) ?></p>
  <?php endif; ?>
