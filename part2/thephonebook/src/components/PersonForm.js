import React from "react";

const PersonForm = ({
  handleSubmit,
  newName,
  handleNameChange,
  newPhonenumber,
  handlePhonenumberChange,
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          Name:{" "}
          <input
            value={newName}
            onChange={handleNameChange}
            placeholder="Name"
          />
        </div>
        <div>
          Number:{" "}
          <input
            value={newPhonenumber}
            onChange={handlePhonenumberChange}
            placeholder="Tel. number"
          />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
