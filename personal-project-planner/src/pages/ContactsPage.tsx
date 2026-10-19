import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Phonebook } from '../types/phonebook'
import SearchBox from '../components/SearchBox'
import SearchList from '../components/SearchList'
import PersonForm from '../components/PersonForm'
import EditPersonForm from '../components/EditPersonForm'
import { Button } from '../components/ui'

interface ContactsPageProps {
  persons: Phonebook[]
  onDelete: (id: string) => void
  onUpdate: (id: string, data: { name: string; number: string }) => void
  onSubmit: (data: { name: string; number: string }) => void
}
export default function ContactsPage({
  persons,
  onDelete,
  onUpdate,
  onSubmit,
}: ContactsPageProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [editingPerson, setEditingPerson] = useState<Phonebook | null>(null)
  const navigate = useNavigate()

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleEdit = (person: Phonebook) => {
    setEditingPerson(person)
  }

  const handleCancelEdit = () => {
    setEditingPerson(null)
  }

  const handleUpdateSubmit = (updateData: { name: string; number: string }) => {
    if (editingPerson) {
      onUpdate(editingPerson.id, updateData)
      setEditingPerson(null)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="flex items-center gap-4 mb-6">
        <Button
          onClick={() => navigate('/')}
          className="border-2 border-puple-200 text-purple-600 hover:bg-purple-600 hover:text-white"
        >
          ← Back
        </Button>
        <h2 className="text-2xl font-bold">Contacts</h2>
      </div>

      <div className="rounded-x1l bg-white p-6 shadow-lg outline outline-black/48 mb-6">
        <h3 className="text-lg font-semibold mb-4">Search Contact</h3>
        <SearchBox
          onSearch={(searchTerm) => setSearchTerm(searchTerm)}
          placeholder="Search contacts..."
        />
        <div className="mt-4">
          <SearchList
            persons={filteredPersons}
            handleEdit={handleEdit}
            handleDelete={onDelete}
          />
        </div>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-lg outline outline-black/48">
        <h3 className="text-lg font-semibold mb-4">Add New Contact</h3>
        <PersonForm handleSubmit={onSubmit} />
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
