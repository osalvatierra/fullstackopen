import { useAuth } from '../contexts/AuthContext'
import { usePersons } from '../hooks/usePersons'
import { useNotifications } from '../contexts/NotificationContext'

interface RegisterData {
  name: string
  email: string
  address: string
  password: string
}

export function usePhonebook() {
  const { user, login, logout, register } = useAuth()
  const { showMessage } = useNotifications()
  const { persons, setPersons, handleDelete, handleUpdate, handleSubmit } =
    usePersons(user)

  const handleLogin = async (username: string, password: string) => {
    try {
      await login(username, password)
      showMessage('Login Successful', false, 3000)
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
      showMessage('Registration Successful! Please log in', false, 3000)
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
      const result = await handleSubmit(data)

      if (result.type === 'update') {
        showMessage(`${data.name} was updated`, false)
      } else {
        showMessage(`${data.name} was added to phonebook`, false)
      }
    } catch (error: any) {
      let errorMessage = 'An unexpected error occurred.'
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
    const deletedName = personToDelete?.name ?? 'Unknown'

    try {
      await handleDelete(id)
      showMessage(`${deletedName} was removed from the phonebook`, false)
    } catch {
      showMessage(`Failed to delete contact.`, true)
    }
  }

  return {
    persons,
    handleLogin,
    handleLogout,
    handleRegister,
    handleUpdateWithMessage,
    handleSubmitWithMessage,
    handleDeleteWithMessage,
  }
}
