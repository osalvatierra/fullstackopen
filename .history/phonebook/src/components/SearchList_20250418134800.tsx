import { Phonebook } from "../types/phonebook";

type SearchListProps = {
  persons: Phonebook[];
  handleDelete: (id: string) => void;
};

const SearchList = ({ persons, handleDelete }: SearchListProps) => {
  return (
    <div>
      <ul>
        {persons.map((person) => (
          <li key={person.id}>
            {person.name} — {person.number}{" "}
            <button type="button" onClick={() => handleDelete(person.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchList;
