import { Phonebook } from "../types/phonebook";

type SearchListProps = {
  persons: Phonebook[];
  handleDelete: (id: number) => void;
};

const SearchList = ({ persons, handleDelete }: SearchListProps) => {
  return (
    <div>
      <ul>
        {persons.map((person) => (
          <li key={person.id}>
            {person.name} — {person.number}{" "}
            <button type="submit" onClick={() => handleDelete(person.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchList;
