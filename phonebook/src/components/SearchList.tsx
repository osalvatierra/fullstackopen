import { Phonebook } from '../types/phonebook'

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
          <li key={person.id}>
            {person.name} — {person.number}{' '}
            <button type="button" onClick={() => handleEdit(person)}>
              Edit
            </button>
            <button type="button" onClick={() => handleDelete(person.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SearchList
