<?php
declare(strict_types=1);

define('KRYPTON_BLOG', true);
require_once __DIR__ . '/../bootstrap.php';
require_once __DIR__ . '/../lib/auth.php';
require_once __DIR__ . '/../lib/posts.php';

no_cache();
auth_require();

$posts = post_all();
$published = 0;
$drafts = 0;

foreach ($posts as $post) {
    if (($post['status'] ?? '') === 'published') {
        $published++;
    } else {
        $drafts++;
    }
}

$assetBase = '../';
$isAdmin = true;
$pageTitle = 'Articles | Krypton Journal Admin';
$pageDescription = 'Manage Krypton Energy blog articles.';
$robots = 'noindex, nofollow';
$canonical = blog_url('admin/dashboard.php');

require __DIR__ . '/../partials/head.php';

$adminTitle = 'Articles';
require __DIR__ . '/../partials/admin-shell.php';
?>
<div class="mb-6 flex flex-wrap items-center justify-between gap-3">
  <div class="flex flex-wrap gap-2 text-xs text-gray-400">
    <span class="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1"><?= $published ?> published</span>
    <span class="rounded-full border border-amber-400/25 bg-amber-400/10 px-3 py-1"><?= $drafts ?> draft<?= $drafts === 1 ? '' : 's' ?></span>
  </div>
  <a href="edit.php" class="btn-gold">New Article</a>
</div>

<?php if ($posts === []): ?>
  <div class="empty-state">
    <p class="eyebrow justify-center">Empty journal</p>
    <h2 class="mt-4 font-display text-2xl font-bold text-white">No articles yet.</h2>
    <p class="mx-auto mt-3 max-w-md text-sm leading-relaxed text-gray-400">Write the first piece and publish it when it is ready.</p>
    <a href="edit.php" class="btn-gold mt-7">Write the first article</a>
  </div>
<?php else: ?>
  <div class="overflow-x-auto">
    <table class="admin-table min-w-[46rem]">
      <thead>
        <tr>
          <th>Title</th>
          <th>Category</th>
          <th>Status</th>
          <th>Published</th>
          <th>Updated</th>
          <th class="text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        <?php foreach ($posts as $post): ?>
          <?php
          $id = (int) $post['id'];
          $isPublished = ($post['status'] ?? '') === 'published';
          ?>
          <tr>
            <td>
              <a href="edit.php?id=<?= $id ?>" class="font-medium text-white transition-colors hover:text-[#e4d18e]"><?= e((string) $post['title']) ?></a>
              <span class="mt-0.5 block text-[11px] text-gray-500">/blog/<?= e((string) $post['slug']) ?></span>
            </td>
            <td class="text-gray-400"><?= e((string) ($post['category'] ?? '')) !== '' ? e((string) $post['category']) : '—' ?></td>
            <td>
              <span class="status-badge <?= $isPublished ? 'status-badge--published' : 'status-badge--draft' ?>"><?= $isPublished ? 'Published' : 'Draft' ?></span>
            </td>
            <td class="whitespace-nowrap text-gray-400">
              <?= $post['published_at'] !== null ? e(date('j M Y', strtotime((string) $post['published_at']))) : '—' ?>
            </td>
            <td class="whitespace-nowrap text-gray-400"><?= e(date('j M Y', strtotime((string) $post['updated_at']))) ?></td>
            <td>
              <div class="flex flex-wrap items-center justify-end gap-2 text-xs">
                <a href="edit.php?id=<?= $id ?>" class="btn-ghost !px-3 !py-1.5">Edit</a>
                <?php if ($isPublished): ?>
                  <a href="<?= e(post_url($post)) ?>" target="_blank" rel="noopener" class="btn-ghost !px-3 !py-1.5">View</a>
                <?php endif; ?>
                <form method="post" action="delete.php" class="inline">
                  <?= csrf_field() ?>
                  <input type="hidden" name="id" value="<?= $id ?>">
                  <button type="submit" class="btn-danger" data-confirm="Delete &quot;<?= e((string) $post['title']) ?>&quot;? This cannot be undone.">Delete</button>
                </form>
              </div>
            </td>
          </tr>
        <?php endforeach; ?>
      </tbody>
    </table>
  </div>
<?php endif; ?>
</main>
<script src="<?= e($assetBase) ?>assets/blog.js"></script>
</body>
</html>
