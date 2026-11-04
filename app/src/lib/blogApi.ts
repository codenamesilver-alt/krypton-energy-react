const API_BASE = import.meta.env.VITE_BLOG_API_URL || '/api'

export type ApiPost = {
  id: number
  title: string
  slug: string
  category: string | null
  excerpt: string | null
  content_html: string
  cover_image: string | null
  status: 'draft' | 'published'
  published_at: string | null
  created_at: string
  updated_at: string
}

export type ApiAdmin = {
  token: string
  username: string
}

function getToken(): string | null {
  return localStorage.getItem('blog_token')
}

function authHeaders(): HeadersInit {
  const token = getToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export async function listPosts(publishedOnly = true): Promise<ApiPost[]> {
  const url = publishedOnly ? `${API_BASE}/posts.php` : `${API_BASE}/posts.php?all=1`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch posts')
  return res.json()
}

export async function getPost(slug: string): Promise<ApiPost> {
  const res = await fetch(`${API_BASE}/posts.php?slug=${encodeURIComponent(slug)}`)
  if (!res.ok) throw new Error('Post not found')
  return res.json()
}

export async function createPost(data: Partial<ApiPost> & { title: string; content_html: string }): Promise<ApiPost> {
  const res = await fetch(`${API_BASE}/posts.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Failed to create post' }))
    throw new Error(err.error || 'Failed to create post')
  }
  return res.json()
}

export async function updatePost(id: number, data: Partial<ApiPost>): Promise<ApiPost> {
  const res = await fetch(`${API_BASE}/posts.php?id=${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Failed to update post' }))
    throw new Error(err.error || 'Failed to update post')
  }
  return res.json()
}

export async function deletePost(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/posts.php?id=${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Failed to delete post' }))
    throw new Error(err.error || 'Failed to delete post')
  }
}

export async function login(username: string, password: string): Promise<ApiAdmin> {
  const res = await fetch(`${API_BASE}/login.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Login failed' }))
    throw new Error(err.error || 'Login failed')
  }
  const data = await res.json()
  localStorage.setItem('blog_token', data.token)
  localStorage.setItem('blog_user', data.username)
  return data
}

export function logout() {
  localStorage.removeItem('blog_token')
  localStorage.removeItem('blog_user')
}

export function isLoggedIn(): boolean {
  return !!getToken()
}

export function currentUser(): string | null {
  return localStorage.getItem('blog_user')
}