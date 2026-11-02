import '../styles/faq.css'

const faqs = [
  { q: 'What are the benefits of installing solar panels at home?', a: 'Solar panels help reduce electricity bills, provide clean energy, and lower your dependence on grid electricity.' },
  { q: 'What is the difference between on-grid and hybrid solar systems?', a: 'An on-grid system works with the electricity grid, while a hybrid system combines solar panels, battery storage, and grid power for greater energy flexibility.' },
  { q: 'Can I use solar power during a power cut?', a: 'A standard on-grid solar system usually shuts down during a power cut for safety. A hybrid system with suitable backup capabilities can supply power during outages.' },
  { q: 'Do I need a battery with my solar panel system?', a: 'No. Batteries are optional for most on-grid systems but are useful for hybrid systems when you need backup power or want to store excess solar energy.' },
  { q: 'Can you install an EV charger at my home?', a: 'Yes. We provide home EV charger installation, including site assessment, electrical safety checks, and suitable charger setup based on your vehicle and electrical connection.' },
  { q: 'Can I charge my electric vehicle using solar energy?', a: 'Yes. A properly designed solar system can power your EV charger using solar electricity. Charging performance depends on solar generation, household consumption, and charger configuration.' },
  { q: 'Is government subsidy available for rooftop solar installation?', a: 'Eligible residential customers may receive subsidies under applicable government rooftop solar schemes, subject to current guidelines, approved equipment, and installation requirements.' },
  { q: 'How much does solar panel installation cost, and how long does it take?', a: 'The cost and installation time depend on system capacity, roof conditions, equipment, and whether batteries or an EV charger are included. We can provide a customised quotation after assessing your requirements.' },
]

export default function FAQPage() {
  return (
    <main id="main">
      <section className="section" id="faq">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <div className="kicker">Frequently asked questions</div>
              <h2>Answers, <span>plain and simple.</span></h2>
            </div>
            <p>Everything you need to know before you switch to solar.</p>
          </div>

          <div className="faq-list">
            {faqs.map((f, i) => (
              <details className="faq-item" key={i}>
                <summary>
                  <span className="faq-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="faq-q">{f.q}</span>
                  <span className="faq-toggle">+</span>
                </summary>
                <div className="faq-a">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}