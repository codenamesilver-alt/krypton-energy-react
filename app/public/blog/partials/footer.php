<?php
declare(strict_types=1);

$assetBase = $assetBase ?? '';
$siteRoot = $assetBase . '../';
$main = static fn (string $query = ''): string => $siteRoot . 'index.html' . $query;
$blogHome = $assetBase . 'index.php';
?>
<footer data-krypton-footer class="relative z-30 mt-20 w-full border-t border-[#e4d18e]/20 bg-[#1e222a]/35 backdrop-blur-xl">
  <div class="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#1e222a]/20 to-[#1e222a]/60" aria-hidden="true"></div>

  <div class="relative mx-auto max-w-[92rem] px-4 pb-20 pt-6 sm:px-6 md:pb-2 lg:px-8">
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-12 lg:gap-8">

      <div data-footer-col="brand" class="lg:col-span-3">
        <a href="<?= e($main()) ?>" class="inline-flex items-center" aria-label="Krypton Energy home">
          <img fetchpriority="low" loading="lazy" decoding="async" src="<?= e($siteRoot) ?>kryptonlogo.png" alt="Krypton Energy" class="h-14 w-auto">
        </a>
        <p class="mt-3 max-w-xs text-[13px] leading-[18px] text-gray-300/90">
          Solar designed for your architecture. Premium rooftop systems and smart EV charging, engineered for Indian homes and businesses.
        </p>
        <div class="mt-4 flex items-center gap-3">
          <a href="#" aria-label="Facebook" class="flex h-9 w-9 items-center justify-center rounded-full border border-[#e4d18e]/30 text-[#e4d18e] transition-all duration-300 hover:border-[#e4d18e] hover:bg-[#e4d18e] hover:text-gray-950">
            <svg viewBox="0 0 24 24" fill="currentColor" class="h-4 w-4" aria-hidden="true"><path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.77-3.89 1.09 0 2.24.19 2.24.19v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.9h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94Z"/></svg>
          </a>
          <a href="#" aria-label="Instagram" class="flex h-9 w-9 items-center justify-center rounded-full border border-[#e4d18e]/30 text-[#e4d18e] transition-all duration-300 hover:border-[#e4d18e] hover:bg-[#e4d18e] hover:text-gray-950">
            <svg viewBox="0 0 24 24" fill="currentColor" class="h-4 w-4" aria-hidden="true"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.43.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.43.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.43-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.12 4.9.33 4.14.63c-.79.31-1.46.72-2.13 1.38C1.35 2.68.94 3.35.63 4.14.33 4.9.12 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.05 1.27.26 2.15.56 2.91.31.79.72 1.46 1.38 2.13.67.66 1.34 1.07 2.13 1.38.76.3 1.64.51 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.05 2.15-.26 2.91-.56.79-.31 1.46-.72 2.13-1.38.66-.67 1.07-1.34 1.38-2.13.3-.76.51-1.64.56-2.91.06-1.28.07-1.67.07-4.95s-.01-3.67-.07-4.95c-.05-1.27-.26-2.15-.56-2.91-.31-.79-.72-1.46-1.38-2.13-.67-.66-1.34-1.07-2.13-1.38-.76-.3-1.64-.51-2.91-.56C15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32Zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.41-10.41a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0Z"/></svg>
          </a>
        </div>
      </div>

      <div data-footer-col="sitemap" class="lg:col-span-6">
        <h2 class="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e4d18e]">
          <span class="h-1 w-1 rounded-full bg-[#e4d18e]" aria-hidden="true"></span>Sitemap
        </h2>
        <div class="grid grid-cols-2 gap-x-4 gap-y-3 text-[13px] leading-[18px] text-gray-300 sm:gap-x-8">
          <div class="space-y-1.5">
            <a href="<?= e($main()) ?>" class="block transition-colors hover:text-[#e4d18e]">Home</a>
            <a href="<?= e($main('?page=page-about')) ?>" class="block transition-colors hover:text-[#e4d18e]">About Us</a>
            <div class="pt-1.5">
              <span class="block text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400">Our Services</span>
              <ul class="mt-1 space-y-1.5 border-l border-[#e4d18e]/25 pl-3">
                <li><a href="<?= e($main('?page=page-residential-architecture')) ?>" class="block transition-colors hover:text-[#e4d18e]">Solar for Home</a></li>
                <li><a href="<?= e($main('?page=page-business')) ?>" class="block transition-colors hover:text-[#e4d18e]">Solar for Business</a></li>
                <li><a href="<?= e($main('?page=page-ev-charging')) ?>" class="block transition-colors hover:text-[#e4d18e]">EV Chargers</a></li>
                <li><a href="<?= e($main('?page=page-storage')) ?>" class="block transition-colors hover:text-[#e4d18e]">Power Storage</a></li>
              </ul>
            </div>
          </div>
          <div class="space-y-1.5">
            <div>
              <span class="block text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400">Our Products</span>
              <ul class="mt-1 space-y-1.5 border-l border-[#e4d18e]/25 pl-3">
                <li><a href="<?= e($main('?page=page-rooftop-solar')) ?>" class="block transition-colors hover:text-[#e4d18e]">Solar Panel</a></li>
                <li><a href="<?= e($main('?page=page-ev-charging')) ?>" class="block transition-colors hover:text-[#e4d18e]">EV Charger</a></li>
                <li><a href="<?= e($main('?page=page-storage')) ?>" class="block transition-colors hover:text-[#e4d18e]">Lithium Battery</a></li>
              </ul>
            </div>
            <a href="<?= e($main('?calc=1')) ?>" class="mt-1.5 block transition-colors hover:text-[#e4d18e]">Savings Calculator</a>
            <a href="<?= e($main('?page=page-faq')) ?>" class="block transition-colors hover:text-[#e4d18e]">FAQs</a>
            <a href="<?= e($main('?page=page-pm-surya-ghar')) ?>" class="block transition-colors hover:text-[#e4d18e]">PM Surya Yojna</a>
            <a href="<?= e($blogHome) ?>" aria-current="page" class="block font-medium text-[#e4d18e]">Blog</a>
          </div>
        </div>
      </div>

      <div data-footer-col="contact" class="lg:col-span-3">
        <h2 class="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e4d18e]">
          <span class="h-1 w-1 rounded-full bg-[#e4d18e]" aria-hidden="true"></span>Contact
        </h2>
        <div class="space-y-3">
          <div>
            <span class="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-gray-300"><span class="h-1 w-1 rounded-full bg-[#e4d18e]" aria-hidden="true"></span>Address</span>
            <a href="https://www.google.com/maps/search/?api=1&amp;query=B-12%20Okhla%20Industrial%20Area%20Phase-2%20New%20Delhi%20110020" target="_blank" rel="noopener noreferrer" class="mt-1.5 block text-sm leading-relaxed text-gray-200 transition-colors hover:text-[#e4d18e]">B-12, Okhla Industrial Area Phase-2,<br>New Delhi &ndash; 110020</a>
          </div>
          <div>
            <span class="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-gray-300"><span class="h-1 w-1 rounded-full bg-[#e4d18e]" aria-hidden="true"></span>Phone</span>
            <a href="tel:+919871140675" class="mt-1 block text-sm text-gray-200 transition-colors hover:text-[#e4d18e]">+91 98711 40675</a>
          </div>
          <div>
            <span class="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-gray-300"><span class="h-1 w-1 rounded-full bg-[#e4d18e]" aria-hidden="true"></span>Email</span>
            <a href="mailto:info@kryptonenergy.in" class="mt-1 block text-sm text-gray-200 transition-colors hover:text-[#e4d18e]">info@kryptonenergy.in</a>
          </div>
        </div>
        <a href="<?= e($main('?quote=1')) ?>" class="mt-4 inline-flex items-center gap-2 rounded-full border border-[#e4d18e]/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#e4d18e] transition-all duration-300 hover:border-[#e4d18e] hover:bg-[#e4d18e] hover:text-gray-950">Request a Quote</a>
      </div>
    </div>

    <div class="mt-4 flex flex-col gap-1.5 border-t border-white/10 pt-3 text-xs text-gray-300 sm:flex-row sm:items-center sm:justify-between">
      <p>&copy; 2026 Krypton Energy. All rights reserved.</p>
      <a href="#top" class="inline-flex items-center gap-2 self-start transition-colors hover:text-[#e4d18e] sm:self-auto">
        Back to top
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-3.5 w-3.5" aria-hidden="true"><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></svg>
      </a>
    </div>
  </div>
</footer>
