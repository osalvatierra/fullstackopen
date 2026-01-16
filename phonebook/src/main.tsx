import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { AuthProvider } from './contexts/AuthContext'
import { NotificationProvider } from './contexts/NotificationContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <NotificationProvider>
      <App />
    </NotificationProvider>

  </AuthProvider>
)
