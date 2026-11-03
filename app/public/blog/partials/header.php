<?php
declare(strict_types=1);

$assetBase = $assetBase ?? '';
$siteRoot = $assetBase . '../';
$main = static fn (string $query = ''): string => $siteRoot . 'index.html' . $query;
?>
<header class="sticky top-0 z-50 glass-nav w-full">
  <div class="mx-auto flex h-20 max-w-[92rem] items-center justify-between px-4 sm:px-6 lg:px-8">
    <a href="<?= e($main()) ?>" class="flex items-center" aria-label="Krypton Energy home">
      <img src="<?= e($siteRoot) ?>kryptonlogo.png" alt="Krypton Energy" class="h-14 w-auto">
    </a>

    <nav class="hidden h-full items-center space-x-6 text-[13px] font-medium text-gray-300 lg:flex xl:space-x-8 xl:text-sm" aria-label="Main">
      <a href="<?= e($main()) ?>" class="transition-colors hover:text-[#e4d18e]">Home</a>
      <a href="<?= e($main('?page=page-about')) ?>" class="transition-colors hover:text-[#e4d18e]">About Us</a>

      <details class="nav-drop relative flex h-full items-center">
        <summary class="flex cursor-pointer list-none items-center gap-1 transition-colors hover:text-[#e4d18e]">
          Our Services
          <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
        </summary>
        <div class="absolute left-1/2 top-full z-40 w-64 -translate-x-1/2 pt-2">
          <div class="rounded-2xl border border-[#e4d18e]/30 bg-[#1e222a]/95 p-2 shadow-2xl shadow-black/60 backdrop-blur-xl">
            <a href="<?= e($main('?page=page-residential-architecture')) ?>" class="block rounded-xl px-4 py-2.5 text-sm text-gray-200 transition-colors hover:bg-white/10 hover:text-[#e4d18e]">Solar for Home</a>
            <a href="<?= e($main('?page=page-business')) ?>" class="block rounded-xl px-4 py-2.5 text-sm text-gray-200 transition-colors hover:bg-white/10 hover:text-[#e4d18e]">Solar for Business</a>
            <a href="<?= e($main('?page=page-ev-charging')) ?>" class="block rounded-xl px-4 py-2.5 text-sm text-gray-200 transition-colors hover:bg-white/10 hover:text-[#e4d18e]">EV Chargers</a>
            <a href="<?= e($main('?page=page-storage')) ?>" class="block rounded-xl px-4 py-2.5 text-sm text-gray-200 transition-colors hover:bg-white/10 hover:text-[#e4d18e]">Power Storage</a>
          </div>
        </div>
      </details>

      <details class="nav-drop relative flex h-full items-center">
        <summary class="flex cursor-pointer list-none items-center gap-1 transition-colors hover:text-[#e4d18e]">
          Our Products
          <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
        </summary>
        <div class="absolute left-1/2 top-full z-40 w-64 -translate-x-1/2 pt-2">
          <div class="rounded-2xl border border-[#e4d18e]/30 bg-[#1e222a]/95 p-2 shadow-2xl shadow-black/60 backdrop-blur-xl">
            <a href="<?= e($main('?page=page-rooftop-solar')) ?>" class="block rounded-xl px-4 py-2.5 text-sm text-gray-200 transition-colors hover:bg-white/10 hover:text-[#e4d18e]">Solar Panel</a>
            <a href="<?= e($main('?page=page-ev-charging')) ?>" class="block rounded-xl px-4 py-2.5 text-sm text-gray-200 transition-colors hover:bg-white/10 hover:text-[#e4d18e]">EV Charger</a>
            <a href="<?= e($main('?page=page-storage')) ?>" class="block rounded-xl px-4 py-2.5 text-sm text-gray-200 transition-colors hover:bg-white/10 hover:text-[#e4d18e]">Lithium Battery</a>
          </div>
        </div>
      </details>

      <a href="<?= e($main('?calc=1')) ?>" class="transition-colors hover:text-[#e4d18e]">Savings Calculator</a>
      <a href="<?= e($main('?page=page-faq')) ?>" class="hidden transition-colors hover:text-[#e4d18e] xl:inline">FAQs</a>
      <a href="<?= e($main('?page=page-pm-surya-ghar')) ?>" class="transition-colors hover:text-[#e4d18e]">PM Surya Yojna</a>
    </nav>

    <div class="flex items-center gap-3">
      <a href="<?= e($main('?quote=1')) ?>" class="rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-5 py-2.5 text-sm font-semibold text-gray-950 shadow-lg shadow-amber-500/25 transition-all hover:from-amber-300 hover:to-amber-400">Request Quote</a>
      <button type="button" id="blog-menu-toggle" class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-gray-200 lg:hidden" aria-expanded="false" aria-controls="blog-mobile-menu" aria-label="Open menu">
        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M4 7h16M4 12h16M4 17h16"/></svg>
      </button>
    </div>
  </div>

  <div id="blog-mobile-menu" class="hidden border-t border-white/10 bg-[#1e222a]/95 px-4 py-4 backdrop-blur-xl lg:hidden">
    <nav class="grid gap-1 text-sm text-gray-200" aria-label="Mobile">
      <a class="rounded-lg px-3 py-2 hover:bg-white/10" href="<?= e($main()) ?>">Home</a>
      <a class="rounded-lg px-3 py-2 hover:bg-white/10" href="<?= e($main('?page=page-about')) ?>">About Us</a>
      <span class="px-3 pt-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-500">Our Services</span>
      <a class="rounded-lg px-3 py-2 hover:bg-white/10" href="<?= e($main('?page=page-residential-architecture')) ?>">Solar for Home</a>
      <a class="rounded-lg px-3 py-2 hover:bg-white/10" href="<?= e($main('?page=page-business')) ?>">Solar for Business</a>
      <a class="rounded-lg px-3 py-2 hover:bg-white/10" href="<?= e($main('?page=page-ev-charging')) ?>">EV Chargers</a>
      <a class="rounded-lg px-3 py-2 hover:bg-white/10" href="<?= e($main('?page=page-storage')) ?>">Power Storage</a>
      <span class="px-3 pt-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-500">Our Products</span>
      <a class="rounded-lg px-3 py-2 hover:bg-white/10" href="<?= e($main('?page=page-rooftop-solar')) ?>">Solar Panel</a>
      <a class="rounded-lg px-3 py-2 hover:bg-white/10" href="<?= e($main('?page=page-ev-charging')) ?>">EV Charger</a>
      <a class="rounded-lg px-3 py-2 hover:bg-white/10" href="<?= e($main('?page=page-storage')) ?>">Lithium Battery</a>
      <a class="rounded-lg px-3 py-2 hover:bg-white/10" href="<?= e($main('?calc=1')) ?>">Savings Calculator</a>
      <a class="rounded-lg px-3 py-2 hover:bg-white/10" href="<?= e($main('?page=page-faq')) ?>">FAQs</a>
      <a class="rounded-lg px-3 py-2 hover:bg-white/10" href="<?= e($main('?page=page-pm-surya-ghar')) ?>">PM Surya Yojna</a>
    </nav>
  </div>
</header>
