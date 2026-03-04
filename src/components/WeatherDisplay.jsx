export default function WeatherDisplay({ locationName, current, daily }) {
  if (!current) return null;

  return (
    <div>
      <h2>{locationName}</h2>

      <h3>Current</h3>
      <p>Temp: {current.temperature_2m}°</p>
      <p>Wind: {current.wind_speed_10m}</p>

      {daily && (
        <>
          <h3>Next 3 Days</h3>
          <ul>
            {daily.time.slice(0, 3).map((day, i) => (
              <li key={day}>
                {day}: {daily.temperature_2m_max[i]}° / {daily.temperature_2m_min[i]}°
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}