import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function Weather({city}) {
  const [weather, setWeather] = useState([]);
  useEffect(() => {
    let unmounted = false;

    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
      .then(response => {
        if (!unmounted) {
          const data = response.data;
          setWeather(data);
        }
      }).catch(error => {
        console.log(error);
      });

      return () => {
        unmounted = true;
      }
  }, [city])

    if (Object.keys(weather).length > 0) {
      return (
        <>
          <h2>Weather in {city}</h2>
            <div>
              <b>temperature:</b> {weather.main.temp} Celcius <br />
              <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} height='75px' alt="weather"></img> <br />
              <b>wind:</b> {weather.wind.speed} mph direction {weather.wind.deg}&deg;
            </div>
        </>
      )
    }
    else return null;
}