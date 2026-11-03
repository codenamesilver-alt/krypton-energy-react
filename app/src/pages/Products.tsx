import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import '../styles/products.css'
import panelsImg from '../assets/products/panels.jpg'
import inverterImg from '../assets/products/inverter.jpg'
import battImg from '../assets/products/batt.jpg'
import evchImg from '../assets/products/evch.jpg'

export default function ProductsPage() {
  const { hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }, [hash])
  return (
    <main id="main">
      <section className="prod-section" id="products">
        <div className="wrap">
          <div className="prod-head">
            <div>
              <div className="kicker">The system</div>
              <h2>Four components. <span>One warranty. One team.</span></h2>
            </div>
            <p>Solar panels, inverters, batteries and EV chargers — specified, installed and serviced by our team.</p>
          </div>
        </div>
      </section>

      {/* 01 Solar panels */}
      <section className="prod-section" id="panels">
        <div className="wrap">
          <div className="prod-head">
            <div>
              <div className="kicker">01 / Generation</div>
              <h2>Solar panels. <span>Mono PERC and N-Type TOPCon.</span></h2>
            </div>

          </div>
          <div style={{ marginBottom: 24, aspectRatio: '21 / 9', overflow: 'hidden', borderRadius: 2, background: '#151922' }}>
            <img src={panelsImg} alt="Solar panels — Mono PERC and N-Type TOPCon array on a residential rooftop" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
          <div className="prod-cards two">
            <div className="prod-card">
              <div className="idx">Mono PERC</div>
              <h3>Mono PERC (Half-Cut)</h3>
              <div className="spec">540–550 Wp · 21.0–21.4% efficiency</div>
              <p>Proven, cost-effective and widely available. PERC adds a rear passivation layer to standard mono cells, squeezing more power from the same area. Ideal for budget-conscious homes and large rooftops where space is not the constraint.</p>
            </div>
            <div className="prod-card">
              <div className="idx">N-Type TOPCon</div>
              <h3>N-Type TOPCon</h3>
              <div className="spec">580–590 Wp · 22.3–22.8% efficiency</div>
              <p>Higher yield, lower degradation, better performance in heat. N-type silicon resists light-induced degradation and holds efficiency for 30 years. The right choice for smaller roofs, high-tariff connections and long hold periods.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 02 Inverters */}
      <section className="prod-section" id="inverters">
        <div className="wrap">
          <div className="prod-head">
            <div>
              <div className="kicker">02 / Conversion</div>
              <h2>Inverters. <span>Hybrid and On-Grid.</span></h2>
            </div>

          </div>
          <div style={{ marginBottom: 24, aspectRatio: '21 / 9', overflow: 'hidden', borderRadius: 2, background: '#151922' }}>
            <img src={inverterImg} alt="Inverters — hybrid and on-grid units installed and wired" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
          <div className="prod-cards two">
            <div className="prod-card">
              <div className="idx">Hybrid</div>
              <h3>Hybrid inverter</h3>
              <div className="spec">3–100 kW · battery-ready</div>
              <p>Works with or without a battery today, and accepts one later without replacing the inverter. Manages solar, battery and grid together, keeps essentials running during outages. The right pick if you want backup power or plan to add storage.</p>
            </div>
            <div className="prod-card">
              <div className="idx">On-Grid</div>
              <h3>On-Grid inverter</h3>
              <div className="spec">3–100 kW · net-metered</div>
              <p>Sends surplus power to the grid and credits it against your bill. No battery, lower cost, simpler. Best for homes and businesses with reliable grid supply that want the fastest payback.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 03 Batteries */}
      <section className="prod-section" id="batteries">
        <div className="wrap">
          <div className="prod-head">
            <div>
              <div className="kicker">03 / Storage</div>
              <h2>Batteries.</h2>
            </div>
          </div>
          <div style={{ marginBottom: 24, aspectRatio: '1800 / 878', overflow: 'hidden', borderRadius: 2, background: '#151922' }}>
            <img src={battImg} alt="Batteries — storage bank" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
          <div className="prod-cards three">
            <div className="prod-card">
              <div className="idx">Lithium · LiFePO₄</div>
              <h3>Lithium (LiFePO₄)</h3>
              <div className="spec">5–30 kWh · 5,000+ cycles · 10-yr warranty</div>
              <p>Longest life, deepest discharge (80–90%), fastest charging (2–4 h) and zero maintenance. Sealed, wall-mounted or floor-standing, stackable as your load grows. Higher upfront cost, lowest cost per cycle. Best for daily cycling and long hold periods.</p>
            </div>
            <div className="prod-card">
              <div className="idx">Lead-Acid · Tubular</div>
              <h3>Lead-Acid (Tubular)</h3>
              <div className="spec">150–250 Ah · 300–500 cycles · 3–5 yr warranty</div>
              <p>Lowest upfront cost and proven in Indian conditions. Needs periodic topping up and a ventilated space. Discharge only 50% for long life. Best for budget systems, backup-only use and sites where replacement cost is acceptable.</p>
            </div>
            <div className="prod-card">
              <div className="idx">AGM · Sealed</div>
              <h3>AGM (Absorbent Glass Mat)</h3>
              <div className="spec">100–250 Ah · 500–800 cycles · 3–5 yr warranty</div>
              <p>Sealed and maintenance-free, faster charging than flooded lead-acid, spill-proof and vibration-resistant. Mid price point. Best for UPS, telecom, inverter backup and sites where maintenance access is limited.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 04 EV chargers */}
      <section className="prod-section" id="ev">
        <div className="wrap">
          <div className="prod-head">
            <div>
              <div className="kicker">04 / Mobility</div>
              <h2>EV home chargers. <span>AC Type 2, 7.4 kW.</span></h2>
            </div>
            <p>Home and office charging for the EVs actually sold in India. OCPP 1.6 compliant, app-controlled, load-balanced with your solar.</p>
          </div>
          <div style={{ marginBottom: 24, aspectRatio: '1800 / 878', overflow: 'hidden', borderRadius: 2, background: '#151922' }}>
            <img src={evchImg} alt="EV chargers — home and office Type 2 units" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
          <div className="prod-cards three">
            <div className="prod-card">
              <div className="idx">Home</div>
              <h3>Residential charging</h3>
              <div className="spec">7.4 kW AC · Type 2</div>
              <p>Wall-mounted unit for a single parking spot. Charges overnight, syncs with solar surplus, and reports usage per vehicle. Works with Tata Nexon EV, MG ZS EV, Mahindra XUV400 and every Type 2 car sold in India.</p>
            </div>
            <div className="prod-card">
              <div className="idx">Office</div>
              <h3>Commercial / office charging</h3>
              <div className="spec">7.4–22 kW AC · multi-port</div>
              <p>Multi-port units for offices, housing societies and small fleets. Load management across ports, RFID or app access, and OCPP integration with your energy management system. Scales from 2 to 20 ports.</p>
            </div>
            <div className="prod-card">
              <div className="idx">Compatible</div>
              <h3>Cars we charge</h3>
              <div className="spec">Tata · MG · Mahindra · Hyundai · BYD</div>
              <p>Tata Nexon EV and Tiago EV, MG ZS EV and Comet, Mahindra XUV400, Hyundai Kona and Ioniq 5, BYD Atto 3, Citroën ë-C3 and others — all Type 2 / CCS2 compatible. We confirm connector and load before install.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}