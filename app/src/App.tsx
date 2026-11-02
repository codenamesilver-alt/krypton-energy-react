import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { QuoteModalProvider } from './context/QuoteModal'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import ContactForm from './components/forms/ContactForm'
import WhatsAppFloat from './components/ui/WhatsAppFloat'
import './styles/whatsapp.css'
import Home from './pages/Home'
import AboutPage from './pages/About'
import LocationsPage from './pages/Locations'
import ProductsPage from './pages/Products'
import SuccessStoriesPage from './pages/SuccessStories'
import CalculatorPage from './pages/Calculator'
import FAQPage from './pages/FAQ'

function AppShell() {
  const { pathname } = useLocation()
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in')
          io.unobserve(e.target)
        }
      })
    }, { threshold: 0.18 })
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [pathname])

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/locations" element={<LocationsPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/success-stories" element={<SuccessStoriesPage />} />
        <Route path="/calculator" element={<CalculatorPage />} />
        <Route path="/faq" element={<FAQPage />} />
      </Routes>
      <Footer />
      <ContactForm />
      <WhatsAppFloat />
    </>
  )
}

export default function App() {
  return (
    <QuoteModalProvider>
      <AppShell />
    </QuoteModalProvider>
  )
}