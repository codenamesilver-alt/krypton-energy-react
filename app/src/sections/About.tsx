import { useQuoteModal } from '../context/QuoteModal'
import LocationsMap from './LocationsMap'
import '../styles/about.css'
import ptyImg from '../assets/about/pty.jpg'

export default function About() {
  const { open: openQuote } = useQuoteModal()
  return (
    <section className="section" id="about">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="kicker">About Krypton Energy</div>
            <h2>Powering India’s clean energy future, <span>designed around you.</span></h2>
          </div>
          <p className="tag" style={{ color: 'var(--gold-light)', fontWeight: 300, fontSize: 'clamp(17px,2vw,20px)', margin: '0 0 16px' }}>
            Global expertise. Tailor-made solutions. Zero shortcuts.
          </p>
        </div>
        <p className="lede" style={{ maxWidth: '68ch', color: 'var(--muted)', fontSize: 17, margin: '0 0 8px' }}>
          At Krypton, clean power isn’t just our business, it’s what we believe in. We design and install solar, EV charging and battery systems for lower bills, dependable power and decades of performance.
        </p>

        <div className="about-strip">
          <div><b>Since 2022</b>Established in Australia</div>
          <div><b>Trained team</b>Experienced electricians and technicians</div>
          <div><b>Homes to factories</b>Residential, commercial, industrial</div>
          <div><b>Solar + EV + Battery</b>One complete energy setup</div>
        </div>

        <div style={{ marginTop: 40, aspectRatio: '1200 / 800', overflow: 'hidden', borderRadius: 2, background: '#151922' }}>
          <img src={ptyImg} alt="Krypton installation team — residential rooftop commissioning in Patna" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
      </div>

      <div className="wrap" style={{ marginTop: 64 }}>
        <div className="sec-head">
          <div>
            <div className="kicker">Our approach</div>
            <h2>Built around you. <span>Built for Indian conditions.</span></h2>
          </div>
          <p>Whether you run a home, a factory, a warehouse or a commercial complex, we start by understanding your energy needs, then design a system to match. Not a generic package.</p>
        </div>
        <div className="about-cards five">
          <div className="about-card"><h3>Solutions built around you</h3><p>No one-size-fits-all systems. Every design is tailor-made for how you actually use power.</p></div>
          <div className="about-card"><h3>Honest advice, always</h3><p>If something won’t work for you, we’ll tell you upfront, even if it means a smaller sale.</p></div>
          <div className="about-card"><h3>Smarter with rising bills</h3><p>We help you make the most of available government subsidies and schemes, and design systems for India’s climate and grid realities.</p></div>
          <div className="about-card"><h3>More than solar</h3><p>Pair your solar with EV charging and lithium battery storage for a complete, future-ready setup.</p></div>
          <div className="about-card"><h3>Experts who love what they do</h3><p>Our trained and experienced electricians and technicians live and breathe technology, and they’ll answer your questions in plain language.</p></div>
        </div>
      </div>

      <div className="wrap" style={{ marginTop: 64 }} id="promise">
        <div className="sec-head">
          <div>
            <div className="kicker">Our promise</div>
            <h2>Four commitments. <span>No fine print.</span></h2>
          </div>
        </div>
        <div className="about-cards">
          <div className="about-card"><div className="num">01</div><h3>No shortcuts</h3><p>Strict installation protocols that we never compromise on.</p></div>
          <div className="about-card"><div className="num">02</div><h3>Quality first</h3><p>A handpicked team, driven by quality, not speed.</p></div>
          <div className="about-card"><div className="num">03</div><h3>Service you can count on</h3><p>From the first conversation to long after installation, a team that’s responsive and genuinely cares.</p></div>
          <div className="about-card"><div className="num">04</div><h3>Hassle-free switching</h3><p>You mean a lot to us. We make the move to renewables easy, efficient and stress-free.</p></div>
        </div>
      </div>

      <div className="wrap" style={{ marginTop: 64 }}>
        <div className="sec-head">
          <div>
            <div className="kicker">Who we power</div>
            <h2>One standard of quality, <span>whatever the size.</span></h2>
          </div>
        </div>
        <div className="about-cards">
          <div className="about-card"><h3>Homeowners</h3><p>Cut your monthly electricity bill and take control of rising costs with a system designed for your roof and your family.</p></div>
          <div className="about-card"><h3>Factories &amp; warehouses</h3><p>Bring down one of your biggest recurring costs and make your operating expenses more predictable.</p></div>
          <div className="about-card"><h3>Commercial complexes</h3><p>Reliable, professionally engineered solar that supports your business goals and your sustainability goals.</p></div>
        </div>
      </div>

      <div className="wrap" style={{ marginTop: 64 }}>
        <div className="sec-head">
          <div>
            <div className="kicker">Why choose us</div>
            <h2>Eight reasons <span>customers trust Krypton.</span></h2>
          </div>
        </div>
        <ul className="about-list">
          <li>Operating in Australia since 2022, now bringing that experience to India</li>
          <li>Custom-designed systems, not generic packages</li>
          <li>Trained and experienced electricians and technicians</li>
          <li>Strict, shortcut-free installation standards</li>
          <li>Transparent, honest recommendations</li>
          <li>Support for homeowners and for commercial and industrial businesses</li>
          <li>Aligned with India’s clean energy goals and your goal to cut energy costs</li>
          <li>Quality panels, inverters and batteries backed by manufacturer warranties, plus our workmanship warranty</li>
        </ul>
      </div>

      <LocationsMap />

      <div className="about-cta">
        <div className="hindi">अपनी बिजली बनाओ और पैसे बचाओ</div>
        <h2>Ready to make <span>the switch?</span></h2>
        <p>Talk to our team and discover a solar solution designed around you. Let’s power a cleaner, more reliable future together.</p>
        <button className="btn btn-gold" onClick={openQuote}>Get a Free Consultation</button>
        <p className="calc-note" style={{ marginTop: 16 }}>No obligation. Honest advice. A plain-language answer to every question.</p>
      </div>

      <div className="about-commit">
        <div className="kicker">Our commitment</div>
        <h3>Let’s gift our children <span>a green tomorrow.</span></h3>
        <div className="cov">
          <div><b>Residential installations</b>Delhi · Uttarakhand · Bihar</div>
          <div><b>Commercial installations</b>Pan India</div>
        </div>
        <p className="cp">© Krypton Energy · Electricity Redefined</p>
      </div>
    </section>
  )
}