import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './styles/tailwind-helpers.css'
import './index.css'
import App from './App.jsx'
import { UserProvider } from './features/auth/UserProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </StrictMode>
)
