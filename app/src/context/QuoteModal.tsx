import { createContext, useContext, useState, type ReactNode } from 'react'

type Ctx = { open: () => void; close: () => void; isOpen: boolean }
const QuoteModalContext = createContext<Ctx>({ open: () => {}, close: () => {}, isOpen: false })

export function QuoteModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <QuoteModalContext.Provider value={{ open: () => setIsOpen(true), close: () => setIsOpen(false), isOpen }}>
      {children}
    </QuoteModalContext.Provider>
  )
}

export const useQuoteModal = () => useContext(QuoteModalContext)