import { createRoot } from 'react-dom/client'
import { AuthProvider } from './Context/AuthContext.tsx'
import { UserProvider } from './Context/UserContext.tsx'
import './index.css'
import './i18n.js'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <UserProvider>
      <App />
    </UserProvider>
  </AuthProvider>
  // <StrictMode>
  // </StrictMode>,
)
