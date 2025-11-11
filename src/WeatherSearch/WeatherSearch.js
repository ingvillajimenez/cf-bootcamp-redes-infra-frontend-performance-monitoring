import React from "react";

function WeatherSearch({
  input,
  suggestions,
  showSuggestions,
  setShowSuggestions,
  onInputChange,
  onSuggestionClick,
  onSearch,
}) {
  return (
    <form className="weather-search" onSubmit={onSearch} autoComplete="off">
      <div style={{ position: "relative", width: "220px" }}>
        <input
          type="text"
          placeholder="Enter a location"
          value={input}
          onChange={onInputChange}
          onFocus={() => input && setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
          style={{ width: "100%" }}
        />
        {showSuggestions && suggestions.length > 0 && (
          <ul className="autocomplete-suggestions">
            {suggestions.map((s) => (
              <li key={s.place_id} onMouseDown={() => onSuggestionClick(s)}>
                {s.display_name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button type="submit">Search</button>
    </form>
  );
}

export default WeatherSearch;
