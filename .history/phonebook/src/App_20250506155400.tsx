import { useState, useEffect } from "react";
import { Phonebook, NewPhonebookEntry } from "./types/phonebook";

import PersonForm from "./components/PersonForm";
import SearchBox from "./components/SearchBox";
import SearchList from "./components/SearchList";
import Notifications from "./components/notifications";

import personService from "./services/personService";

const App = () => {
  const [persons, setPersons] = useState<Phonebook[]>([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState<number>(0);
  // const [filteredPersons, setFilterPersons] = useState(persons);
  const [searchField, setSearchField] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    console.log("App mounted");

    return () => {
      console.log("App unmounted");
    };
  }, []);

  const hook = () => {
    console.log("effect");
    personService.getAll().then((response) => {
      console.log("promise fullfilled");
      console.log("Fetched persons:", response.data);
      setPersons(response.data);
    });
  };

  useEffect(hook, []);

  console.log("render", persons.length, "notes");

  // useEffect(() => {
  //   const newFilteredPersons = persons.filter((person) => {
  //     return person.name.toLocaleLowerCase().includes(searchField);
  //   });
  //   setFilterPersons(newFilteredPersons);
  // }, [persons, searchField]);

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchField.toLowerCase())
  );

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
          const deletedName =
            persons.find((p) => p.id === id)?.name ?? "Unknown";
          console.log(deletedName);
          setMessage(`${deletedName} was removed from the phonebook`);
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

    if (existingPerson) {
      console.log(existingPerson);
      const updatedPerson: Phonebook = {
        id: existingPerson.id!,
        name: newName,
        number: newNumber,
      };
      personService
        .update(existingPerson.id, updatedPerson)
        .then((response) => {
          setPersons(
            persons.map((p) => (p.id === existingPerson.id ? response.data : p))
          );
          alert(`${newName} updated sucessfully.`);
          setMessage(`${newName} was updated`);
        })
        .catch((error) => {
          console.error(error);
          setMessage(`${error}`);
          setIsError(true);
          alert("Update Failed");
        });
    } else {
      const newPerson: NewPhonebookEntry = {
        name: newName,
        number: newNumber,
      };

      personService
        .create(newPerson)
        .then((response) => {
          setPersons((prev) => prev.concat(response.data));
          setMessage(`${newName} was added to phonebook`);
          setTimeout(() => alert(`${newName} added to phonebook.`), 0);
        })
        .catch((error) => {
          console.error(error);
          setMessage(`A name and number are required`);
          setIsError(true);
        });
    }

    setNewName("");
    setNewNumber(0);
  };
  console.log("Final persons state:", persons);
  return (
    <div>
      <h2>Phonebook</h2>
      <Notifications message={message} type={isError ? "error" : "note"} />
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
    </div>
  );
};

export default App;
