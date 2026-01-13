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
      await personService.remove(id)
      setPersons(persons.filter((p) => p.id !== id))
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

    const response = await personService.update(id, updatedPerson)
    setPersons(persons.map((p) => (p.id === id ? response : p)))
    return response
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

      const response = await personService.update(
        existingPerson.id,
        updatedPerson
      )

      setPersons(
        persons.map((p) => (p.id === existingPerson.id ? response : p))
      )
      return { type: 'update', response }
    } else {
      const newPerson: NewPhonebookEntry = {
        name: name,
        number: number,
      }

      const response = await personService.create(newPerson)
      setPersons((prev) => prev.concat(response))
      return { type: 'create', response }
    }
  }

  return { persons, setPersons, handleDelete, handleUpdate, handleSubmit }
}
