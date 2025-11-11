import React from "react";

function WeatherCard({ weather }) {
  return (
    <div className="weather-card weather-card-animated">
      <h2>{weather ? weather.city.split(",")[0] : "-"}</h2>
      <div className="weather-icon">{weather ? weather.icon : "☀️"}</div>
      <div className="weather-temp">{weather ? `${weather.temp}°C` : "-"}</div>
      <div className="weather-condition">
        {weather ? weather.condition : "-"}
      </div>
    </div>
  );
}

export default WeatherCard;
