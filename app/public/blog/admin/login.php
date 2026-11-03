<?php
declare(strict_types=1);

define('KRYPTON_BLOG', true);
require_once __DIR__ . '/../bootstrap.php';
require_once __DIR__ . '/../lib/auth.php';

no_cache();

if (auth_check()) {
    redirect(blog_url('admin/dashboard.php'));
}

$error = '';
$ip = client_ip();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    require_csrf();

    $username = trim((string) ($_POST['username'] ?? ''));
    $password = (string) ($_POST['password'] ?? '');

    if (auth_attempts_exceeded($ip, $username)) {
        $error = 'Too many sign-in attempts. Try again in a few minutes.';
    } elseif (auth_login($username, $password)) {
        redirect(blog_url('admin/dashboard.php'));
    } else {
        auth_record_attempt($ip, $username);
        $error = 'Those details did not match our records.';
    }
}

$assetBase = '../';
$isAdmin = true;
$pageTitle = 'Sign in | Krypton Journal Admin';
$pageDescription = 'Sign in to manage the Krypton Energy blog.';
$robots = 'noindex, nofollow';
$canonical = blog_url('admin/login.php');

require __DIR__ . '/../partials/head.php';
?>
<div class="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 py-12 sm:px-6">
  <div class="mb-8 text-center">
    <img src="../../kryptonlogo.png" alt="Krypton Energy" class="mx-auto h-12 w-auto">
    <p class="mt-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e4d18e]">Journal admin</p>
  </div>

  <div class="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/40 sm:p-8">
    <h1 class="mb-2 text-xl font-semibold text-white">Sign in</h1>
    <p class="mb-6 text-sm text-gray-400">Enter your admin credentials to continue.</p>

    <?php if ($error !== ''): ?>
      <p class="mb-5 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-100" role="alert"><?= e($error) ?></p>
    <?php endif; ?>

    <form method="post" action="login.php" class="space-y-4">
      <?= csrf_field() ?>
      <label class="field">
        <span class="label">Username</span>
        <input name="username" type="text" autocomplete="username" required value="<?= e($username ?? '') ?>">
      </label>
      <label class="field">
        <span class="label">Password</span>
        <input name="password" type="password" autocomplete="current-password" required>
      </label>
      <button type="submit" class="btn-gold w-full">Sign in</button>
    </form>
  </div>

  <p class="mt-6 text-center text-xs text-gray-500"><a href="../index.php" class="transition-colors hover:text-[#e4d18e]">Back to the journal</a></p>
</div>
</body>
</html>
