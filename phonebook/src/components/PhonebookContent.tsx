import { useState } from 'react'
import SearchBox from './SearchBox'
import PersonForm from './PersonForm'
import SearchList from './SearchList'
import EditPersonForm from './EditPersonForm'
import { Phonebook } from '../types/phonebook'
import { Button } from './ui'
import Avatar from 'react-avatar'

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
    <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 p-8">
      <div className="flex flex-col space-y-4 items-left gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/48 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
        <Button className="float-right" onClick={onLogout}>
          Logout
        </Button>
        <p className="text-lg font-semibold text-black p-4 w-80">
          {user?.username} logged in
        </p>

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

      <div className="items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/48 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
        <Avatar
          name={user?.name}
          size="150"
          round={true}
          color="#6366f1" // indigo-500
          fgColor="#ffffff" // white text
        />
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
