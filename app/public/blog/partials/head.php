<?php
declare(strict_types=1);

/**
 * Shared <head> for public and admin pages.
 *
 * Expected (all optional):
 *   $pageTitle, $pageDescription, $canonical, $robots, $ogImage, $ogType,
 *   $assetBase ('' from blog root, '../' from blog/admin), $isAdmin
 */

$pageTitle = $pageTitle ?? 'Insights | Krypton Energy';
$pageDescription = $pageDescription ?? 'Practical thinking on solar, storage, and smart EV charging from the Krypton Energy team.';
$canonical = $canonical ?? blog_url();
$robots = $robots ?? 'index, follow';
$ogImage = $ogImage ?? null;
$ogType = $ogType ?? 'website';
$assetBase = $assetBase ?? '';
$isAdmin = $isAdmin ?? false;
$extraHead = $extraHead ?? '';

$siteRoot = $assetBase . '../';
$blogRoot = $assetBase;
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?= e($pageTitle) ?></title>
  <meta name="description" content="<?= e($pageDescription) ?>">
  <meta name="robots" content="<?= e($robots) ?>">
  <link rel="canonical" href="<?= e($canonical) ?>">
  <meta name="theme-color" content="#1e222a">
  <link rel="icon" href="<?= e($siteRoot) ?>favicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="<?= e($siteRoot) ?>favicon.svg">

  <meta property="og:site_name" content="Krypton Energy">
  <meta property="og:type" content="<?= e($ogType) ?>">
  <meta property="og:title" content="<?= e($pageTitle) ?>">
  <meta property="og:description" content="<?= e($pageDescription) ?>">
  <meta property="og:url" content="<?= e($canonical) ?>">
  <meta property="og:locale" content="en_IN">
  <?php if ($ogImage !== null && $ogImage !== ''): ?>
    <meta property="og:image" content="<?= e($ogImage) ?>">
    <meta name="twitter:card" content="summary_large_image">
  <?php else: ?>
    <meta name="twitter:card" content="summary">
  <?php endif; ?>
  <meta name="twitter:title" content="<?= e($pageTitle) ?>">
  <meta name="twitter:description" content="<?= e($pageDescription) ?>">
  <?php if ($ogImage !== null && $ogImage !== ''): ?>
    <meta name="twitter:image" content="<?= e($ogImage) ?>">
  <?php endif; ?>

  <script src="https://cdn.tailwindcss.com/3.4.17"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
  </style>
  <link rel="stylesheet" href="<?= e($blogRoot) ?>assets/blog.css">
  <?= $extraHead ?>
</head>
<body class="min-h-screen bg-[#1e222a] text-[#F3F4F6] antialiased<?= $isAdmin ? ' admin-body' : '' ?>">
<a href="#main-content" class="skip-link">Skip to content</a>
