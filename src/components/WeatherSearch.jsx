export default function WeatherSearch({ city, setCity, onSearch, loading }) {
  return (
    <form onSubmit={onSearch}>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter a city (ex: Atlanta)"
      />
      <button type="submit" disabled={loading || !city.trim()}>
        {loading ? "Searching..." : "Search"}
      </button>
    </form>
  );
}