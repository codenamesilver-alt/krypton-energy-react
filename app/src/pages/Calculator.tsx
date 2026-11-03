import { useEffect, useRef, useState } from 'react'

export default function CalculatorPage() {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [height, setHeight] = useState(900)

  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      if (e.data && e.data.type === 'calcHeight' && typeof e.data.height === 'number') {
        setHeight(e.data.height + 8)
      }
    }
    window.addEventListener('message', onMsg)
    return () => window.removeEventListener('message', onMsg)
  }, [])

  return (
    <main id="main">
      <iframe
        ref={iframeRef}
        src="/solar-calculator.html"
        title="Solar Savings Calculator"
        style={{ width: '100%', height: `${height}px`, border: 'none', display: 'block' }}
      />
    </main>
  )
}