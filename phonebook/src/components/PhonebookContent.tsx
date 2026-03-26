import { useState, useRef } from 'react'
import Avatar from 'react-avatar'
import { Camera } from 'lucide-react'
import SearchBox from './SearchBox'
import PersonForm from './PersonForm'
import SearchList from './SearchList'
import uploadService from '../services/uploadService'
import { useNotifications } from '../contexts/NotificationContext'
import EditPersonForm from './EditPersonForm'
import { Phonebook } from '../types/phonebook'
import { Button } from './ui'
import { useAuth } from '../contexts/AuthContext'

interface User {
  name: string
  username: string
  token: string
  address?: string
  avatarUrl?: string
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

  const { updateUser } = useAuth()
  const { showMessage } = useNotifications()
  const [isHoveringAvatar, setIsHoveringAvatar] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleEdit = (person: Phonebook) => {
    setEditingPerson(person)
  }

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0]
    if (!file) return

    //Validate file size
    if (file.size > 5 * 1024 * 1024) {
      showMessage('File size must be less than 5MB', true)
      return
    }

    if (!file.type.startsWith('image/')) {
      showMessage('Please upload an image file', true)
      return
    }

    try {
      setUploading(true)
      uploadService.setToken(user.token)
      const result = await uploadService.uploadAvatar(file)
      console.log('Upload result:', result) // ← See what's actually returned

      // Update user object with new avatar URL
      // You'll need to add a way to update the user in your AuthContext
      updateUser({ avatarUrl: result.avatarUrl })
      showMessage('Profile photo updated successfully!', false)

      // TODO: Update user state with new avatarUrl
      // This might require adding an updateUser function to AuthContext
    } catch (error) {
      console.error('Upload failed:', error)
      showMessage('Failed to upload photo', true)
    } finally {
      setUploading(false)
    }
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
    <>
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

        <div className="relative cursor-pointer items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/48 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
          <div
            className="relative w-36 h-36 mx-auto mb-4"
            onMouseEnter={() => setIsHoveringAvatar(true)}
            onMouseLeave={() => setIsHoveringAvatar(false)}
            onClick={handleAvatarClick}
          >
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={`${user.name} avatar`}
                className="w-36 h-36 rounded-full object-cover"
              />
            ) : (
              <Avatar
                name={user?.name}
                size="150"
                round={true}
                color="#6366f1"
                fgColor="#ffffff"
              />
            )}
            {(isHoveringAvatar || uploading) && (
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                {uploading ? (
                  <div className="text-white">Uploading...</div>
                ) : (
                  <Camera size={32} className="text-white" />
                )}
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              id="avatar-upload"
              onChange={handleFileChange}
              disabled={uploading}
            />
          </div>
          <div className="p-5">
            <h3>Welcome {user?.name} </h3>
            <h3>
              Address
              <br />
              {user?.address}
            </h3>
          </div>
        </div>

        {editingPerson && (
          <EditPersonForm
            person={editingPerson}
            onSubmit={handleUpdateSubmit}
            onCancel={handleCancelEdit}
          />
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 p-8">
        <div className="flex flex-col space-y-4 items-left gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/48 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
          <p>test</p>
        </div>
      </div>
    </>
  )
}
