import { useEffect } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { QuoteModalProvider } from './context/QuoteModal'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import ContactForm from './components/forms/ContactForm'
import WhatsAppFloat from './components/ui/WhatsAppFloat'
import './styles/whatsapp.css'
import Home from './pages/Home'
import AboutPage from './pages/About'
import ProductsPage from './pages/Products'
import CalculatorPage from './pages/Calculator'
import FAQPage from './pages/FAQ'
import ContactPage from './pages/Contact'
import BlogPage from './pages/Blog'
import BlogPostPage from './pages/BlogPost'
import BlogAdminPage from './pages/BlogAdmin'

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
        {/* the Locations page now lives inside About Us */}
        <Route path="/locations" element={<Navigate to="/about" replace />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/success-stories" element={<Navigate to="/" replace />} />
        <Route path="/calculator" element={<CalculatorPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/admin" element={<BlogAdminPage />} />
        <Route path="/admin" element={<BlogAdminPage />} />
        <Route path="/blog" element={<BlogPage />} />
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