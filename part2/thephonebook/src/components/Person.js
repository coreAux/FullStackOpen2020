import React from "react";

const Person = ({ showPersons }) => {
  return (
    <div>
      {showPersons.map((person) => (
        <p key={person.name}>
          {person.name}: {person.number}
        </p>
      ))}
    </div>
  );
};

export default Person;
