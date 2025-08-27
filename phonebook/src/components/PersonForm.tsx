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

  return (
    <form onSubmit={handleSubmit}>
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
        <button type="submit">add</button>
      </div>
    </form>
  )
}
export default PersonForm
