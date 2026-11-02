import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/brand/krypton-logo.png'
import { navLinks } from '../../data/content'
import { useQuoteModal } from '../../context/QuoteModal'

export default function Header() {
  const { open: openQuote } = useQuoteModal()
  const [stuck, setStuck] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`site-head${stuck ? ' is-stuck' : ''}`}>
      <div className="shell head-inner">
        <Link className="brand" to="/" aria-label="Krypton Energy — home">
          <img className="brand-logo" src={logo} width="1023" height="218" alt="Krypton Energy — Electricity Redefined" />
        </Link>
        <nav className="nav" aria-label="Primary">
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to}>{l.label}</Link>
          ))}
        </nav>
        <div className="head-actions">
          <a className="head-phone" href="tel:+919871140675">+91-9871140675</a>
          <button className="btn btn-gold" onClick={openQuote}>Get a quote</button>
          <button
            className="menu-btn"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
          </button>
        </div>
      </div>
      {open && (
        <nav className="mobile-menu" aria-label="Mobile">
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)}>{l.label}</Link>
          ))}
          <a href="tel:+919871140675" onClick={() => setOpen(false)}>+91-9871140675</a>
        </nav>
      )}
    </header>
  )
}

