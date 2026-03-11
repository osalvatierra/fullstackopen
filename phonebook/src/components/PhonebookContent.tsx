import Avatar from 'react-avatar'
import { Camera } from 'lucide-react'
import { useState } from 'react'
import SearchBox from './SearchBox'
import PersonForm from './PersonForm'
import SearchList from './SearchList'
import EditPersonForm from './EditPersonForm'
import { Phonebook } from '../types/phonebook'
import { Button } from './ui'

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

  const [isHoveringAvatar, setIsHoveringAvatar] = useState(false)

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

      <div
        className="relative items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/48 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10"
        onMouseEnter={() => setIsHoveringAvatar(true)}
        onMouseLeave={() => setIsHoveringAvatar(false)}
      >
        <Avatar
          name={user?.name}
          size="150"
          round={true}
          color="#6366f1"
          fgColor="#ffffff"
        />

        {isHoveringAvatar && (
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center cursor-pointer">
            <Camera size={32} className="text-white" />
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          id="avatar-upload"
          // onChange handler coming next
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
