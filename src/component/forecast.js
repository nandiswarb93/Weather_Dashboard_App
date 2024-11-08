import axios from "axios";
import React, { useState } from "react";
import "./Forecast.css";

function ForeCast() {
  const [list, setList] = useState([]);
  const [city, setCity] = useState("");
  const [error, setError] = useState(false);
  const [isFahrenheit, setIsFahrenheit] = useState(false);
  const [fav, setFav] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  // Function to fetch weather data
  const fetchData = async (city) => {
    try {
      const { data, status } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=c8f21f86ece4d2370667123432f0e078&units=metric`
      );
      if (status === 200) {
        // Filter data for every 24 hours (same time each day)
        const filteredData = data.list.filter((_, index) => index % 8 === 0);
        setList(filteredData);
        setError(false);
      }
    } catch (e) {
      console.error(e);
      setError(true);
    }
  };

  // Function to format the date and get the day name
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const options = { weekday: "long", day: "numeric", month: "long" };
    return date.toLocaleDateString("en-US", options);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchData(city);
    }
  };

  // Function to convert Celsius to Fahrenheit
  const convertToFahrenheit = (tempCelsius) => (tempCelsius * 9) / 5 + 32;

  // Add current city to favorites
  const addToFavorites = () => {
    if (
      city.trim() &&
      !fav.some((favCity) => favCity.toLowerCase() === city.toLowerCase())
    ) {
      const updatedFav = [...fav, city];
      setFav(updatedFav);
      localStorage.setItem("favorites", JSON.stringify(updatedFav));
    }
  };

  // Remove a city from favorites
  const removeFavorite = (cityToRemove) => {
    const updatedFav = fav.filter((favCity) => favCity !== cityToRemove);
    setFav(updatedFav);
    localStorage.setItem("favorites", JSON.stringify(updatedFav));
  };

  // Fetch weather for a favorite city
  const handleFavoriteClick = (favCity) => {
    setCity(favCity);
    fetchData(favCity);
  };

  return (
    <>
      <div className="input-container">
        <h2>Weather Dashboard App</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="city" className="label">
            Enter City or Country:
          </label>
          <input
            id="city"
            type="text"
            className="input-field"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="e.g., Hyderabad"
            required
          />
          <button type="submit" className="submit-button">
            Search
          </button>
        </form>
      </div>

      {/* Button to add to favorites */}
      {city && (
        <button className="toggle-button" onClick={addToFavorites}>
          Add to Favorites
        </button>
      )}

      {/* Toggle button for Celsius/Fahrenheit */}
      {list.length > 0 && (
        <button
          className="toggle-button"
          onClick={() => setIsFahrenheit(!isFahrenheit)}
        >
          {isFahrenheit ? "Switch to Celsius" : "Switch to Fahrenheit"}
        </button>
      )}

      {/* Display forecast */}
      <div className="forecast-container">
        {error ? (
          <h2 className="error">Error occurred while fetching data</h2>
        ) : (
          list.length > 0 &&
          list.map((day, index) => (
            <div key={index} className="card">
              <h3>{formatDate(day.dt_txt)}</h3>
              <div className="weather-info">
                <p>
                  <strong>Clouds:</strong> {day.weather[0].description}
                </p>
                <p>
                  <strong>Temp:</strong>{" "}
                  {isFahrenheit
                    ? `${convertToFahrenheit(day.main.temp).toFixed(2)}°F`
                    : `${day.main.temp}°C`}
                </p>
                <p>
                  <strong>Humidity:</strong> {day.main.humidity}%
                </p>
                <p>
                  <strong>Rain:</strong>{" "}
                  {day.rain ? `${day.rain["3h"]}mm` : "No Rain"}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Display favorite cities */}
      <div className="favorites-container">
        <h3>Favorite Cities</h3>
        <ul>
          {fav.map((favCity, index) => (
            <li key={index} className="favorite-item">
              <span onClick={() => handleFavoriteClick(favCity)}>
                {favCity}
              </span>
              <button
                className="submit-button"
                onClick={() => removeFavorite(favCity)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default ForeCast;
