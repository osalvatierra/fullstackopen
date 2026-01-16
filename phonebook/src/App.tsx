import { useAuth } from './contexts/AuthContext'
import { useNotifications } from './contexts/NotificationContext'
import { usePhonebook } from './hooks/usePhonebook'
import AuthForms from './components/AuthForms'
import PhonebookContent from './components/PhonebookContent'
import Notifications from './components/notifications'

import styles from './App.module.css'

const App = () => {
  // Login State
  const { user, isAuthenticated } = useAuth()
  const { message, isError } = useNotifications()

  const {
    persons,
    handleLogin,
    handleLogout,
    handleRegister,
    handleUpdateWithMessage,
    handleSubmitWithMessage,
    handleDeleteWithMessage,
  } = usePhonebook()

  console.log('Final persons state:', persons)

  return (
    <main className={styles.homemain}>
      <h2 className={styles.headerPhone}>Phonebook</h2>
      <Notifications message={message} type={isError ? 'error' : 'note'} />

      {!isAuthenticated ? (
        <AuthForms onLogin={handleLogin} onRegister={handleRegister} />
      ) : (
        <PhonebookContent
          user={user!}
          persons={persons}
          onLogout={handleLogout}
          onDelete={handleDeleteWithMessage}
          onUpdate={handleUpdateWithMessage}
          onSubmit={handleSubmitWithMessage}
        />
      )}
    </main>
  )
}

export default App
