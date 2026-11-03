import { Link } from 'react-router-dom'
import logo from '../../assets/brand/krypton-logo.png'

export default function Footer() {
  return (
    <footer className="foot">
      <div className="shell">
        <div className="foot-grid">
          <div className="foot-brand">
            <a className="brand" href="#" aria-label="Krypton Energy - home">
              <img className="brand-logo" src={logo} width="1023" height="218" alt="Krypton Energy - Electricity Redefined" />
            </a>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/products">Our Products</Link></li>
            </ul>
          </div>
          <div>
            <h4>Products</h4>
            <ul>
              <li><Link to="/products#panels">Solar panels</Link></li>
              <li><Link to="/products#inverters">Inverters</Link></li>
              <li><Link to="/products#batteries">Batteries</Link></li>
              <li><Link to="/products#ev">EV home chargers</Link></li>
            </ul>
          </div>
          <div>
            <h4>Resources</h4>
            <ul>
              <li><Link to="/faq">FAQs</Link></li>
              <li><Link to="/blog">Our Blog</Link></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li><a href="tel:+919871140675">+91-9871140675</a></li>
              <li><a href="mailto:info@kryptonenergy.in">info@kryptonenergy.in</a></li>
              <li>{'Patna \u00B7 Delhi \u00B7 Uttarakhand'}</li>
              <li>{'B-12, Okhla Industrial Area Phase-2, New Delhi \u2013 110020'}</li>
            </ul>
          </div>
        </div>
        <div className="foot-base">
          <span>{'\u00A9 2026 Krypton All Rights Reserved'}</span>
        </div>
      </div>
    </footer>
  )
}


