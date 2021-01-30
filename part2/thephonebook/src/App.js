import { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Person from "./components/Person";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phonenumber: "39-44-5323523" },
    { name: "Ada Lovelace", phonenumber: "040-123456" },
    { name: "Mickey", phonenumber: "0707-123987" },
    { name: "Dan Abramov", phonenumber: "12-46-89456" },
    { name: "Mary Poppendieck", phonenumber: "323" },
  ]);
  const [newName, setNewName] = useState("");
  const [searchName, setNewSearchName] = useState("");
  const [newPhonenumber, setNewPhonenumber] = useState("");

  const hook = () => {
    console.log("Effect");

    axios.get("http://localhost:3001/persons").then((r) => {
      console.log("Promise fulfilled");
      setPersons(r.data);
    });
  };

  useEffect(hook, []);

  const windowAlert = (message) => {
    window.alert(message);
  };

  const addPerson = () => {
    const person = {
      name: newName,
      number: newPhonenumber,
    };

    setPersons(persons.concat(person));
    setNewName("");
    setNewPhonenumber("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Filter through array to see if newName already exists in there
    // If it does, the filter-function will return an array that is not empty
    if (persons.filter((e) => e.name === newName).length > 0) {
      // If the returned array is not empty we warn the user that the name already exists
      windowAlert(`${newName} is already added to the phonebok!`);
    } else {
      // If the returned array is empty we can safely add the person to the phonebook
      addPerson();
    }
  };

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

  // Store our persons-array for future filtering use
  const showPersons =
    searchName.length < 0
      ? persons
      : persons.filter((obj) =>
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
      <Person showPersons={showPersons} />
    </div>
  );
};

export default App;
