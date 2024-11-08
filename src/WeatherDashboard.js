import React, { useEffect, useState } from "react";
import CitySearch from "./components/CitySearch";
import WeatherDisplay from "./components/WeatherDisplay";
import Favorites from "./components/Favorites";
import axios from "axios";

const WeatherDashboard = () => {
  const [city, setCity] = useState(localStorage.getItem("lastCity") || "");
  const [weatherData, setWeatherData] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [isFahrenheit, setIsFahrenheit] = useState(false);

  const apiKey = "c8f21f86ece4d2370667123432f0e078";

  const fetchWeatherData = async (city) => {
    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeatherData(data);
      localStorage.setItem("lastCity", city);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const fetchFavorites = async () => {
    const { data } = await axios.get("http://localhost:5000/favorites");
    setFavorites(data);
  };

  const addFavorite = async (city) => {
    await axios.post("http://localhost:5000/favorites", { city });
    fetchFavorites();
  };

  const removeFavorite = async (id) => {
    await axios.delete(`http://localhost:5000/favorites/${id}`);
    fetchFavorites();
  };

  useEffect(() => {
    if (city) fetchWeatherData(city);
    fetchFavorites();
  }, [city]);

  return (
    <div className="weather-dashboard">
      <CitySearch onSearch={setCity} />
      {weatherData && (
        <WeatherDisplay
          data={weatherData}
          isFahrenheit={isFahrenheit}
          toggleUnit={() => setIsFahrenheit(!isFahrenheit)}
        />
      )}
      <Favorites
        favorites={favorites}
        onRemove={removeFavorite}
        onSelect={setCity}
      />
      <button
        className="toggle-button"
        onClick={() => setIsFahrenheit(!isFahrenheit)}
      >
        {isFahrenheit ? "Switch to Celsius" : "Switch to Fahrenheit"}
      </button>
    </div>
  );
};

export default WeatherDashboard;
