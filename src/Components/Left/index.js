import React, { useState } from "react";
import dayjs from "dayjs";
import { UseWeatherAppContext } from "../../Context/Context";

const LeftComponents = () => {
  const WEEKDAYS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const {
    state: { city, current },
  } = UseWeatherAppContext();
  const [isCelsius, setIsCelsius] = useState(true); // State to track temperature unit

  if (!current) return <div>Loading...</div>;

  const weekdayIndex = dayjs.unix(current.dt).day();

  // Utility function to convert Celsius to Fahrenheit
  const celsiusToFahrenheit = (celsius) => (celsius * 9) / 5 + 32;

  // Utility function to convert Fahrenheit to Celsius

  // Function to toggle between Celsius and Fahrenheit
  const toggleTemperatureUnit = (tempInCelsius) => {
    return isCelsius ? tempInCelsius : celsiusToFahrenheit(tempInCelsius);
  };

  // Function to handle toggle button click
  const handleToggleClick = () => {
    setIsCelsius(!isCelsius);
  };

  return (
    <>
      <div className="leftWrap">
        <div className="dateWrap">
        <h5>Weather || Buddy</h5>
          <h2>{WEEKDAYS[weekdayIndex]}</h2>
          <span className="dateDay">
            {dayjs.unix(current.dt).format("DD MMM YYYY")}
          </span>
          <span className="locationName">
            {city.city} - {city.admin_name} - {city.country}
          </span>
        </div>
        <div className="weatherContainer">
          <img
            className="weatherIcon"
            alt="myit"
            src={`http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`}
          />
          <h1 className="weatherTemp">
            {Math.round(toggleTemperatureUnit(current.temp.max))}
            {isCelsius ? "°C" : "°F"}
          </h1>
          <h3 className="weatherDesc">{current.weather[0].main}</h3>
        </div>
        <button className="toggleButton" onClick={handleToggleClick}>C / F</button>
      </div>
    </>
  );
};

export default LeftComponents;
