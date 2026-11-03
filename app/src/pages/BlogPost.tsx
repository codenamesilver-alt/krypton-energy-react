import { useEffect, useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { getPost, listPosts, type ApiPost } from '../lib/blogApi'
import { markdownToHtml } from '../lib/markdown'

function formatDate(iso: string | null) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<ApiPost | null>(null)
  const [related, setRelated] = useState<ApiPost[]>([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!slug) { setNotFound(true); setLoading(false); return }
    getPost(slug)
      .then((p) => {
        setPost(p)
        return listPosts()
      })
      .then((all) => {
        const others = all
          .filter((p) => p.slug !== slug)
          .sort((a, b) => (b.published_at || b.created_at).localeCompare(a.published_at || a.created_at))
          .slice(0, 3)
        setRelated(others)
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return <main id="main"><section className="section"><div className="wrap"><p>Loading…</p></div></section></main>
  }

  if (notFound || !post) return <Navigate to="/blog" replace />

  return (
    <main id="main">
      <section className="section" id="blog-post">
        <div className="wrap">
          <Link to="/blog" className="blog-back">← Back to all articles</Link>

          <div className="blog-post-head">
            <div className="blog-meta">
              {post.category && <span className="blog-cat">{post.category}</span>}
              <span className="blog-date">{formatDate(post.published_at)}</span>
              <span className="blog-read">3 min read</span>
            </div>
            <h1 className="blog-post-title">{post.title}</h1>
          </div>

          {post.cover_image && (
            <div className="blog-cover blog-cover-lg">
              <img src={post.cover_image} alt={post.title} />
            </div>
          )}

          <article className="blog-prose" dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content_html) }} />

          <div className="blog-cta">
            <p>Ready to make the switch to solar?</p>
            <a className="link-arrow" href="#quote">Talk to our team
              <svg width="16" height="8" viewBox="0 0 16 8" fill="none"><path d="M0 4h14M11 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" /></svg>
            </a>
          </div>

          {related.length > 0 && (
            <div className="blog-related">
              <h3>More articles</h3>
              <div className="blog-grid">
                {related.map((p) => (
                  <article className="blog-card" key={p.slug}>
                    <Link to={`/blog/${p.slug}`} className="blog-card-link">
                      <div className="blog-cover">
                        {p.cover_image ? (
                          <img src={p.cover_image} alt={p.title} loading="lazy" />
                        ) : (
                          <div className="blog-cover-placeholder" />
                        )}
                      </div>
                      <div className="blog-body">
                        <div className="blog-meta">
                          {p.category && <span className="blog-cat">{p.category}</span>}
                          <span className="blog-date">{formatDate(p.published_at)}</span>
                        </div>
                        <h3 className="blog-title">{p.title}</h3>
                        <p className="blog-excerpt">{p.excerpt}</p>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}