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
    projects,
    handleLogin,
    handleLogout,
    handleRegister,
    handleUpdateWithMessage,
    handleSubmitWithMessage,
    handleDeleteWithMessage,
    handleProjectDeleteWithMessage,
    handleProjectUpdateWithMessage,
    handleProjectSubmitWithMessage,
  } = usePhonebook()

  console.log('Final persons state:', persons)

  return (
    <main
      className={`${isAuthenticated ? styles.homemain : styles.homemainLoggedOut} flex flex-col min-h-screen`}
    >
      <h2 className={`${styles.headerPhone} text-3xl font-bold p-8`}>
        Personal Project Planner
      </h2>
      <Notifications message={message} type={isError ? 'error' : 'note'} />

      {!isAuthenticated ? (
        <AuthForms onLogin={handleLogin} onRegister={handleRegister} />
      ) : (
        <PhonebookContent
          user={user!}
          persons={persons}
          projects={projects}
          onLogout={handleLogout}
          onDelete={handleDeleteWithMessage}
          onUpdate={handleUpdateWithMessage}
          onSubmit={handleSubmitWithMessage}
          onProjectDelete={handleProjectDeleteWithMessage}
          onProjectUpdate={handleProjectUpdateWithMessage}
          onProjectSubmit={handleProjectSubmitWithMessage}
        />
      )}
    </main>
  )
}

export default App
