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
      id: Math.floor(Math.random() * 1000).toString(),
      name: newName,
      number: newNumber,
    };

    const isDuplicate = persons.some((p) => p.name === newName);
    if (isDuplicate) {
      alert(`${newName} is already added to the phonebook`);
      return; // <-- THIS is what prevents the submission
    }

    personService
      .create(phoneObject)
      .then((response) => {
        setPersons(persons.concat(response.data));
        setNewName("");
        setNewNumber(0);
      })
      .catch((error) => {
        console.log(error);
        alert("An error occurred");
      });
  };

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    const value = event.target.value;

    setNewName(value);
  };

  const handleNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    const value = Number(event.target.value) || 0;
    setNewNumber(value);
  };

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id));
        })
        .catch((err) => {
          console.error(err);
          alert("Failed to delete contact.");
        });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    const existingPerson = persons.find((p) => p.name === newName);

    const phoneObject = {
      name: newName,
      number: newNumber,
    };

    if (existingPerson) {
      personService
        .update(existingPerson.id, phoneObject)
        .then((response) => {
          setPersons(
            persons.map((p) => (p.id === existingPerson.id ? response.data : p))
          );
          alert(`${newName} updated sucessfully.`);
        })
        .catch((error) => {
          console.error(error);
          alert("Update Failed");
        });
    } else {
      const isDuplicate = persons.some((p) => p.name === newName);
      if (isDuplicate) {
        alert(`${newName} is already added to the phonebook`);
        return; // <-- THIS is what prevents the submission
      }
      personService
        .create({ ...phoneObject, id: crypto.randomUUID() })
        .then((response) => {
          setPersons(persons.concat(response.data));
          alert(`${newName} added to phonebook.`);
        });
    }

    setNewName("");
    setNewNumber(0);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <h3>Search Contacts</h3>
      <SearchBox
        onChangeHandler={onSearchChange}
        placeholder="search contacts"
      />
      <SearchList persons={filteredPersons} handleDelete={handleDelete} />
      <PersonForm
        handleSubmit={handleSubmit}
        handleName={handleName}
        handleNumber={handleNumber}
        newName={newName}
        newNumber={newNumber}
      />
      ...
    </div>
  );
};

export default App;
