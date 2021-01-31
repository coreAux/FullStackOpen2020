// Mark : - Imports
// Libraries
import { useState, useEffect } from "react";

// CSS
import "./App.css";

// Components
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Person from "./components/Person";

// Services
import personService from "./services/persons.js";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "39-44-5323523" },
    { name: "Ada Lovelace", number: "040-123456" },
    { name: "Mickey", number: "0707-123987" },
    { name: "Dan Abramov", number: "12-46-89456" },
    { name: "Mary Poppendieck", number: "323" },
  ]);
  const [newName, setNewName] = useState("");
  const [searchName, setNewSearchName] = useState("");
  const [newPhonenumber, setNewPhonenumber] = useState("");

  // CRUD functions
  // Create, invoked by the handelSubmit function
  const addPerson = () => {
    const person = {
      name: newName,
      number: newPhonenumber,
    };

    personService.create(person).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewPhonenumber("");
    });
  };

  // Read
  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  // Update
  const updatePerson = () => {
    const person = persons.find((p) => p.name === newName);
    const id = person.id;
    const changedPerson = { ...person, number: newPhonenumber };

    personService
      .update(id, changedPerson)
      .then((returnedPerson) => {
        setPersons(persons.map((p) => (p.id !== id ? p : returnedPerson)));
      })
      .catch((err) => {
        window.alert(err);
        setPersons(persons.filter((p) => p.id !== id));
      });
  };

  // Delete person
  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .deletePerson(id)
        .then((returnedData) => {
          setPersons(persons.filter((p) => p.id !== id));
        })
        .catch((err) => window.alert(err));
    }
  };

  // Handlers
  // Syncs the input with the components state
  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };
  const handlePhonenumberChange = (e) => {
    setNewPhonenumber(e.target.value);
  };
  const handleSearchName = (e) => {
    setNewSearchName(e.target.value);
  };

  // Function for when form is submitted
  const handleSubmit = (e, person) => {
    e.preventDefault();

    // Filter through array to see if newName already exists in there
    // If it does, the filter-function will return an array that is not empty
    if (persons.filter((e) => e.name === newName).length > 0) {
      // If the returned array is not empty we warn the user that the name already exists
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        updatePerson();
      }
    } else {
      // If the returned array is empty we can safely add the person to the phonebook
      addPerson();
    }
  };

  // Store our persons-array for future filtering use
  const showPersons = persons.filter((obj) =>
    obj.name.toLowerCase().includes(searchName.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <div>
        <Filter searchName={searchName} handleSearchName={handleSearchName} />
      </div>
      <div>
        <h2>Add new</h2>
        <PersonForm
          handleSubmit={handleSubmit}
          newName={newName}
          handleNameChange={handleNameChange}
          newPhonenumber={newPhonenumber}
          handlePhonenumberChange={handlePhonenumberChange}
        />
      </div>
      <h2>Numbers</h2>
      <Person showPersons={showPersons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
