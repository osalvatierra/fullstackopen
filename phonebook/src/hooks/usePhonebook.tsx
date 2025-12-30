import { useAuth } from '../contexts/AuthContext'
import { usePersons } from '../hooks/usePersons'
import { useNotifications } from '../hooks/useNotifications'

export function usePhonebook() {
  const { user, isAuthenticated, login, logout, register } = useAuth()
  const { message, isError, showMessage } = useNotifications()
  const { persons, setPersons, handleDelete, handleUpdate, handleSubmit } =
    usePersons(user)

  const handleLogin = async (username: string, password: string) => {
    try {
      await login(username, password)
      showMessage('Login Sussessful', false, 3000)
    } catch {
      showMessage('Wrong credentials', true)
    }
  }

  return { handleLogin }
}
