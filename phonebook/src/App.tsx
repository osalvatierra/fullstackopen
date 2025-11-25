import React from 'react'
import styles from './App.module.css'

import { useState, useEffect } from 'react'
import { Phonebook, NewPhonebookEntry } from './types/phonebook'

import PersonForm from './components/PersonForm'
import SearchBox from './components/SearchBox'
import SearchList from './components/SearchList'
import RegisterForm from './components/register'
import LoginForm from './components/Login'
import Notifications from './components/notifications'
import loginService from './services/login'
import registerService from './services/register'
import personService from './services/personService'

interface User {
  name: string
  username: string
  token: string
  // add other fields your login response returns
}

const App = () => {
  const [loginVisible, setLoginVisible] = useState(false)
  const [registerVisible, setRegisterVisible] = useState(false)
  const [persons, setPersons] = useState<Phonebook[]>([])
  const [searchField, setSearchField] = useState('')
  const [message, setMessage] = useState<string | null>(null) // Fixed: renamed from setErrorMessage
  const [isError, setIsError] = useState(false)

  // Login State
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState<User | null>(null)

  // Register State
  const [registerName, setRegisterName] = useState('')
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerAddress, setRegisterAddress] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const loginResponse = await loginService.login({
        username,
        password,
      })

      console.log('Full login response:', loginResponse) // ← Add this
      console.log('Name field:', loginResponse.name) // ← Add this
      console.log('Username field:', loginResponse.username) // ← Add this

      personService.setToken(loginResponse.token)
      setUser(loginResponse)
      setUsername('')
      setPassword('')
    } catch (exception: unknown) {
      console.error('Login failed:', exception)
      setMessage('Wrong credentials') // Fixed: use setMessage
      setIsError(true) // Fixed: set error state
      setTimeout(() => {
        setMessage(null) // Fixed: use setMessage
        setIsError(false) // Fixed: reset error state
      }, 5000)
    }
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
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
    )
  }

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
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

  const registerForm = () => {
    const hideWhenVisible = { display: registerVisible ? 'none' : '' }
    const showWhenVisible = { display: registerVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button
            className={styles.buttonsLogReg}
            onClick={() => setRegisterVisible(true)}
          >
            register
          </button>
        </div>
        <div style={showWhenVisible}>
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
    )
  }

  const authForms = () => (
    <div className={styles.LogRegButtons}>
      {loginForm()}
      {registerForm()}
    </div>
  )

  const phonebookContent = () => (
    <div>
      <div>
        <p>{user?.username} logged in</p>
        <h3>Search Contacts</h3>
        <SearchBox
          onSearch={(searchTerm) => setSearchField(searchTerm)}
          placeholder="search contacts"
        />
        <SearchList persons={filteredPersons} handleDelete={handleDelete} />
        <PersonForm handleSubmit={handleSubmit} />
      </div>

      <h3>Welcome {user?.name} </h3>
    </div>
  )

  useEffect(() => {
    if (user && user.token) {
      personService.setToken(user.token)
      personService
        .getAll()
        .then((response) => {
          console.log('Fetched persons:', response)
          setPersons(response)
        })
        .catch((error) => {
          console.error('Failed to fetch persons:', error)
        })
    }
  }, [user])

  const loggedInContent = () => <div>{phonebookContent()}</div>

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchField.toLowerCase())
  )

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id))
          const deletedName =
            persons.find((p) => p.id === id)?.name ?? 'Unknown'
          console.log(deletedName)
          setMessage(`${deletedName} was removed from the phonebook`) // Fixed: use setMessage
          setIsError(false) // Fixed: set as success message
        })
        .catch((err) => {
          console.error(err)
          setMessage('Failed to delete contact.') // Fixed: use setMessage instead of alert
          setIsError(true) // Fixed: set error state
        })
    }
  }

  const handleSubmit = (data: { name: string; number: string }) => {
    const { name, number } = data

    const existingPerson = persons.find((p) => p.name === name)

    if (existingPerson) {
      console.log(existingPerson)
      const updatedPerson: Phonebook = {
        id: existingPerson.id!,
        name: name,
        number: number,
      }
      personService
        .update(existingPerson.id, updatedPerson)
        .then((response) => {
          setPersons(
            persons.map((p) => (p.id === existingPerson.id ? response : p))
          )
          setMessage(`${name} was updated`) // Fixed: use setMessage
          setIsError(false) // Fixed: set as success message
        })
        .catch((error) => {
          console.error(error)
          setMessage(`Failed to update ${name}`) // Fixed: cleaner error message
          setIsError(true)
        })
    } else {
      const newPerson: NewPhonebookEntry = {
        name: name,
        number: number,
      }

      personService
        .create(newPerson)
        .then((response) => {
          setPersons((prev) => prev.concat(response))
          setMessage(`${name} was added to phonebook`) // Fixed: use setMessage
          setIsError(false)
        })
        .catch((error) => {
          console.error('Error object:', error)
          console.error('Error response:', error.response?.data)

          let errorMessage = 'An unexpected error occurred.'

          // First try to extract from response if it's available
          if (
            error.response &&
            error.response.data &&
            typeof error.response.data.error === 'string'
          ) {
            errorMessage = error.response.data.error.replace(
              'Person validation failed: ',
              ''
            )
          } else if (error.message) {
            // Fallback to error.message if response is undefined
            const match = error.message.match(/Person validation failed: (.+)/)
            if (match) {
              errorMessage = match[1]
            } else {
              errorMessage = error.message
            }
          }

          setMessage(errorMessage) // Fixed: use setMessage
          setIsError(true)
        })
    }
  }

  console.log('Final persons state:', persons)
  return (
    <main className={styles.homemain}>
      <h2 className={styles.headerPhone}>Phonebook</h2>
      <Notifications message={message} type={isError ? 'error' : 'note'} />

      {user === null ? authForms() : loggedInContent()}
    </main>
  )
}

export default App
