// src/App.jsx
import { useState } from "react";
import "./App.css";
import WeatherSearch from "./components/WeatherSearch";
import WeatherDisplay from "./components/WeatherDisplay";

export default function App() {
  const [city, setCity] = useState("Atlanta");
  const [locationName, setLocationName] = useState("");
  const [current, setCurrent] = useState(null);
  const [daily, setDaily] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          city
        )}&count=1`
      );
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        throw new Error("City not found. Try a different name.");
      }

      const place = geoData.results[0];
      setLocationName(`${place.name}${place.admin1 ? ", " + place.admin1 : ""}`);

      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&forecast_days=3&timezone=auto`
      );
      const weatherData = await weatherRes.json();

      // console.log('weatherData:', weatherData)

      setCurrent(weatherData.current);
      setDaily(weatherData.daily);
    } catch (err) {
      setError(err.message || "Something went wrong.");
      setCurrent(null);
      setDaily(null);
      setLocationName("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Weather App</h1>

      <WeatherSearch
        city={city}
        setCity={setCity}
        onSearch={handleSearch}
        loading={loading}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <WeatherDisplay locationName={locationName} current={current} daily={daily} />
    </div>
  );
}