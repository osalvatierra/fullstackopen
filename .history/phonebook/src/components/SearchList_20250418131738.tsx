import { Phonebook } from "../types/phonebook";

type SearchListProps = {
  persons: Phonebook[];
};

const SearchList = ({ persons }: SearchListProps) => {
  return (
    <div>
      <ul>
        {persons.map((person) => (
          <li key={person.id}>
            {person.name} — {person.number}{" "}
            <button type="submit">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchList;
