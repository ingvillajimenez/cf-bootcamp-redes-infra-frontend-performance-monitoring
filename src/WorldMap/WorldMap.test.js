import { render, screen, fireEvent } from "@testing-library/react";
import WorldMap from "./WorldMap";

describe("WorldMap", () => {
  it("renders marker and handles marker click", () => {
    const markers = [{ name: "London, UK", coordinates: [0, 51.5] }];
    const onMarkerClick = jest.fn();
    render(
      <WorldMap
        geoUrl="https://unpkg.com/world-atlas@2.0.2/countries-110m.json"
        markers={markers}
        onMarkerClick={onMarkerClick}
      />
    );
    // Wait for the marker text to appear
    expect(screen.getByText("London")).toBeInTheDocument();
    fireEvent.click(screen.getByText("London"));
    expect(onMarkerClick).toHaveBeenCalled();
  });
});
