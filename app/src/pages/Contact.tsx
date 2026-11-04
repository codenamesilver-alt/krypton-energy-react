export default function ContactPage() {
  return (
    <main id="main">
      <section className="section" id="contact">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <div className="kicker">Contact us</div>
              <h2>Let's talk <span>solar.</span></h2>
            </div>
            <p>Reach out for a free consultation, a quote, or any question about going solar.</p>
          </div>

          <div className="contact-grid">
            <div className="contact-card">
              <h3>Call us</h3>
              <p><a href="tel:+919871140675">+91-9871140675</a></p>
            </div>
            <div className="contact-card">
              <h3>Email us</h3>
              <p><a href="mailto:info@kryptonenergy.in">info@kryptonenergy.in</a></p>
            </div>
            <div className="contact-card contact-card--wide">
              <h3>Our offices</h3>
              <div className="contact-addresses">
                <p>B-12, Okhla Industrial Area Phase-2, New Delhi – 110020</p>
                <p>Shop #1 GF, Krishna Apt Coloney, More Kankarbagh, Patna, 800020</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}