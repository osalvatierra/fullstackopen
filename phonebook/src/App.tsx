import { useAuth } from './contexts/AuthContext'
import { usePersons } from './hooks/usePersons'
import { useNotifications } from './hooks/useNotifications'
import AuthForms from './components/AuthForms'
import PhonebookContent from './components/PhonebookContent'
import Notifications from './components/notifications'

import styles from './App.module.css'

interface RegisterData {
  name: string
  email: string
  address: string
  password: string
}

const App = () => {
  // Login State
  const { user, isAuthenticated, login, logout, register } = useAuth()
  const { message, isError, showMessage } = useNotifications()
  const { persons, setPersons, handleDelete, handleUpdate, handleSubmit } = usePersons(user)

  const handleLogin = async (username: string, password: string) => {
    try{
      await login(username, password)
      showMessage('Login Sussessful', false, 3000)
    } catch {
      showMessage('Wrong credentials', true)
    }
  }

  const handleLogout = () => {
    logout()
    setPersons([])
    showMessage('Logged out successfully', false, 3000)
  }

  const handleRegister = async (data: RegisterData) => {
    try {
      await register(data)
      showMessage('Registration sucessful! Please log in', false, 3000)
    } catch (error: any) {
      showMessage(error.response?.data.error || 'Registration failed', true)
    }
  }


  console.log('Final persons state:', persons)
  return (
    <main className={styles.homemain}>
      <h2 className={styles.headerPhone}>Phonebook</h2>
      <Notifications message={message} type={isError ? 'error' : 'note'} />

      {!isAuthenticated ? (
        <AuthForms onLogin={handleLogin} onRegister={handleRegister} />
      ): (
        <PhonebookContent
          user={user!}
          persons={persons}
          onLogout={handleLogout}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
          onSubmit={handleSubmit}
        />
      )}
    </main>
  )
}

export default App
