import { useState } from 'react'
import LoginForm from './Login'
import RegisterForm from './register'
import styles from './App.module.css'

interface AuthFormsProps {
    onLogin: (username: string, password: string) => Promise<void>
    onRegister: (data: RegisterData) => Promise<void>
}

export default function AuthForms({onLogin, onRegister}) {
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

       const { login, logout, register } = useAuth()
     

       const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        try {
        await login(username, password)
        setUsername('')
        setPassword('')
        } catch (exception: unknown) {
        console.error('Login failed:', exception)
        setMessage('Wrong credentials')
        setIsError(true)
        setTimeout(() => {
            setMessage(null)
            setIsError(false)
        }, 5000)
        }
    }

    const handleLogout = () => {
        logout()
        setPersons([])
        setMessage('Logged out successfully')
        setIsError(false)
        setTimeout(() => {
        setMessage(null)
        }, 3000)
    }

    const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        try {
        await register({
            name: registerName,
            email: registerEmail,
            address: registerAddress,
            password: registerPassword,
        })

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

    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }
    const hideRegisterWhenVisible = { display: registerVisible ? 'none' : '' }
    const showRegisterWhenVisible = { display: registerVisible ? '' : 'none' }

return(
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