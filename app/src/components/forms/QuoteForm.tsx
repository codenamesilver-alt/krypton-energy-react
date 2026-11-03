import { useState, useRef, useEffect } from 'react'

const CONTACT_API = import.meta.env.VITE_CONTACT_API_URL || 'http://localhost/contact.php'

export default function QuoteForm() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name: '', phone: '', email: '', city: '', type: 'Residential', pincode: '', bill: '' })
  const [billFile, setBillFile] = useState<File | null>(null)
  const formStartedAt = useRef(Date.now())
  const honeypot = useRef('')

  useEffect(() => {
    formStartedAt.current = Date.now()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('name', form.name)
      formData.append('phone', form.phone)
      formData.append('email', form.email)
      formData.append('city', form.city)
      formData.append('pincode', form.pincode)
      formData.append('bill', form.bill)
      formData.append('property_type', form.type)
      formData.append('form_started_at', String(Math.floor(formStartedAt.current / 1000)))
      formData.append('company', honeypot.current) // honeypot
      if (billFile) {
        formData.append('bill_upload', billFile)
      }

      const res = await fetch(CONTACT_API, {
        method: 'POST',
        headers: { 'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json' },
        body: formData,
      })

      const data = await res.json()
      if (!res.ok || !data.ok) {
        throw new Error(data.message || 'Failed to send. Please try again.')
      }
      setSubmitted(true)
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div style={{ padding: '22px 24px', background: 'var(--ink-2)', border: '1px solid var(--hair)', borderRadius: 2 }}>
        <div className="kicker" style={{ marginBottom: 8 }}>Thank you</div>
        <h3 style={{ fontSize: 18, fontWeight: 400, margin: '0 0 10px' }}>We'll be in touch.</h3>
        <p style={{ color: 'var(--muted)', fontSize: 13, lineHeight: 1.6, margin: 0 }}>
          Your request has been received. A Krypton engineer will reach out within one business day.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div className="qf">
        <label htmlFor="q-name">Name</label>
        <input id="q-name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your full name" />
      </div>
      <div className="qf">
        <label htmlFor="q-phone">Phone</label>
        <input id="q-phone" required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91" />
      </div>
      <div className="qf">
        <label htmlFor="q-email">Email</label>
        <input id="q-email" required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" />
      </div>
      <div className="qf">
        <label htmlFor="q-city">City</label>
        <input id="q-city" required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="Patna, Delhi, Uttarakhand…" />
      </div>
      <div className="qf">
        <label htmlFor="q-pincode">Pincode</label>
        <input id="q-pincode" required value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value })} placeholder="110020" />
      </div>
      <div className="qf">
        <label htmlFor="q-type">I'm looking for</label>
        <select id="q-type" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
          <option>Residential</option>
          <option>Commercial</option>
          <option>Institution</option>
        </select>
      </div>
      <div className="qf">
        <label htmlFor="q-bill">Upload your electricity bill (optional)</label>
        <input id="q-bill" type="file" accept="image/*,.pdf" onChange={(e) => setBillFile(e.target.files?.[0] ?? null)} />
        {billFile && <small style={{ color: 'var(--gold-light)' }}>Selected: {billFile.name}</small>}
      </div>
      {/* Honeypot field - hidden from users */}
      <input type="text" name="company" value={honeypot.current} onChange={(e) => { honeypot.current = e.target.value }} style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
      <input type="hidden" name="form_started_at" value={Math.floor(formStartedAt.current / 1000)} />
      {error && <p style={{ color: '#ff6b6b', fontSize: 13, margin: 0 }}>{error}</p>}
      <button type="submit" className="btn btn-gold" style={{ marginTop: 6, alignSelf: 'flex-start' }} disabled={submitting}>
        {submitting ? 'Sending…' : 'Send my details'}
      </button>
    </form>
  )
}