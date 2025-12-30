import { useAuth } from './contexts/AuthContext'
import { usePersons } from './hooks/usePersons'
import { useNotifications } from './hooks/useNotifications'
import { usePhonebook } from './hooks/usePhonebook'
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
  const { persons, setPersons, handleDelete, handleUpdate, handleSubmit } =
    usePersons(user)
  const { handleLogin } = usePhonebook()

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

  const handleUpdateWithMessage = async (
    id: string,
    data: { name: string; number: string }
  ) => {
    try {
      await handleUpdate(id, data)
      showMessage(`${data.name} was updated`, false)
    } catch {
      showMessage('Failed to update contact', true)
    }
  }

  const handleSubmitWithMessage = async (data: {
    name: string
    number: string
  }) => {
    try {
      await handleSubmit(data)
      showMessage(`${data.name} was added to phonebook`, false)
    } catch (error: any) {
      let errorMessage = 'An unexpected error occured.'
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error.replace(
          'Person Validation failed: ',
          ''
        )
      } else if (error.message) {
        errorMessage = error.message
      }
      showMessage(errorMessage, true)
    }
  }

  const handleDeleteWithMessage = async (id: string) => {
    const personToDelete = persons.find((p) => p.id === id)
    const deletedName = personToDelete?.name ?? 'Uknown'

    try {
      await handleDelete(id)
      showMessage(`${deletedName} was removed from the phonebook`, false)
    } catch {
      showMessage(`Failed to delete contact.`, true)
    }
  }

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
