import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Box, Container } from '@mui/material'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ItemListContainer from './components/ItemListContainer'
import ItemDetailContainer from './components/ItemDetailContainer'
import CartView from './components/CartView'
import Checkout from './components/Checkout'
import QuoteCalculator from './components/QuoteCalculator'
import ProfileView from './components/ProfileView'

function AnimatedPage({ children }) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <>{children}</>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

function App() {
  const location = useLocation()

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar />
      <Container component="main" maxWidth="lg" sx={{ py: 4, pb: 14 }}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <AnimatedPage>
                  <ItemListContainer />
                </AnimatedPage>
              }
            />
            <Route
              path="/category/:categoryId"
              element={
                <AnimatedPage>
                  <ItemListContainer />
                </AnimatedPage>
              }
            />
            <Route
              path="/item/:itemId"
              element={
                <AnimatedPage>
                  <ItemDetailContainer />
                </AnimatedPage>
              }
            />
            <Route
              path="/cotizador"
              element={
                <AnimatedPage>
                  <QuoteCalculator />
                </AnimatedPage>
              }
            />
            <Route
              path="/perfil"
              element={
                <AnimatedPage>
                  <ProfileView />
                </AnimatedPage>
              }
            />
            <Route
              path="/cart"
              element={
                <AnimatedPage>
                  <CartView />
                </AnimatedPage>
              }
            />
            <Route
              path="/checkout"
              element={
                <AnimatedPage>
                  <Checkout />
                </AnimatedPage>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </Container>
      <Footer />
    </Box>
  )
}

export default App
