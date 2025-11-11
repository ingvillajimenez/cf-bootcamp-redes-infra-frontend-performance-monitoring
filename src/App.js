import React, { useState } from "react";
import WeatherSearch from "./WeatherSearch/WeatherSearch";
import WorldMap from "./WorldMap/WorldMap";
import WeatherCard from "./WeatherCard/WeatherCard";
import "./App.css";

const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

function App() {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [weather, setWeather] = useState(null);
  const [markers, setMarkers] = useState([]);

  // Fetch city suggestions from Nominatim
  const fetchSuggestions = async (query) => {
    const url = `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(
      query
    )}&format=json&limit=5`;
    const res = await fetch(url);
    const data = await res.json();
    setSuggestions(data);
    setShowSuggestions(true);
  };

  // Fetch weather from Open-Meteo
  const fetchWeather = async (lat, lon, displayName) => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.current_weather) {
      setWeather({
        temp: data.current_weather.temperature,
        condition: getWeatherDescription(data.current_weather.weathercode),
        icon: getWeatherIcon(data.current_weather.weathercode),
        city: displayName,
      });
    } else {
      setWeather(null);
    }
  };

  // Weather code to description/icon
  function getWeatherDescription(code) {
    // Open-Meteo weather codes: https://open-meteo.com/en/docs#api_form
    if ([0].includes(code)) return "Clear";
    if ([1, 2, 3].includes(code)) return "Partly Cloudy";
    if ([45, 48].includes(code)) return "Fog";
    if ([51, 53, 55, 56, 57].includes(code)) return "Drizzle";
    if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return "Rain";
    if ([71, 73, 75, 77, 85, 86].includes(code)) return "Snow";
    if ([95, 96, 99].includes(code)) return "Thunderstorm";
    return "Unknown";
  }
  function getWeatherIcon(code) {
    if ([0].includes(code)) return "☀️";
    if ([1, 2, 3].includes(code)) return "⛅";
    if ([45, 48].includes(code)) return "🌫️";
    if ([51, 53, 55, 56, 57].includes(code)) return "🌦️";
    if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return "🌧️";
    if ([71, 73, 75, 77, 85, 86].includes(code)) return "❄️";
    if ([95, 96, 99].includes(code)) return "⛈️";
    return "❔";
  }

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setInput(value);
    if (value.length > 1) {
      await fetchSuggestions(value);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = async (suggestion) => {
    setInput(suggestion.display_name);
    setSuggestions([]);
    setShowSuggestions(false);
    setMarkers([
      {
        name: suggestion.display_name,
        coordinates: [parseFloat(suggestion.lon), parseFloat(suggestion.lat)],
      },
    ]);
    await fetchWeather(suggestion.lat, suggestion.lon, suggestion.display_name);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (suggestions.length > 0) {
      await handleSuggestionClick(suggestions[0]);
    }
  };

  const handleMarkerClick = async (marker) => {
    setInput(marker.name);
    await fetchWeather(
      marker.coordinates[1],
      marker.coordinates[0],
      marker.name
    );
  };

  return (
    <div className="weather-app-container">
      <h1 className="weather-title">Weather</h1>
      <WeatherSearch
        input={input}
        suggestions={suggestions}
        showSuggestions={showSuggestions}
        onInputChange={handleInputChange}
        onSuggestionClick={handleSuggestionClick}
        onSearch={handleSearch}
        setShowSuggestions={setShowSuggestions}
      />
      <WorldMap
        geoUrl={geoUrl}
        markers={markers}
        onMarkerClick={handleMarkerClick}
      />
      <WeatherCard weather={weather} />
    </div>
  );
}

export default App;
