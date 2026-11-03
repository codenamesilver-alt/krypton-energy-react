import { useMemo, useState } from 'react'
import { useQuoteModal } from '../context/QuoteModal'

const inr = (n: number) => '₹' + Math.round(n).toLocaleString('en-IN')
const num = (v: string): number => {
  const n = parseFloat(v)
  return isFinite(n) ? n : NaN
}

function showError(id: string, msg: string) {
  const el = document.getElementById(id)
  if (el) el.textContent = msg
}

export default function CalculatorPage() {
  const { open: openQuote } = useQuoteModal()
  const [bill, setBill] = useState('6000')
  const [kw, setKw] = useState('3')
  const [slider, setSlider] = useState('3')
  const [roof, setRoof] = useState('350')
  const [generation, setGeneration] = useState(true)
  const [roofNote, setRoofNote] = useState('')
  const [roofStatus, setRoofStatus] = useState('')

  const result = useMemo(() => {
    const b = num(bill), k = num(kw), area = num(roof)
    let valid = true
    if (bill === '' || !isFinite(b) || b < 0 || b > 1000000) { showError('billError', 'Enter a bill from ₹0 to ₹10,00,000.'); valid = false } else showError('billError', '')
    if (kw === '' || !isFinite(k) || k < 0.5 || k > 20) { showError('loadError', 'Choose a system size from 0.5 to 20 kW.'); valid = false } else showError('loadError', '')
    if (roof === '' || !isFinite(area) || area < 0 || area > 100000) { showError('roofError', 'Enter rooftop area from 0 to 1,00,000 sq ft.'); valid = false } else showError('roofError', '')
    if (!valid) {
      setRoofNote('')
      setRoofStatus('')
      return null
    }
    const perDay = generation ? 4.5 : 4.0
    const daily = k * perDay
    const annual = daily * 365
    const gross = k * 78000
    const net = Math.max(0, gross - 108000)
    const annualSavings = b * 12
    const needed = k * 100
    const payback = annualSavings > 0 ? (net / annualSavings).toFixed(1) + ' years' : 'Not available'
    setRoofNote(`Roof area check: Based on a planning rule of thumb, ${Math.round(needed).toLocaleString('en-IN')} sq ft may be needed for ${k.toFixed(1)} kW.`)
    setRoofStatus(area >= needed
      ? 'Your entered rooftop area meets this rough space estimate.'
      : 'Your entered rooftop area is below the rough estimate; an installer can assess usable space and layout.')
    return {
      annualUnits: Math.round(annual).toLocaleString('en-IN') + ' units',
      dailyUnits: `About ${daily.toFixed(1)} units per day · ${perDay.toFixed(1)} units/kW/day`,
      grossCost: inr(gross),
      netCost: inr(net),
      annualSavings: inr(annualSavings),
      areaNeeded: Math.round(needed).toLocaleString('en-IN') + ' sq ft',
      payback,
      monthlySavings: inr(annualSavings / 12),
    }
  }, [bill, kw, roof, generation])

  const syncFromSlider = (v: string) => {
    setKw(v)
    setSlider(v)
  }

  const handleKwChange = (v: string) => {
    setKw(v)
    const n = parseFloat(v)
    if (isFinite(n) && n >= 0.5 && n <= 20) setSlider(v)
  }

  return (
    <main id="main">
      <section className="section calc" id="calculator">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <div className="kicker">Savings calculator</div>
              <h2>See what solar could <span>do for your home.</span></h2>
            </div>
            <p>Adjust your household load and get a quick estimate of solar generation, upfront cost, potential bill savings, and payback time.</p>
          </div>

          <div className="calc-grid">
            <div className="calc-inputs">
              <h2 className="calc-h2">Your home</h2>

              <div className="f">
                <div className="label-row">
                  <label htmlFor="bill">Average monthly electricity bill</label>
                  <span className="hint">Enter your typical bill</span>
                </div>
                <div className="control">
                  <input id="bill" type="number" min={0} max={1000000} step={500} value={bill} onChange={(e) => setBill(e.target.value)} aria-describedby="billError" />
                  <span className="suffix">INR</span>
                </div>
                <div className="error" id="billError" aria-live="polite" />
              </div>

              <div className="f">
                <div className="label-row">
                  <label htmlFor="load">Solar system size</label>
                  <span className="hint">Editable or use slider</span>
                </div>
                <div className="control">
                  <input id="load" type="number" min={0.5} max={20} step={0.1} value={kw} onChange={(e) => handleKwChange(e.target.value)} aria-describedby="loadError" />
                  <span className="suffix">kW</span>
                </div>
                <div className="range-line">
                  <span>0.5</span>
                  <input id="loadSlider" type="range" min={0.5} max={20} step={0.1} value={slider} onChange={(e) => syncFromSlider(e.target.value)} aria-label="Adjust solar system size" />
                  <span>20</span>
                </div>
                <div className="error" id="loadError" aria-live="polite" />
              </div>

              <div className="f">
                <div className="label-row">
                  <label htmlFor="roof">Usable rooftop area</label>
                  <span className="hint">Approximate clear area</span>
                </div>
                <div className="control">
                  <input id="roof" type="number" min={0} max={100000} step={10} value={roof} onChange={(e) => setRoof(e.target.value)} aria-describedby="roofError" />
                  <span className="suffix">sq ft</span>
                </div>
                <div className="error" id="roofError" aria-live="polite" />
              </div>

              <div className="roof-note" id="roofNote">{roofNote}</div>

              <div className="toggle">
                <input type="checkbox" id="generation" checked={generation} onChange={(e) => setGeneration(e.target.checked)} />
                <label htmlFor="generation">Use 4.5 units per kW per day (midpoint of 4–5)</label>
              </div>
            </div>

            <div className="res" aria-live="polite" aria-atomic="true">
              <div className="res-top">
                <h2>Your estimate</h2>
                <span className="badge">Indicative only</span>
              </div>
              <div className="hero">
                <small>Estimated solar generation</small>
                <strong id="annualUnits">{result?.annualUnits ?? '–'}</strong>
                <span id="dailyUnits">{result?.dailyUnits ?? '–'}</span>
              </div>
              <div className="metrics">
                <div className="metric">
                  <div className="name">Estimated system cost</div>
                  <strong id="grossCost">{result?.grossCost ?? '–'}</strong>
                  <small>Before assumed subsidy</small>
                </div>
                <div className="metric">
                  <div className="name">Estimated net cost</div>
                  <strong id="netCost">{result?.netCost ?? '–'}</strong>
                  <small>After assumed subsidy</small>
                </div>
                <div className="metric">
                  <div className="name">Potential annual bill savings</div>
                  <strong id="savings">{result?.annualSavings ?? '–'}</strong>
                  <small>Based on your current bill</small>
                </div>
                <div className="metric">
                  <div className="name">Estimated roof area needed</div>
                  <strong id="areaNeeded">{result?.areaNeeded ?? '–'}</strong>
                  <small>Rule of thumb: 100 sq ft per kW</small>
                </div>
              </div>
              <div className="roi">
                <span>Simple payback estimate</span>
                <strong id="payback">{result?.payback ?? '–'}</strong>
              </div>
              <div className="footnotes">
                <p><span className="subsidy-label">Subsidy:</span> ₹1,08,000 assumed illustrative amount, capped at system cost and subject to current scheme rules and eligibility.</p>
                <p id="roofStatus">{roofStatus}</p>
                <p>Generation and savings are estimates. Actual output and bill reduction vary with location, shade, orientation, tariff, self-consumption, export credits, and system losses.</p>
              </div>
              <div style={{ marginTop: 22 }}>
                <button className="btn btn-gold btn-pill" onClick={openQuote}>Request Quote</button>
              </div>
            </div>
          </div>

          <p className="legal"><strong>Planning estimate only.</strong> Installation pricing uses ₹78,000 per kW and the savings estimate assumes your solar system can offset up to your full current annual electricity bill. It does not account for financing, maintenance, tariff changes, or export limits. Confirm system sizing, subsidy eligibility, and current prices with a qualified installer and the relevant government portal.</p>
        </div>
      </section>
    </main>
  )
}