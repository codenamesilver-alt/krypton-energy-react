import { useQuoteModal } from '../../context/QuoteModal'
import QuoteForm from './QuoteForm'

export default function ContactForm() {
  const { isOpen, close } = useQuoteModal()
  if (!isOpen) return null
  return (
    <div className="quote-modal" onClick={close}>
      <div className="quote-box" onClick={(e) => e.stopPropagation()}>
        <button className="quote-close" onClick={close} aria-label="Close">×</button>
        <QuoteForm />
      </div>
    </div>
  )
}