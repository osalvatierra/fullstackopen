import { createContext, useContext, useReducer, ReactNode } from 'react'
import loginService from '../services/login'
import registerService from '../services/register'
import personService from '../services/personService'

interface User {
  name: string
  username: string
  token: string
  address?: string
}

interface RegisterCredentials {
  name: string
  email: string
  address: string
  password: string
}

interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => Promise<void>
  logout: () => void
  register: (credentials: RegisterCredentials) => Promise<void>
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const initialState = {
  user: null,
  isAuthenticated: false,
}

// Action Types
type AuthAction =
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'REGISTER_SUCCESS' }

// Reducer
function authReducer(state, action: AuthAction) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload, isAuthenticated: true }
    case 'LOGOUT':
      return { ...state, user: null, isAuthenticated: false }

    default:
      throw new Error('Unknown action')
  }
}

// Provider
export function AuthProvider({ children }: { children: ReactNode }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    authReducer,
    initialState
  )

  const login = async (username: string, password: string) => {
    try {
      const loginResponse = await loginService.login({
        username,
        password,
      })

      personService.setToken(loginResponse.token)
      dispatch({ type: 'LOGIN', payload: loginResponse })
    } catch (exception: unknown) {
      console.error('Login failed:', exception)
      throw exception
    }
  }

  const logout = () => {
    personService.setToken('')
    dispatch({ type: 'LOGOUT' })
  }

  const register = async (credentials: RegisterCredentials) => {
    await registerService.register(credentials)
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
