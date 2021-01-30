import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ capital, country }) => {
  // NOTE: WEATHER HOOK
  const [currentWeather, setCurrentWeather] = useState(0);

  // Get our weather data from weatherstack  API
  const getWeatherHook = () => {
    const API_KEY = process.env.REACT_APP_API_KEY;
    const countryCapitalNoDots = capital.split(".").join("");
    const countryNameNoDots = country.split(".").join("");

    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${countryCapitalNoDots},${countryNameNoDots}&units=m`
      )
      .then((resp) => {
        console.log("Fetching weather working!");
        setCurrentWeather(resp.data);
        console.log(resp.data);
      });
  };

  // Run the weather hook
  useEffect(getWeatherHook, [capital, country]);

  if (currentWeather === 0) {
    return (
      <div>
        <p>Loading weather...</p>
      </div>
    );
  } else {
    return (
      <div>
        <h2>Weather in {currentWeather.location.name}</h2>
        <p>
          <strong>Temperature:</strong> {currentWeather.current.temperature}{" "}
          degrees celsius
        </p>
        {currentWeather.current.weather_icons.map((icon) => (
          <img
            src={`${icon}`}
            alt="Icon of weather"
            className="weather-icon"
            key={`${icon}`}
          />
        ))}
        <p>
          <strong>Wind: </strong>
          {currentWeather.current.wind_speed} mph direction{" "}
          {currentWeather.current.wind_dir}
        </p>
      </div>
    );
  }
};

export default Weather;
