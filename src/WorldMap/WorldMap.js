import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

function WorldMap({ geoUrl, markers, onMarkerClick }) {
  return (
    <div className="weather-map">
      <ComposableMap
        projectionConfig={{ scale: 120 }}
        width={800}
        height={350}
        style={{ width: "100%", height: "350px" }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#b3d8f8"
                stroke="#fff"
                style={{ outline: "none" }}
              />
            ))
          }
        </Geographies>
        {markers.length > 0 &&
          markers.map((marker) => (
            <Marker
              key={marker.name}
              coordinates={marker.coordinates}
              onClick={() => onMarkerClick(marker)}
              style={{ cursor: "pointer" }}
            >
              <circle
                r={12}
                className="map-marker-animated"
                fill="#4285f4"
                stroke="#fff"
                strokeWidth={2}
              />
              <text
                textAnchor="middle"
                y={30}
                style={{ fontFamily: "system-ui", fill: "#222", fontSize: 16 }}
              >
                {marker.name.split(",")[0]}
              </text>
            </Marker>
          ))}
      </ComposableMap>
    </div>
  );
}

export default WorldMap;
