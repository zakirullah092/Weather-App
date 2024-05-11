import React, { useState, useEffect } from 'react';
import  './weather.css' ;

export default function App() {
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const [weather, setWeather] = useState(null);

  const apiKey = 'd92c38b1e792b670a5cbdf0ed1c72231';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric&q=`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (city.trim() === '') {
          return; // Exit early if city is empty
        }

        const response = await fetch(`${apiUrl}${city}`);
        if (!response.ok) {
          setError('Weather data not found for this location');
          setWeather(null);
          return;
        }

        const data = await response.json();
        setWeather(data);
        setError('');
      } catch (error) {
        setError('Error occurred while fetching data');
        setWeather(null);
      }
    };

    if (city.trim() !== '') {
      fetchData(); // Call fetchData only if city is not empty
    }
  }, [city, apiUrl]); // useEffect dependency on 'city' and 'apiUrl'

  const resetWeatherData = () => {
    // Clear previous weather data and error message
    setWeather(null);
      setError('');
      setCity('');
  };

  return (
    <div className='main'>
          <div>
              <h3> Weather App</h3>
    <h4>Please give valid city name to find temperature</h4>
          <input
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={resetWeatherData}>Clear</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {weather && (
        <div>
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Description: {weather.weather[0].description}</p>
        </div>
      )}
     </div>
    </div>
  );
}
