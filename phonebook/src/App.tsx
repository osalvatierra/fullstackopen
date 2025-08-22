import React from 'react'
import { useState, useEffect } from 'react'
import { Phonebook, NewPhonebookEntry } from './types/phonebook'

import PersonForm from './components/PersonForm'
import SearchBox from './components/SearchBox'
import SearchList from './components/SearchList'
import Notifications from './components/notifications'
import loginService from './services/login'

import personService from './services/personService'

interface User {
  name: string
  username: string
  token: string
  // add other fields your login response returns
}

const App = () => {
  const [persons, setPersons] = useState<Phonebook[]>([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState<string>('')

  const [searchField, setSearchField] = useState('')
  const [message, setErrorMessage] = useState<string | null>(null)
  const [isError, setIsError] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState<User | null>(null)

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const loginResponse = await loginService.login({
        username,
        password,
      })

      personService.setToken(loginResponse.token)
      setUser(loginResponse)
      setUsername('')
      setPassword('')
    } catch (exception: unknown) {
      console.error('Login failed:', exception)
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const phonebookContent = () => (
    <div>
      <p>{user?.name} logged in</p>

      <h3>Search Contacts</h3>
      <SearchBox
        onChangeHandler={onSearchChange}
        placeholder="search contacts"
      />
      <SearchList persons={filteredPersons} handleDelete={handleDelete} />
      <PersonForm
        handleSubmit={handleSubmit}
        handleName={handleName}
        handleNumber={handleNumber}
        newName={newName}
        newNumber={newNumber}
      />
    </div>
  )

  useEffect(() => {
    console.log('App mounted')

    return () => {
      console.log('App unmounted')
    }
  }, [])

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

  console.log('render', persons.length, 'notes')

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchField.toLowerCase())
  )

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)
    const value = event.target.value

    setNewName(value)
  }

  const handleNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)
    const value = event.target.value
    setNewNumber(value)
  }

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchFieldString = event.target.value.toLocaleLowerCase()
    setSearchField(searchFieldString)
  }

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id))
          const deletedName =
            persons.find((p) => p.id === id)?.name ?? 'Unknown'
          console.log(deletedName)
          setErrorMessage(`${deletedName} was removed from the phonebook`)
        })
        .catch((err) => {
          console.error(err)
          alert('Failed to delete contact.')
        })
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault()

    const existingPerson = persons.find((p) => p.name === newName)

    if (existingPerson) {
      console.log(existingPerson)
      const updatedPerson: Phonebook = {
        id: existingPerson.id!,
        name: newName,
        number: newNumber,
      }
      personService
        .update(existingPerson.id, updatedPerson)
        .then((response) => {
          setPersons(
            persons.map((p) => (p.id === existingPerson.id ? response : p))
          )
          alert(`${newName} updated sucessfully.`)
          setErrorMessage(`${newName} was updated`)
        })
        .catch((error) => {
          console.error(error)
          setErrorMessage(`${error}`)
          setIsError(true)
          alert('Update Failed')
        })
    } else {
      const newPerson: NewPhonebookEntry = {
        name: newName,
        number: newNumber,
      }

      personService
        .create(newPerson)
        .then((response) => {
          setPersons((prev) => prev.concat(response))
          setErrorMessage(`${newName} was added to phonebook`)
          setIsError(false)
          setTimeout(() => alert(`${newName} added to phonebook.`), 0)
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

          setErrorMessage(errorMessage)
          setIsError(true)
        })
    }

    setNewName('')
    setNewNumber('')
  }
  console.log('Final persons state:', persons)
  return (
    <div>
      <h2>Phonebook</h2>
      <Notifications message={message} type={isError ? 'error' : 'note'} />

      {user === null ? loginForm() : phonebookContent()}
    </div>
  )
}

export default App
