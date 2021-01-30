import React, { useState, useEffect } from "react";
import axios from "axios";
import Countries from "./components/countries";
import "./App.css";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // NOTE: COUNTRIES HOOK
  const [countries, setCountries] = useState([]);
  // Get our data from the restcountries API
  const getCountriesHook = () => {
    axios.get("https://restcountries.eu/rest/v2/all").then((resp) => {
      console.log("Fetching countries working!");
      setCountries(resp.data);
    });
  };
  // Run the function that gets our data
  useEffect(getCountriesHook, []);

  // Handlers
  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  // We set one contant that checks if the searchTerm specifically is identical to one of the entries in our data
  // Since this will be 1 if it finds something we can use that to filter the data
  const edgeCase = countries.filter(
    (obj) => obj.name.toLowerCase() === searchTerm.toLowerCase()
  );

  const filter =
    // If we have an edgecase, our filter will consist of that single entry
    edgeCase.length === 1
      ? countries.filter(
          (obj) => obj.name.toLowerCase() === searchTerm.toLowerCase()
        )
      : // Otherwise filter through the data as before
        countries.filter((obj) =>
          obj.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

  return (
    <div>
      <div>
        <label>Find countries: </label>
        <input
          value={searchTerm}
          onChange={handleSearchTerm}
          placeholder="E.g. Finland, Sweden..."
        />
      </div>
      <div className="debug">Hi I'm debug :)</div>
      <div>
        {filter.length > 10 && searchTerm.length !== 0 ? (
          <p>Too many matches, specify another filter!</p>
        ) : (
          <>
            {filter.map((country) => (
              <Countries
                country={country}
                filterLength={filter.length}
                searchTerm={searchTerm}
                key={country.name}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default App;
