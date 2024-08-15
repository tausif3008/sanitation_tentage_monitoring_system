import { Anchor } from "antd";
import React, { useEffect, useRef, useState } from "react";
import toilet from "../assets/MonitoringImages/Dashboard/toilet.png";
import tentage from "../assets/MonitoringImages/Dashboard/tentage.png";
import location from "../assets/MonitoringImages/Dashboard/location.png";
import wsVhe from "../assets/MonitoringImages/Dashboard/wsVhe.png";
import waste from "../assets/MonitoringImages/Dashboard/waste.png";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";

const MapData = (props) => {
  return (
    <div>
      <MapComponent {...props}></MapComponent>
    </div>
  );
};

export default MapData;

// Built-in Leaflet icon for markers
const defaultIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/535/535137.png",
  // shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [40, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const toiletIconsMap = L.icon({
  iconUrl: toilet,
  // shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [24, 25],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const tentageIcon = L.icon({
  iconUrl: tentage,
  // shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [24, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// Nearby places
const toiletIcon = [
  { id: 1, name: "Toilet 1", lat: 25.4314, lng: 81.8785 },
  { id: 2, name: "Toilet 2", lat: 25.4268, lng: 81.8862 },
];

const tentagePlaces = [
  { id: 3, name: "Tent 3", lat: 25.4325, lng: 81.884 },
  { id: 4, name: "Tent 4", lat: 25.4448, lng: 81.8698 },
];

// Nearby places
const wastesPlaces = [
  { id: 1, name: "Bin 1", lat: 25.452, lng: 81.8538 },
  { id: 2, name: "Bin 2", lat: 25.4472, lng: 81.8665 },
];

const wastesIcon = L.icon({
  iconUrl: wsVhe,
  // shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [24, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const wastesPlacesV = [
  { id: 3, name: "Vehicle 1", lat: 25.4365, lng: 81.814 },
  { id: 4, name: "Vehicle 2", lat: 25.4548, lng: 81.8198 },
];

const wasteIcon = L.icon({
  iconUrl: waste,
  // shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [23, 25],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const UserLocationMarker = ({ setUserLocation }) => {
  const map = useMapEvents({
    locationfound: (e) => {
      setUserLocation(e.latlng);
      if (map) {
        map.setView(e.latlng, 16);
        L.marker(e.latlng, { icon: defaultIcon })
          .addTo(map)
          .bindPopup("You are here")
          .openPopup();
      }
    },
    locationerror: () => {
      alert("Could not access your location.");
    },
  });

  useEffect(() => {
    if (map) {
      map.locate({
        setView: true,
        maxZoom: 5,
      });
    }
  }, [map]);

  return null;
};

const MapComponent = ({ tentage, wastes, sanitization, bin }) => {
  const mapRef = useRef(null);
  const [userLocation, setUserLocation] = useState({
    lat: 25.435,
    lng: 81.8807,
  });
  const [routeControl, setRouteControl] = useState(null);

  useEffect(() => {
    if (mapRef.current && userLocation) {
      if (routeControl) {
        routeControl.setWaypoints([
          L.latLng(userLocation.lat, userLocation.lng),
          L.latLng(userLocation.lat, userLocation.lng),
        ]);
      }
    }
  }, [userLocation, routeControl]);

  const handleMarkerClick = (lat, lng) => {
    if (!mapRef.current) {
      console.error("Map is not available yet.");
      return;
    }

    const map = mapRef.current;

    const newRouteControl = L.Routing.control({
      waypoints: [
        L.latLng(userLocation.lat, userLocation.lng),
        L.latLng(lat, lng),
      ],
      routeWhileDragging: true,
      lineOptions: {
        styles: [{ color: "blue", weight: 5 }],
      },
    });

    newRouteControl.addTo(map);
    setRouteControl(newRouteControl);
  };

  return (
    <MapContainer
      center={[userLocation.lat, userLocation.lng]}
      zoom={13}
      style={{ height: "330px", width: "100%" }}
      whenCreated={(mapInstance) => {
        mapRef.current = mapInstance;
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {/* <UserLocationMarker setUserLocation={setUserLocation} /> */}
      {userLocation && (
        <Marker
          position={[userLocation.lat, userLocation.lng]}
          icon={defaultIcon}
        >
          <Popup>You are here</Popup>
        </Marker>
      )}
      {sanitization &&
        toiletIcon.map((place, index) => (
          <Marker
            key={index + place}
            position={[place.lat, place.lng]}
            icon={toiletIconsMap}
            eventHandlers={{
              click: () => handleMarkerClick(place.lat, place.lng),
            }}
          >
            <Popup>{place.name}</Popup>
          </Marker>
        ))}

      {tentage &&
        tentagePlaces.map((place, index) => (
          <Marker
            key={index + place}
            position={[place.lat, place.lng]}
            icon={tentageIcon}
            eventHandlers={{
              click: () => handleMarkerClick(place.lat, place.lng),
            }}
          >
            <Popup>{place.name}</Popup>
          </Marker>
        ))}

      {bin &&
        wastesPlaces.map((place, index) => (
          <Marker
            key={index + place}
            position={[place.lat, place.lng]}
            icon={wasteIcon}
            eventHandlers={{
              click: () => handleMarkerClick(place.lat, place.lng),
            }}
          >
            <Popup>{place.name}</Popup>
          </Marker>
        ))}

      {wastes &&
        wastesPlacesV.map((place, index) => (
          <Marker
            key={index + place}
            position={[place.lat, place.lng]}
            icon={wastesIcon}
            eventHandlers={{
              click: () => handleMarkerClick(place.lat, place.lng),
            }}
          >
            <Popup>{place.name}</Popup>
          </Marker>
        ))}
    </MapContainer>
  );
};
