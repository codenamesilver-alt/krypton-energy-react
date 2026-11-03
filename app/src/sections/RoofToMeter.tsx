export default function RoofToMeter() {
  return (
    <section className="roof-to-meter" aria-label="From roof to meter">
      <div className="wrap">
        <header className="rtm-heading">
          <div className="kicker">From Roof to Meter</div>
          <h1>From Planning to Power, Every Step Made Simple</h1>
          <p className="lead">Your solar journey, managed from start to finish.</p>
          <p className="intro">The paperwork and net meter matter too. We treat them as part of the job—not as your problem.</p>
        </header>

        <section className="rtm-timeline" aria-label="Four steps from roof survey to system handover">
          <div className="rtm-track" aria-hidden="true" />

          <article className="rtm-step reveal">
            <div className="rtm-icon-wrap">
              <svg viewBox="0 0 48 48" aria-hidden="true">
                <path d="M5 25 24 9l19 16M11 22v18h26V22M19 40V28h10v12" />
                <circle cx="34" cy="12" r="6" /><path d="M34 3v3M34 18v3M25 12h3M40 12h3" />
              </svg>
            </div>
            <div className="rtm-step-no">STEP 01</div>
            <h2>Survey</h2>
            <p>Roof assessment, shadow analysis and sanctioned-load check before any quote is issued.</p>
            <span className="rtm-pill">Assess your roof</span>
          </article>

          <article className="rtm-step reveal">
            <div className="rtm-icon-wrap">
              <svg viewBox="0 0 48 48" aria-hidden="true">
                <path d="M8 39h32M12 35V13h24v22M17 19h14M17 25h14M17 31h8" />
                <path d="m8 13 16-8 16 8M29 29l4 4 8-9" />
              </svg>
            </div>
            <div className="rtm-step-no">STEP 02</div>
            <h2>Design</h2>
            <p>System sized to your bill, not to a sales target. Single-line diagram and layout shared for approval.</p>
            <span className="rtm-pill">Designed for your needs</span>
          </article>

          <article className="rtm-step reveal">
            <div className="rtm-icon-wrap">
              <svg viewBox="0 0 48 48" aria-hidden="true">
                <path d="m7 20 17-12 17 12M12 18v22h24V18M19 40V27h10v13" />
                <path d="m17 22 5 5 10-11" />
              </svg>
            </div>
            <div className="rtm-step-no">STEP 03</div>
            <h2>Install</h2>
            <p>Our own crew handles mounting, cabling, earthing and commissioning in 2–4 days for a typical home.</p>
            <span className="rtm-pill">Installed by our crew</span>
          </article>

          <article className="rtm-step reveal">
            <div className="rtm-icon-wrap">
              <svg viewBox="0 0 48 48" aria-hidden="true">
                <rect x="9" y="6" width="30" height="36" rx="4" />
                <path d="M16 16h16M16 23h9M16 31l5 5 11-12" />
              </svg>
            </div>
            <div className="rtm-step-no">STEP 04</div>
            <h2>Handover</h2>
            <p>Net-meter application filed, subsidy paperwork submitted and monitoring app configured.</p>
            <span className="rtm-pill">Ready to monitor</span>
          </article>
        </section>

        <aside className="rtm-netmeter">
          <svg viewBox="0 0 48 48" aria-hidden="true">
            <rect x="8" y="5" width="32" height="38" rx="5" />
            <path d="M15 14h18M15 22h18M15 30h7M28 28l4 4 6-8" />
          </svg>
          <div>
            <strong>From the first roof check to the final handover</strong>
            <span>We keep the process moving—including the net-meter and subsidy paperwork described in your project plan.</span>
          </div>
        </aside>
        <div className="rtm-footer">Krypton Energy • A clearer journey to solar</div>
      </div>
    </section>
  )
}