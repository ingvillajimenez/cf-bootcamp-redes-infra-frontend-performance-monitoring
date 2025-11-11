import { render, screen, fireEvent } from "@testing-library/react";
import WeatherSearch from "./WeatherSearch";

describe("WeatherSearch", () => {
  it("renders input and suggestions, and handles suggestion click", () => {
    const suggestions = [
      { place_id: "1", display_name: "London, UK" },
      { place_id: "2", display_name: "Paris, France" },
    ];
    const onSuggestionClick = jest.fn();
    render(
      <WeatherSearch
        input="Lon"
        suggestions={suggestions}
        showSuggestions={true}
        onInputChange={() => {}}
        onSuggestionClick={onSuggestionClick}
        onSearch={() => {}}
        setShowSuggestions={() => {}}
      />
    );
    expect(
      screen.getByPlaceholderText(/enter a location/i)
    ).toBeInTheDocument();
    expect(screen.getByText("London, UK")).toBeInTheDocument();
    fireEvent.mouseDown(screen.getByText("London, UK"));
    expect(onSuggestionClick).toHaveBeenCalledWith(suggestions[0]);
  });
});
