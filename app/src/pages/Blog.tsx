import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { listPosts, type ApiPost } from '../lib/blogApi'

function formatDate(iso: string | null) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function BlogPage() {
  const [posts, setPosts] = useState<ApiPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    listPosts()
      .then(setPosts)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  const sorted = [...posts].sort((a, b) => (b.published_at || b.created_at).localeCompare(a.published_at || a.created_at))

  return (
    <main id="main">
      <section className="section" id="blog">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <div className="kicker">Insights</div>
              <h2>Stories, guides <span>and updates.</span></h2>
            </div>
            <p>Everything you need to know before you switch to solar — and after.</p>
          </div>

          {loading && <p className="blog-loading">Loading articles…</p>}

          {error && <p className="blog-error">{error}. Is the blog API running?</p>}

          {!loading && !error && posts.length === 0 && (
            <p className="blog-empty">No articles published yet. Check back soon.</p>
          )}

          {!loading && !error && posts.length > 0 && (
            <div className="blog-grid">
              {sorted.map((post, i) => (
                <article className="blog-card reveal" key={post.slug} style={{ transitionDelay: `${i * 80}ms` }}>
                  <Link to={`/blog/${post.slug}`} className="blog-card-link">
                    <div className="blog-cover">
                      {post.cover_image ? (
                        <img src={post.cover_image} alt={post.title} loading="lazy" />
                      ) : (
                        <div className="blog-cover-placeholder" />
                      )}
                    </div>
                    <div className="blog-body">
                      <div className="blog-meta">
                        {post.category && <span className="blog-cat">{post.category}</span>}
                        <span className="blog-date">{formatDate(post.published_at)}</span>
                      </div>
                      <h3 className="blog-title">{post.title}</h3>
                      <p className="blog-excerpt">{post.excerpt}</p>
                      <div className="blog-foot">
                        <span className="blog-read">{Math.max(1, Math.ceil((post.content_html.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length) / 200))} min read</span>
                        <span className="blog-arrow">Read article →</span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}