import { useEffect, useRef, useState } from 'react'

export default function HowSolarWorks() {
  const [mode, setMode] = useState<'day' | 'night'>('day')
  const svgRef = useRef<SVGSVGElement>(null)
  const dotsRef = useRef<SVGGElement>(null)
  const statusRef = useRef<HTMLParagraphElement>(null)
  const batTagRef = useRef<SVGTextElement>(null)
  const builtRef = useRef(false)

  // Build the animated dots once on mount
  useEffect(() => {
    const svg = svgRef.current
    const dots = dotsRef.current
    if (!svg || !dots || builtRef.current) return
    builtRef.current = true
    const NS = 'http://www.w3.org/2000/svg'
    const flows = Array.from(svg.querySelectorAll('.flow')) as SVGPathElement[]
    flows.forEach((f) => {
      const id = f.getAttribute('data-p')!
      const d = document.getElementById(id)!.getAttribute('d')!
      f.setAttribute('d', d)
      for (let i = 0; i < 3; i++) {
        const c = document.createElementNS(NS, 'circle')
        c.setAttribute('r', '5')
        c.setAttribute('class', 'dot')
        const a = document.createElementNS(NS, 'animateMotion')
        a.setAttribute('dur', '3s')
        a.setAttribute('repeatCount', 'indefinite')
        a.setAttribute('begin', `${i}s`)
        a.setAttribute('path', d)
        c.appendChild(a)
        c.dataset.m = f.getAttribute('data-m')!
        dots.appendChild(c)
      }
    })
  }, [])

  // Apply mode changes
  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    const flows = Array.from(svg.querySelectorAll('.flow')) as SVGPathElement[]
    const dots = dotsRef.current ? Array.from(dotsRef.current.children) as SVGElement[] : []
    flows.forEach((f) => {
      f.classList.toggle('off', (f.getAttribute('data-m') || '').split(' ').indexOf(mode) < 0)
    })
    dots.forEach((c) => {
      c.style.display = (c.dataset.m || '').split(' ').indexOf(mode) < 0 ? 'none' : ''
    })
    if (statusRef.current) {
      statusRef.current.textContent =
        mode === 'day'
          ? 'Daytime: the panels make DC power. The inverter turns it into AC for your appliances, charges the battery and exports extra power to the grid.'
          : 'Night: the panels are idle. The battery supplies your home first, and the grid tops up when needed.'
    }
    if (batTagRef.current) batTagRef.current.textContent = mode === 'day' ? 'Charging' : 'Discharging'
    const sun = svg.querySelector('.sun') as SVGElement | null
    if (sun) sun.style.opacity = mode === 'day' ? '1' : '.15'
  }, [mode])

  return (
    <section className="system-diagram" aria-label="How your solar system works">
      <div className="wrap">
        <div className="sys-head">
          <span className="kicker">How it works</span>
          <h2 className="sys-title">How your solar system works</h2>
          <p className="sys-sub">Follow the glowing lines to see where the power goes.</p>
        </div>
        <div className="tabs" role="group" aria-label="Time of day">
          <button id="bDay" aria-pressed={mode === 'day'} onClick={() => setMode('day')}>Daytime</button>
          <button id="bNight" aria-pressed={mode !== 'day'} onClick={() => setMode('night')}>Night</button>
        </div>
        <div className="panel">
          <svg ref={svgRef} viewBox="0 0 1000 600" role="img" aria-label="Animated diagram: solar panels feed the solar inverter, which supplies home appliances, the battery and the grid">
            <defs>
              <linearGradient id="inv" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#f4f2ee" />
                <stop offset="1" stopColor="#cfcbc4" />
              </linearGradient>
            </defs>

            {/* base wiring */}
            <g className="base">
              <path id="pSolar" d="M215,150 H400" />
              <path id="pHome" d="M440,400 V500 H250" />
              <path id="pCharge" d="M600,350 H840 V430" />
              <path id="pDis" d="M870,430 V380 H600" />
              <path id="pExport" d="M600,170 H835 V145" />
              <path id="pImport" d="M880,145 V205 H600" />
            </g>
            {/* flows */}
            <g id="flows">
              <path className="flow" data-p="pSolar" data-m="day" />
              <path className="flow" data-p="pHome" data-m="day night" />
              <path className="flow" data-p="pCharge" data-m="day" />
              <path className="flow" data-p="pExport" data-m="day" />
              <path className="flow" data-p="pDis" data-m="night" />
              <path className="flow" data-p="pImport" data-m="night" />
            </g>
            <g ref={dotsRef} id="dots" />

            {/* solar panels */}
            <g transform="translate(40,70)">
              <g className="sun">
                <circle cx="30" cy="0" r="12" className="ico" />
                <path className="ico" d="M30,-22v-8M30,22v8M8,0h-8M52,0h8M14,-16l-6,-6M46,16l6,6M46,-16l6,-6M14,16l-6,6" />
              </g>
              <path className="ico fill" d="M0,150 L40,70 L190,70 L175,150 Z" />
              <path className="ico" d="M14,120 H182 M27,95 H187 M80,70 L62,150 M135,70 L120,150" />
            </g>
            <text className="lbl" x="135" y="255">Solar panels</text>
            <text className="tag" x="135" y="276">DC power</text>

            {/* inverter */}
            <rect x="400" y="100" width="200" height="300" rx="22" fill="url(#inv)" stroke="#fff" strokeOpacity=".5" />
            <rect x="418" y="120" width="164" height="160" rx="12" fill="#1f3a2c" />
            <path className="ico" stroke="var(--glow)" d="M440,200 q15,-30 30,0 t30,0 M520,160 h40 M520,240 h40 M520,200 h40" />
            <rect x="430" y="310" width="140" height="48" rx="8" fill="#1c2027" />
            <circle cx="450" cy="334" r="5" fill="var(--green)"><animate attributeName="opacity" values="1;.3;1" dur="2s" repeatCount="indefinite" /></circle>
            <path className="ico" stroke="var(--muted)" d="M470,334 h80" />
            <text className="lbl" x="500" y="435">Solar inverter</text>
            <text className="tag" x="500" y="456">Converts DC to AC</text>

            {/* grid tower */}
            <g transform="translate(860,40)" className="ico fill">
              <path d="M0,100 L15,30 L30,100 M15,30 L15,0 M2,60 H28 M6,40 H24 M-15,15 H45 M-10,25 H40 M-5,100 L35,100 M2,60 L28,100 M28,60 L2,100" />
            </g>
            <text className="lbl" x="940" y="170" style={{ textAnchor: 'middle' }}>Grid</text>

            {/* appliances */}
            <g transform="translate(40,420)">
              <rect className="ico fill" x="0" y="0" width="130" height="38" rx="6" />
              <path className="ico" d="M14,26 h102 M30,50 v14 M65,50 v14 M100,50 v14" />
              <rect className="ico fill" x="150" y="0" width="50" height="110" rx="5" />
              <path className="ico" d="M150,42 h50 M160,18 v10 M160,58 v16" />
              <rect className="ico fill" x="30" y="92" width="100" height="60" rx="4" />
            </g>
            <text className="lbl" x="135" y="555">Home appliances</text>

            {/* battery */}
            <g transform="translate(800,440)">
              <rect className="ico fill" x="0" y="0" width="140" height="110" rx="12" />
              <rect x="18" y="26" width="104" height="58" rx="6" fill="#1f3a2c" />
              <rect id="lvl" x="22" y="30" width="60" height="50" rx="4" fill="var(--green)" />
              <rect className="ico fill" x="52" y="-9" width="36" height="9" rx="2" />
            </g>
            <text className="lbl" x="870" y="580">Battery</text>
            <text className="tag" ref={batTagRef} x="870" y="428"></text>
          </svg>
        </div>
        <p ref={statusRef} aria-live="polite" className="sys-status"></p>
      </div>
    </section>
  )
}