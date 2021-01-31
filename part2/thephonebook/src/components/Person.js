import React from "react";

const Person = ({ showPersons, deletePerson }) => {
  return (
    <div>
      {showPersons.map((person) => (
        <p key={person.name}>
          {person.name}: {person.number}
          <button onClick={() => deletePerson(person.id, person.name)}>
            Delete
          </button>
        </p>
      ))}
    </div>
  );
};

export default Person;
