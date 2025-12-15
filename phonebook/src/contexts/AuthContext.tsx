import { createContext, useContext, useState, useReducer, ReactNode } from "react";
import loginService from '../services/login'
import registerService from '../services/register'
import personService from '../services/personService'


interface User {
  name: string
  username: string
  token: string
  address?: string
}

interface AuthContextType {
    user: User | null
    login: (username: string, password: string) => Promise<void>
    logout: () => void
    register: (credentials: RegisterCredentials) => Promise<void>
    isAuthenticated: boolean
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

const initialState = {
    user: null,
    isAuthenticated: false,
}


  
// Action Types
type AuthAction = 
    | {type: "LOGIN"; payload: User }
    | {type: "LOGOUT"; }
    | {type: "REGISTER_SUCCESS"; }

// Reducer
function authReducer(state, action: AuthAction) {
    switch (action.type) {
        case 'LOGIN':
            return {...state, user: null, isAuthenticated: true}
        case 'LOGOUT':
            return {...state, user: null, isAuthenticated: false}

        default:
            throw new Error("Unknown action");
    }
}

// Provider
function AuthProvider({children}: {children: ReactNode}) {
    const [{user, isAuthenticated}, dispatch] = useReducer(
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
      dispatch({type: 'LOGIN', payload: loginResponse})
    } catch (exception: unknown) {
      console.error('Login failed:', exception)
      throw exception
    }
  }

  const logout = () => {
    // Logout logic here
    setUser(null)
    personService.setToken('')
    setPersons([])
    setMessage('Logged our successfully')
    setIsError(false)
    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }

  const register = async (event: React.FormEvent<HTMLFormElement>) => {
    // Register logic here
        event.preventDefault()

    console.log('Register state values:', {
      registerName,
      registerEmail,
      registerAddress,
      registerPassword,
    })

    try {
      const result = await registerService.register({
        name: registerName,
        email: registerEmail,
        address: registerAddress,
        password: registerPassword,
      })

      if (result.status === 'ok') {
        setMessage('Registration successful! Please log in.')
        setIsError(false)
        setRegisterName('')
        setRegisterEmail('')
        setRegisterAddress('')
        setRegisterPassword('')
        setRegisterVisible(false)
        setLoginVisible(true)

        setTimeout(() => {
          setMessage(null)
        }, 5000)
      } else {
        setMessage(result.error || 'Registration failed')
        setIsError(true)
        setTimeout(() => {
          setMessage(null)
          setIsError(false)
        }, 5000)
      }
    } catch (error: any) {
      console.error('Registration error:', error)
      setMessage(error.response?.data?.error || 'Registration failed')
      setIsError(true)
      setTimeout(() => {
        setMessage(null)
        setIsError(false)
      }, 5000)
    }
  }    

    return (
        <AuthContext.Provider value={{user, isAuthenticated, login, logout, register }}>
            {children}

        </AuthContext.Provider>
    )
};

  export function useAuth() {
    const context = useContext(AuthContext)
    if(context === undefined) {
        throw new Error ('useAuth must be used within AuthProvider')
    }
    return context
  }