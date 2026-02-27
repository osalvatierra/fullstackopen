import { formProps } from '../types/formprops'
import { useState } from 'react'

const PersonForm = ({ handleSubmit }: formProps) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState<string>('')

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)
    const value = event.target.value

    setNewName(value)
  }

  const handleNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)
    const value = event.target.value
    setNewNumber(value)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    handleSubmit({ name: newName, number: newNumber })
  }

  return (
    <form onSubmit={onSubmit}>
      <div>
        name:
        <input
          placeholder={'Full Name'}
          value={newName}
          onChange={handleName}
        />
      </div>
      <div>
        Phone: <input value={newNumber} onChange={handleNumber} />
      </div>
      <div>
        <button
          type="submit"
          className="border-purple-200 text-purple-600 hover:border-transparent hover:bg-purple-600 hover:text-white active:bg-purple-700 ..."
        >
          add
        </button>
      </div>
    </form>
  )
}
export default PersonForm
