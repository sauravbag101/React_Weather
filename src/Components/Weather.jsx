import React, { useState } from "react";
import clear from "../images/clear.png";
import clouds from "../images/clouds.png";
import drizzle from "../images/drizzle.png";
import humidity from "../images/humidity.png";
import mist from "../images/mist.png";
import rain from "../images/rain.png";
import search from "../images/search.png";
import wind from "../images/wind.png";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(false);

  const openWeatherApiKey = "e66d086610a9e7f5844ebe48794bcb99";
  const openWeatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
  const openMeteoApiUrl = "https://api.open-meteo.com/v1/forecast";

  const checkWeather = async () => {
    if (!city.trim()) {
      setError(true);
      setWeatherData(null);
      setForecastData(null);
      return;
    }

    try {
      // Fetch data from OpenWeatherMap API
      const response = await fetch(openWeatherApiUrl + city + `&appid=${openWeatherApiKey}`);
      if (!response.ok) {
        setError(true);
        setWeatherData(null);
        setForecastData(null);
        return;
      }
      const weatherData = await response.json();
      setWeatherData(weatherData);
      setError(false);

      // Extract latitude and longitude
      const { lat, lon } = weatherData.coord;

      // Fetch data from Open-Meteo API
      const forecastResponse = await fetch(
        `${openMeteoApiUrl}?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,precipitation,surface_pressure,wind_direction_10m,soil_temperature_0cm,soil_moisture_9_to_27cm`
      );
      if (forecastResponse.ok) {
        const forecastData = await forecastResponse.json();
        setForecastData(forecastData.hourly);
      } else {
        setForecastData(null);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(true);
    }
  };

  const getWeatherIcon = (main) => {
    switch (main) {
      case "Clouds":
        return clouds;
      case "Clear":
        return clear;
      case "Rain":
        return rain;
      case "Drizzle":
        return drizzle;
      case "Mist":
        return mist;
      default:
        return clear;
    }
  };

  return (
    <div className="bg-gradient-to-br from-green-500 to-blue-500 text-white max-w-lg mx-auto mt-16 rounded-3xl p-8">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <input
            type="text"
            placeholder="Enter your city name"
            className="flex-1 bg-emerald-50 text-gray-700 placeholder-gray-400 py-2 px-4 rounded-lg outline-none focus:ring-2 focus:ring-green-300 mr-4"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            className="bg-white text-gray-500 rounded-lg p-3 hover:text-gray-800"
            onClick={checkWeather}
          >
            <img src={search} alt="Search" className="w-3 h-3.5" />
          </button>
        </div>
        {error && <p className="text-red-500 text-left mt-2">Invalid City Name</p>}
      </div>
      {weatherData && (
        <div>
          <img
            src={getWeatherIcon(weatherData.weather[0].main)}
            alt="Weather Icon"
            className="w-40 mx-auto my-6"
          />
          <h1 className="text-4xl font-bold text-center">
            {Math.round(weatherData.main.temp)}°C
          </h1>
          
          <h2 className="text-xl font-medium mt-2 text-center">{weatherData.name}</h2>

          <div className="flex justify-center space-x-40">
          <p className="font-light">Latitude <span>{weatherData.coord.lat}</span></p>
          <p className="font-light">Longitude <span>{weatherData.coord.lon}</span></p>

          </div>

          <div className="flex justify-between mt-8 px-4">
            <div className="flex items-center">
              <img src={humidity} alt="Humidity" className="w-8 mr-2" />
              <div>
                <p className="text-lg font-bold">{weatherData.main.humidity}%</p>
                <p className="text-sm">Humidity</p>
              </div>
            </div>
            <div className="flex items-center">
              <img src={wind} alt="Wind" className="w-8 mr-2" />
              <div>
                <p className="text-lg font-bold">{weatherData.wind.speed} km/h</p>
                <p className="text-sm">Wind</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {forecastData && (
        <div className="mt-8">
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-emerald-50 text-gray-700 py-2 px-4 rounded-lg">
              <p className="font-bold">{forecastData.precipitation[0]}°C</p>
              <p className="text-sm">Precipitation</p>
            </div>
            <div className="bg-emerald-50 text-gray-700 py-2 px-4 rounded-lg">
              <p className="font-bold">{forecastData.surface_pressure[0]} hPa</p>
              <p className="text-sm">Surface Pressure</p>
            </div>
            <div className="bg-emerald-50 text-gray-700 py-2 px-4 rounded-lg">
              <p className="font-bold">{forecastData.soil_temperature_0cm[0]}°C</p>
              <p className="text-sm">Soil Temperature</p>
            </div>
            <div className="bg-emerald-50 text-gray-700 py-2 px-4 rounded-lg">
              <p className="font-bold">{forecastData.soil_moisture_9_to_27cm[0]}%</p>
              <p className="text-sm">Soil Moisture</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
