import { useState } from 'react'
import SearchBox from './SearchBox'
import PersonForm from './PersonForm'
import SearchList from './SearchList'
import EditPersonForm from './EditPersonForm'
import { Phonebook } from '../types/phonebook'
import styles from '../App.module.css'

interface User {
  name: string
  username: string
  token: string
  address?: string
}

interface PhonebookContentProps {
  user: User
  persons: Phonebook[]
  onLogout: () => void
  onDelete: (id: string) => void
  onUpdate: (id: string, data: { name: string; number: string }) => void
  onSubmit: (data: { name: string; number: string }) => void
}

export default function PhonebookContent({
  user,
  persons,
  onLogout,
  onDelete,
  onUpdate,
  onSubmit,
}: PhonebookContentProps) {
  const [searchField, setSearchField] = useState('')
  const [editingPerson, setEditingPerson] = useState<Phonebook | null>(null)

  const handleEdit = (person: Phonebook) => {
    setEditingPerson(person)
  }

  const handleCancelEdit = () => {
    setEditingPerson(null)
  }

  const handleUpdateSubmit = (updatedData: {
    name: string
    number: string
  }) => {
    if (!editingPerson) return

    onUpdate(editingPerson.id, updatedData)
    setEditingPerson(null)
  }

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchField.toLowerCase()),
  )

  return (
    <div className={styles.content}>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <p>{user?.username} logged in</p>
        <button onClick={onLogout}>Logout</button>

        <h3>Search Contacts</h3>

        <SearchBox
          onSearch={(searchTerm) => setSearchField(searchTerm)}
          placeholder="search contacts"
        />

        <SearchList
          persons={filteredPersons}
          handleDelete={onDelete}
          handleEdit={handleEdit}
        />

        <PersonForm handleSubmit={onSubmit} />
      </div>

      <div>
        <h3>Welcome {user?.name} </h3>
        <h3>
          Address
          <br />
          {user?.address}
        </h3>
      </div>

      {editingPerson && (
        <EditPersonForm
          person={editingPerson}
          onSubmit={handleUpdateSubmit}
          onCancel={handleCancelEdit}
        />
      )}
    </div>
  )
}
