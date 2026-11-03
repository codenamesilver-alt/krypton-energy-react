import { useEffect, useState } from 'react'
import {
  listPosts, createPost, updatePost, deletePost, login, logout,
  isLoggedIn, currentUser, type ApiPost,
} from '../lib/blogApi'

function formatDate(iso: string | null) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function BlogAdminPage() {
  const [authed, setAuthed] = useState(isLoggedIn())
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)

  const [posts, setPosts] = useState<ApiPost[]>([])
  const [postsLoading, setPostsLoading] = useState(false)
  const [postsError, setPostsError] = useState('')

  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<ApiPost | null>(null)
  const [formTitle, setFormTitle] = useState('')
  const [formSlug, setFormSlug] = useState('')
  const [formCategory, setFormCategory] = useState('')
  const [formExcerpt, setFormExcerpt] = useState('')
  const [formContent, setFormContent] = useState('')
  const [formCover, setFormCover] = useState('')
  const [formStatus, setFormStatus] = useState<'draft' | 'published'>('draft')
  const [formError, setFormError] = useState('')
  const [formSaving, setFormSaving] = useState(false)

  const loadPosts = async () => {
    setPostsLoading(true)
    setPostsError('')
    try {
      const data = await listPosts(false)
      setPosts(data)
    } catch (e: any) {
      setPostsError(e.message)
    } finally {
      setPostsLoading(false)
    }
  }

  useEffect(() => {
    if (authed) loadPosts()
  }, [authed])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginLoading(true)
    setLoginError('')
    try {
      await login(username, password)
      setAuthed(true)
    } catch (err: any) {
      setLoginError(err.message)
    } finally {
      setLoginLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    setAuthed(false)
    setPosts([])
  }

  const openNew = () => {
    setEditing(null)
    setFormTitle('')
    setFormSlug('')
    setFormCategory('')
    setFormExcerpt('')
    setFormContent('')
    setFormCover('')
    setFormStatus('draft')
    setFormError('')
    setShowForm(true)
  }

  const openEdit = (post: ApiPost) => {
    setEditing(post)
    setFormTitle(post.title)
    setFormSlug(post.slug)
    setFormCategory(post.category || '')
    setFormExcerpt(post.excerpt || '')
    setFormContent(post.content_html)
    setFormCover(post.cover_image || '')
    setFormStatus(post.status)
    setFormError('')
    setShowForm(true)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormSaving(true)
    setFormError('')
    try {
      const data = {
        title: formTitle,
        slug: formSlug || undefined,
        category: formCategory || undefined,
        excerpt: formExcerpt || undefined,
        content_html: formContent,
        cover_image: formCover || undefined,
        status: formStatus,
      }
      if (editing) {
        await updatePost(editing.id, data)
      } else {
        await createPost(data)
      }
      setShowForm(false)
      await loadPosts()
    } catch (err: any) {
      setFormError(err.message)
    } finally {
      setFormSaving(false)
    }
  }

  const handleDelete = async (post: ApiPost) => {
    if (!confirm(`Delete "${post.title}"?`)) return
    try {
      await deletePost(post.id)
      await loadPosts()
    } catch (err: any) {
      alert(err.message)
    }
  }

  // Login screen
  if (!authed) {
    return (
      <main id="main">
        <section className="section" id="admin-login">
          <div className="wrap" style={{ maxWidth: 480 }}>
            <div className="sec-head">
              <div>
                <div className="kicker">Admin</div>
                <h2>Sign in to <span>manage posts.</span></h2>
              </div>
            </div>
            <form className="admin-login-form" onSubmit={handleLogin}>
              <div className="field">
                <label>Username</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
              </div>
              <div className="field">
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              {loginError && <p className="admin-error">{loginError}</p>}
              <button type="submit" className="btn btn-gold btn-pill" disabled={loginLoading}>
                {loginLoading ? 'Signing in…' : 'Sign in'}
              </button>
            </form>
          </div>
        </section>
      </main>
    )
  }

  // Admin dashboard
  return (
    <main id="main">
      <section className="section" id="admin-dashboard">
        <div className="wrap">
          <div className="admin-topbar">
            <div>
              <div className="kicker">Admin</div>
              <h2>Articles</h2>
            </div>
            <div className="admin-topbar-actions">
              <span className="admin-user">Signed in as {currentUser()}</span>
              <button className="btn btn-ghost btn-pill" onClick={handleLogout}>Log out</button>
              <button className="btn btn-gold btn-pill" onClick={openNew}>New Article</button>
            </div>
          </div>

          {postsError && <p className="admin-error">{postsError}</p>}

          {postsLoading ? (
            <p className="blog-loading">Loading…</p>
          ) : posts.length === 0 ? (
            <p className="blog-empty">No articles yet. Click "New Article" to create one.</p>
          ) : (
            <div className="admin-post-list">
              {posts.map((post) => (
                <div className="admin-post-row" key={post.id}>
                  <div className="admin-post-info">
                    <div className="admin-post-title">{post.title}</div>
                    <div className="admin-post-meta">
                      <span className={`admin-status admin-status-${post.status}`}>{post.status}</span>
                      {post.category && <span>{post.category}</span>}
                      <span>{formatDate(post.published_at || post.created_at)}</span>
                    </div>
                  </div>
                  <div className="admin-post-actions">
                    <button className="btn btn-ghost" onClick={() => openEdit(post)}>Edit</button>
                    <button className="btn btn-ghost" onClick={() => handleDelete(post)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {showForm && (
        <div className="admin-modal" onClick={() => setShowForm(false)}>
          <div className="admin-modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="quote-close" onClick={() => setShowForm(false)} aria-label="Close">×</button>
            <h3 className="admin-form-title">{editing ? 'Edit article' : 'New article'}</h3>
            <form className="admin-form" onSubmit={handleSave}>
              <div className="field">
                <label>Title *</label>
                <input type="text" value={formTitle} onChange={(e) => setFormTitle(e.target.value)} required maxLength={200} />
              </div>
              <div className="field">
                <label>Slug (auto-generated if blank)</label>
                <input type="text" value={formSlug} onChange={(e) => setFormSlug(e.target.value)} maxLength={200} />
              </div>
              <div className="field">
                <label>Category</label>
                <input type="text" value={formCategory} onChange={(e) => setFormCategory(e.target.value)} maxLength={80} />
              </div>
              <div className="field">
                <label>Cover image URL</label>
                <input type="text" value={formCover} onChange={(e) => setFormCover(e.target.value)} />
              </div>
              <div className="field">
                <label>Excerpt (auto-generated if blank)</label>
                <textarea value={formExcerpt} onChange={(e) => setFormExcerpt(e.target.value)} maxLength={400} rows={2} />
              </div>
              <div className="field">
                <label>Content (Markdown) *</label>
                <textarea value={formContent} onChange={(e) => setFormContent(e.target.value)} required rows={12} className="admin-content-textarea" placeholder={"# Heading\n\nParagraph text here.\n\n## Subheading\n\n- Bullet point\n- Another point\n\n> A quote or highlight\n\n**bold** and *italic* text"} />
                <small className="admin-help">Supports: # headings, **bold**, *italic*, - lists, 1. numbered lists, &gt; quotes, [links](url), --- horizontal rule. Separate paragraphs with a blank line.</small>
              </div>
              <div className="field">
                <label>Status</label>
                <select value={formStatus} onChange={(e) => setFormStatus(e.target.value as 'draft' | 'published')}>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
              {formError && <p className="admin-error">{formError}</p>}
              <div className="admin-form-actions">
                <button type="submit" className="btn btn-gold btn-pill" disabled={formSaving}>
                  {formSaving ? 'Saving…' : editing ? 'Update' : 'Publish'}
                </button>
                <button type="button" className="btn btn-ghost btn-pill" onClick={() => setShowForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  )
}