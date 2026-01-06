import { useEffect, useState } from 'react'
import { Phonebook, NewPhonebookEntry } from '../types/phonebook'
import personService from '../services/personService'

interface User {
  name: string
  username: string
  token: string
  address?: string
}

export function usePersons(user: User | null) {
  const [persons, setPersons] = useState<Phonebook[]>([])

  useEffect(() => {
    if (user?.token) {
      personService.setToken(user.token)
      personService.getAll().then(setPersons).catch(console.error)
    }
  }, [user])

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      await personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id))
        })
        .catch((err) => {
          console.error(err)
          throw err
        })
    }
  }
  const handleUpdate = async (
    id: string,
    data: { name: string; number: string }
  ) => {
    const updatedPerson: Phonebook = {
      id: id,
      name: data.name,
      number: data.number,
    }

    await personService
      .update(id, updatedPerson)
      .then((response) => {
        setPersons(persons.map((p) => (p.id === id ? response : p)))
        return response
      })
      .catch((error) => {
        console.error(error)
        throw error
      })
  }

  const handleSubmit = async (data: { name: string; number: string }) => {
    const { name, number } = data

    const existingPerson = persons.find((p) => p.name === name)

    if (existingPerson) {
      console.log(existingPerson)
      const updatedPerson: Phonebook = {
        id: existingPerson.id!,
        name: name,
        number: number,
      }
      await personService
        .update(existingPerson.id, updatedPerson)
        .then((response) => {
          setPersons(
            persons.map((p) => (p.id === existingPerson.id ? response : p))
          )
          return response
        })
        .catch((error) => {
          console.error(error)
          throw error
        })
    } else {
      const newPerson: NewPhonebookEntry = {
        name: name,
        number: number,
      }

      await personService
        .create(newPerson)
        .then((response) => {
          setPersons((prev) => prev.concat(response))
          return response
        })
        .catch((error) => {
          console.error('Error object:', error)
          console.error('Error response:', error.response?.data)
          throw error
        })
    }
  }

  return { persons, setPersons, handleDelete, handleUpdate, handleSubmit }
}
