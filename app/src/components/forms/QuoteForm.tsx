import { useState } from 'react'

export default function QuoteForm() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', email: '', city: '', type: 'Residential' })
  const [billFile, setBillFile] = useState<File | null>(null)

  if (submitted) {
    return (
      <div style={{ padding: '22px 24px', background: 'var(--ink-2)', border: '1px solid var(--hair)', borderRadius: 2 }}>
        <div className="kicker" style={{ marginBottom: 8 }}>Thank you</div>
        <h3 style={{ fontSize: 18, fontWeight: 400, margin: '0 0 10px' }}>We’ll be in touch.</h3>
        <p style={{ color: 'var(--muted)', fontSize: 13, lineHeight: 1.6, margin: 0 }}>
          Your request has been received. A Krypton engineer will reach out within one business day.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
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
        <label htmlFor="q-type">I’m looking for</label>
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
      <button type="submit" className="btn btn-gold" style={{ marginTop: 6, alignSelf: 'flex-start' }}>Send my details</button>
    </form>
  )
}
