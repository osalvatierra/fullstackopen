import { useState } from 'react'
import LoginForm from './Login'
import RegisterForm from './register'
import styles from '../App.module.css'

interface RegisterData {
  name: string
  email: string
  address: string
  password: string
}

interface AuthFormsProps {
  onLogin: (username: string, password: string) => Promise<void>
  onRegister: (data: RegisterData) => Promise<void>
}

export default function AuthForms({ onLogin, onRegister }: AuthFormsProps) {
  const [loginVisible, setLoginVisible] = useState(false)
  const [registerVisible, setRegisterVisible] = useState(false)

  // Local State for form inputs
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // Register State
  const [registerName, setRegisterName] = useState('')
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerAddress, setRegisterAddress] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')


  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      await onLogin(username, password)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.error('Login failed:', error)

    }
  }

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      await onRegister({
        name: registerName,
        email: registerEmail,
        address: registerAddress,
        password: registerPassword,
      })


      setRegisterName('')
      setRegisterEmail('')
      setRegisterAddress('')
      setRegisterPassword('')
      setRegisterVisible(false)
      setLoginVisible(true)

    } catch (error) {
      console.error('Registration error:', error)

    }
  }

  const hideWhenVisible = { display: loginVisible ? 'none' : '' }
  const showWhenVisible = { display: loginVisible ? '' : 'none' }
  const hideRegisterWhenVisible = { display: registerVisible ? 'none' : '' }
  const showRegisterWhenVisible = { display: registerVisible ? '' : 'none' }

  return (
    <div className={styles.LogRegButtons}>
      <div>
        <div style={hideWhenVisible}>
          <button
            className={styles.buttonsLogReg}
            onClick={() => setLoginVisible(true)}
          >
            Login
          </button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>





      <div>
        <div style={hideRegisterWhenVisible}>
          <button
            className={styles.buttonsLogReg}
            onClick={() => setRegisterVisible(true)}
          >
            register
          </button>
        </div>
        <div style={showRegisterWhenVisible}>
          <RegisterForm
            name={registerName}
            email={registerEmail}
            address={registerAddress}
            password={registerPassword}
            handleNameChange={({ target }) => setRegisterName(target.value)}
            handleEmailChange={({ target }) => setRegisterEmail(target.value)}
            handleAddressChange={({ target }) =>
              setRegisterAddress(target.value)
            }
            handlePasswordChange={({ target }) =>
              setRegisterPassword(target.value)
            }
            handleSubmit={handleRegister}
          />
          <button onClick={() => setRegisterVisible(false)}>cancel</button>
        </div>
      </div>

    </div>
  )
}
