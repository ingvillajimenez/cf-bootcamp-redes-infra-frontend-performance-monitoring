import { render, screen } from "@testing-library/react";
import WeatherCard from "./WeatherCard";

describe("WeatherCard", () => {
  it("renders weather info", () => {
    render(
      <WeatherCard
        weather={{
          city: "London, UK",
          icon: "☀️",
          temp: 20,
          condition: "Clear",
        }}
      />
    );
    expect(screen.getByText("London")).toBeInTheDocument();
    expect(screen.getByText("☀️")).toBeInTheDocument();
    expect(screen.getByText("20°C")).toBeInTheDocument();
    expect(screen.getByText("Clear")).toBeInTheDocument();
  });
  it("renders default state when no weather", () => {
    render(<WeatherCard weather={null} />);
    expect(screen.getByText("-")).toBeInTheDocument();
    expect(screen.getByText("☀️")).toBeInTheDocument();
  });
});
