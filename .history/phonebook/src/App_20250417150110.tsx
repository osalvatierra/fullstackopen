import { useState, useEffect } from "react";
import { Phonebook } from "./types/phonebook";

import PersonForm from "./components/PersonForm";
import SearchBox from "./components/SearchBox";
import SearchList from "./components/SearchList";

import personService from "./services/personService";

const App = () => {
  const [persons, setPersons] = useState<Phonebook[]>([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState<number>(0);
  const [filteredPersons, setFilterPersons] = useState(persons);
  const [searchField, setSearchField] = useState("");

  const hook = () => {
    console.log("effect");
    personService.getAll().then((response) => {
      console.log("promise fullfilled");
      setPersons(response.data);
    });
  };

  useEffect(hook, []);

  console.log("render", persons.length, "notes");

  useEffect(() => {
    const newFilteredPersons = persons.filter((person) => {
      return person.name.toLocaleLowerCase().includes(searchField);
    });
    setFilterPersons(newFilteredPersons);
  }, [persons, searchField]);

  const addPhoneDetails = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const phoneObject = {
      id: Math.floor(Math.random() * 1000),
      name: newName,
      number: newNumber,
    };

    // const findPerson = persons.find((n) => n.id === phoneObject.id);
    // console.log(findPerson);
    personService.create(phoneObject).then((response) => {
      setPersons(persons.concat(response.data));
      setNewName("");
      setNewNumber(0);
    });
    // .catch((error) => {
    //   alert(`the person '${persons.number}' was already deleted from server`);
    //   setNotes(notes.filter((n) => n.id !== id));
    // });
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    const value = event.target.value;
    persons.map((contact) => {
      if (contact.name === value) {
        console.log("duplicate");
        alert(`${contact.name} is already added to phonebook`);
      } else {
        setNewName(value);
      }
    });
  };

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    const value = Number(event.target.value) || 0;
    setNewNumber(value);
  };

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <h3>Search Contacts</h3>
      <SearchBox
        onChangeHandler={onSearchChange}
        placeholder="search contacts"
      />
      <SearchList persons={filteredPersons} />
      <PersonForm
        addPhoneDetails={addPhoneDetails}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      ...
    </div>
  );
};

export default App;
