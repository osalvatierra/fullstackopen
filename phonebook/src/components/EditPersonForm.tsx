import React, { useState } from 'react'
import { Phonebook } from '../types/phonebook'

interface EditPersonFormProps {
  person: Phonebook
  onSubmit: (data: { name: string; number: string }) => void
  onCancel: () => void
}

const EditPersonForm: React.FC<EditPersonFormProps> = ({
  person,
  onSubmit,
  onCancel,
}) => {
  const [name, setName] = useState(person.name)
  const [number, setNumber] = useState(person.number)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit({ name, number })
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '8px',
          minWidth: '300px',
        }}
      >
        <h2>Edit Contact</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ display: 'block', width: '100%', marginTop: '.5rem' }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="number">Number</label>
            <input
              type="text"
              id="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              required
              style={{ display: 'block', width: '100%', marginTop: '0.5rem' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button type="submit">Save</button>
            <button type="button" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditPersonForm
