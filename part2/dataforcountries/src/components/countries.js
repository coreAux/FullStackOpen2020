import React, { useState } from "react";
import Country from "./country";

const Countries = ({ country, filterLength, searchTerm }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <div>
        {filterLength === 1 ? " " : <>{country.name} </>}
        {filterLength > 1 && filterLength < 10 && searchTerm.length !== 0 ? (
          <button onClick={() => setShow(!show)}>show</button>
        ) : (
          " "
        )}
        {show ? <Country country={country} filterLength={filterLength} /> : ""}
      </div>
      {/* START FILTER */}
      {filterLength === 1 ? (
        <Country country={country} filterLength={filterLength} />
      ) : (
        " "
      )}
      {/* STOP FILTER */}
    </>
  );
};

export default Countries;
