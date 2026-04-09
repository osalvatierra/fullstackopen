import { Phonebook } from '../types/phonebook'
import { Button } from './ui'

type SearchListProps = {
  persons: Phonebook[]
  handleEdit: (person: Phonebook) => void
  handleDelete: (id: string) => void
}

const SearchList = ({ persons, handleEdit, handleDelete }: SearchListProps) => {
  return (
    <div>
      <ul>
        {persons.map((person) => (
          <li key={person.id} className="flow-root">
            {person.name} — {person.number}{' '}
            <div className="float-right">
              <Button type="button" onClick={() => handleEdit(person)}>
                Edit
              </Button>
              <Button type="button" onClick={() => handleDelete(person.id)}>
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SearchList
