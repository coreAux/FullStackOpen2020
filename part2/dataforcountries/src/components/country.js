import React from "react";
import Weather from "./weather";

const Country = ({ country, filterLength }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h2>Languages</h2>
      <ul>
        {country.languages.map((language) => (
          <li key={language.iso639_1}>{language.name}</li>
        ))}
      </ul>
      <p>
        <img src={country.flag} alt={`${country}'s flag`} />
      </p>
      <Weather capital={country.capital} country={country.name} />
    </div>
  );
};

export default Country;
