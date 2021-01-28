import React from "react";

const Filter = ({ searchName, handleSearchName }) => {
  return (
    <div>
      Filter shown with:{" "}
      <input
        value={searchName}
        onChange={handleSearchName}
        placeholder="E.g. Donald, Goofy..."
      />
    </div>
  );
};

export default Filter;
