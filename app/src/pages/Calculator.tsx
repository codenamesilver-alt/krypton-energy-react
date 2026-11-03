import { useEffect, useRef, useState } from 'react'
import { useQuoteModal } from '../context/QuoteModal'

export default function CalculatorPage() {
  const { open: openQuote } = useQuoteModal()
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [height, setHeight] = useState(900)

  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      if (e.data && e.data.type === 'calcHeight' && typeof e.data.height === 'number') {
        setHeight(e.data.height + 8)
      }
      if (e.data && e.data.type === 'requestQuote') {
        openQuote()
      }
    }
    window.addEventListener('message', onMsg)
    return () => window.removeEventListener('message', onMsg)
  }, [openQuote])

  return (
    <main id="main">
      <div style={{ paddingTop: 113 }}>
        <iframe
          ref={iframeRef}
          src="/solar-calculator.html"
          title="Solar Savings Calculator"
          style={{ width: '100%', height: `${height}px`, border: 'none', display: 'block' }}
        />
      </div>
    </main>
  )
}