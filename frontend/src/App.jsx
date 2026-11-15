import { BrowserRouter, Routes, Route } from 'react-router-dom'

import AppLayout from './layout/AppLayout'
import LandingPage from './pages/LandingPage'
import LoginPage from './features/auth/LoginPage'

import InstrumentsPage from './features/instruments/InstrumentsPage'
import InstrumentPage from './features/instruments/InstrumentPage'
import About from './pages/AboutPage'

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/instruments" element={<InstrumentsPage />} />
          <Route path="/instrument/:id" element={<InstrumentPage />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  )
}

export default App
