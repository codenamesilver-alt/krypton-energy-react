<?php
declare(strict_types=1);

define('KRYPTON_BLOG', true);
require_once __DIR__ . '/../bootstrap.php';
require_once __DIR__ . '/../lib/auth.php';

no_cache();
auth_require();

$admin = auth_user();
$adminId = isset($admin['id']) ? (int) $admin['id'] : 0;

$errors = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    require_csrf();

    $current = (string) ($_POST['current'] ?? '');
    $new = (string) ($_POST['new'] ?? '');
    $confirm = (string) ($_POST['new_confirm'] ?? '');

    if ($new !== $confirm) {
        $errors[] = 'The two new passwords do not match.';
    } elseif (mb_strlen($new, 'UTF-8') < 12) {
        $errors[] = 'The new password must be at least 12 characters.';
    } elseif (!auth_change_password($adminId, $current, $new)) {
        $errors[] = 'Your current password was not correct.';
    } else {
        flash('notice', 'Password updated.');
        redirect(blog_url('admin/password.php'));
    }
}

$assetBase = '../';
$isAdmin = true;
$pageTitle = 'Change password | Krypton Journal Admin';
$pageDescription = 'Update the blog admin password.';
$robots = 'noindex, nofollow';
$canonical = blog_url('admin/password.php');

require __DIR__ . '/../partials/head.php';

$adminTitle = 'Change password';
require __DIR__ . '/../partials/admin-shell.php';
?>
<div class="max-w-lg">
  <?php if ($errors !== []): ?>
    <div class="mb-6 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-100" role="alert">
      <ul class="list-disc space-y-1 pl-5">
        <?php foreach ($errors as $message): ?>
          <li><?= e($message) ?></li>
        <?php endforeach; ?>
      </ul>
    </div>
  <?php endif; ?>

  <form method="post" action="password.php" class="space-y-4">
    <?= csrf_field() ?>
    <label class="field">
      <span class="label">Current password</span>
      <input name="current" type="password" autocomplete="current-password" required>
    </label>
    <label class="field">
      <span class="label">New password</span>
      <input name="new" type="password" autocomplete="new-password" minlength="12" required>
      <span class="help">At least 12 characters. Choose something you do not use elsewhere.</span>
    </label>
    <label class="field">
      <span class="label">Confirm new password</span>
      <input name="new_confirm" type="password" autocomplete="new-password" minlength="12" required>
    </label>
    <button type="submit" class="btn-gold">Update password</button>
  </form>
</div>
</main>
<script src="<?= e($assetBase) ?>assets/blog.js"></script>
</body>
</html>
