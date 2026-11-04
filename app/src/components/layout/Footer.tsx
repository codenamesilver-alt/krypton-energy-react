import { Link } from 'react-router-dom'
import logo from '../../assets/brand/krypton-logo.png'

const toTop = () => {
  window.scrollTo(0, 0)
  setTimeout(() => window.scrollTo(0, 0), 50)
}

export default function Footer() {
  return (
    <footer className="foot">
      <div className="shell">
        <div className="foot-grid">
          <div className="foot-brand">
            <Link className="brand" to="/" aria-label="Krypton Energy - home" onClick={toTop}>
              <img className="brand-logo" src={logo} width="1023" height="218" alt="Krypton Energy - Electricity Redefined" />
            </Link>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              <li><Link to="/" onClick={toTop}>Home</Link></li>
              <li><Link to="/about" onClick={toTop}>About Us</Link></li>
              <li><Link to="/products" onClick={toTop}>Our Products</Link></li>
            </ul>
          </div>
          <div>
            <h4>Resources</h4>
            <ul>
              <li><Link to="/faq">FAQs</Link></li>
              <li><Link to="/blog">Our Blog</Link></li>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/terms-and-conditions">Terms &amp; Conditions</Link></li>
              <li><Link to="/backup">Backup</Link></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:info@kryptonenergy.in">info@kryptonenergy.in</a></li>
              <li>{'Patna \u00B7 Delhi \u00B7 Uttarakhand'}</li>
              <li>{'B-12, Okhla Industrial Area Phase-2, New Delhi \u2013 110020'}</li>
              <li>{'Shop #1 GF, Krishna Apt Coloney, More Kankarbagh, Patna, 800020'}</li>
            </ul>
          </div>
        </div>
        <div className="foot-base">
          <span>{'\u00A9 2026 Krypton All Rights Reserved'}</span>
          <div className="foot-social">
            <a href="https://www.instagram.com/krypton.energy/" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="foot-social-icon"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
            </a>
            <a href="https://www.facebook.com/kryptonenergy.in" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor" className="foot-social-icon"><path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.77-3.89 1.09 0 2.24.19 2.24.19v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.9h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94Z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}


