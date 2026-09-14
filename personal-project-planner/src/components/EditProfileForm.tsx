import { useState } from 'react'
import { Button, Input } from './ui'

interface EditProfileFormProps {
  currentName: string
  currentAddress: string
  onSubmit: (data: { name: string; address: string }) => void
  onCancel: () => void
}

export default function EditProfileForm({
  currentName,
  currentAddress,
  onSubmit,
  onCancel,
}: EditProfileFormProps) {
  const [name, setName] = useState(currentName)
  const [address, setAddress] = useState(currentAddress)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit({ name, address: address })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full min-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit Profile</h2>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            x
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <Input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
