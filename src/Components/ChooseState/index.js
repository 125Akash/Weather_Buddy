import React, { useEffect, useState } from "react";
import cities from "../../Data/in.json";
import axios from "axios";
import { UseWeatherAppContext } from "../../Context/Context";

const ChooseStateComponents = () => {
  const {
    state: { city },
    dispatch,
  } = UseWeatherAppContext();

  const [inputCity, setInputCity] = useState("");

  const handleChange = (e) => {
    const selectedCity = cities.filter(
      (city) => city.city === e.target.value
    )[0];
    dispatch({
      type: "SET_CITY",
      payload: { ...selectedCity },
    });
  };

  const handleInputCityChange = (e) => {
    setInputCity(e.target.value);
  };

  const handleInputCitySelect = () => {
    const selectedCity = cities.filter((city) => city.city === inputCity)[0];
    if (selectedCity) {
      dispatch({
        type: "SET_CITY",
        payload: { ...selectedCity },
      });
    } else {
      // Handle case when the input city is not found in the list
      console.warn("City not found");
    }
  };

  const APIKEY = "34480b98aa332da53123a0ac63a4ea9d";
  let lat = city && city.lat ? city.lat : "";
  let long = city && city.lng ? city.lng : "";
  let exclude = "hourly,minutely";
  const ULR = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=${exclude}&units=metric&lang=tr&appid=${APIKEY}`;

  const fetchData = () => {
    axios(ULR).then((data) => {
      let _daily = data.data.daily;
      dispatch({
        type: "SET_DAILY",
        payload: _daily,
      });
    });
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [city]);

  return (
    <>
      <div className="stateWrap">
        <select className="stateMenu" value={city.city} onChange={handleChange}>
          {cities &&
            cities.length > 0 &&
            cities.map((city) => (
              <option key={`${city.population}${city.lat}`} value={city.city}>
                {city.city} - {city.admin_name}
              </option>
            ))}
        </select>
       <div className="custom-conatainer">
       <input
          type="text"
          placeholder="Enter city..."
          value={inputCity}
          onChange={handleInputCityChange}
          className="customInput"
        />
        <button className="button-18" onClick={handleInputCitySelect}>
          Show
        </button>
       </div>
        
      </div>
    </>
  );
};

export default ChooseStateComponents;
