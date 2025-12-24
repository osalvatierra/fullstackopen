import { useEffect, useState } from "react";
import { Phonebook, NewPhonebookEntry } from "../types/phonebook";
import personService from "../services/personService";

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
            personService.getAll()
                .then(setPersons)
                .catch(console.error)
        }
    }, [user])

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this contact?')) {
            personService
                .remove(id)
                .then(() => {
                    setPersons(persons.filter((p) => p.id !== id))
                    const deletedName =
                        persons.find((p) => p.id === id)?.name ?? 'Unknown'
                    console.log(deletedName)
                })
                .catch((err) => {
                    console.error(err)
                    throw err
                })
        }
    }
    const handleUpdate = (id: string, data: { name: string; number: string }) => {

        const updatedPerson: Phonebook = {
            id: id,
            name: data.name,
            number: data.number,
        }

        personService
            .update(id, updatedPerson)
            .then((response) => {
                setPersons(
                    persons.map((p) => (p.id === editingPerson.id ? response : p))
                )
                setMessage(`${updatedData.name} was updated`)
                setIsError(false)
                setEditingPerson(null)
            })
            .catch((error) => {
                console.error(error)
                setMessage(`Failed to update contact`)
                setIsError(true)
            })
    }

    const handleSubmit = (data: any) => {
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

    return { persons, setPersons, handleDelete, handleUpdate, handleSubmit }

}