import React, { useEffect, useRef, useState } from "react";
import toilet from "../assets/MonitoringImages/Dashboard/requireCliningToilet.png";
import cleanedIcon from "../assets/MonitoringImages/Dashboard/ClinedToilets.png";
import UnderMaintenanceIcon from "../assets/MonitoringImages/Dashboard/UnderMaintenanceToilet.png";

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
  iconUrl: cleanedIcon,
  // shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/,
  iconSize: [24, 25],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const toiletIconCleaningRequire = L.icon({
  iconUrl: toilet,
  // shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/,
  iconSize: [24, 25],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const underMaintenanceIcon = L.icon({
  iconUrl: UnderMaintenanceIcon,
  // shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/,
  iconSize: [24, 25],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// Nearby places
const toiletLatLong = [
  { id: 1, name: "Toilet 1", lat: 25.4314, lng: 81.8785 },
  { id: 2, name: "Toilet 2", lat: 25.4268, lng: 81.8862 },
  { id: 3, name: "Toilet 3", lat: 25.4268, lng: 81.8162 },
];

const toiletLatLongRequire = [
  { id: 4, name: "Toilet 4", lat: 25.4314, lng: 81.8548 },
  { id: 5, name: "Toilet 5", lat: 25.4314, lng: 81.8548 },
  { id: 6, name: "Toilet 6", lat: 25.4368, lng: 81.8729 },
  { id: 7, name: "Toilet 7", lat: 25.4268, lng: 81.8269 },
];

const toiletLatLongMaintenance = [
  { id: 8, name: "Toilet 4", lat: 25.4614, lng: 81.8758 },
  { id: 9, name: "Toilet 5", lat: 25.4714, lng: 81.8648 },
  { id: 10, name: "Toilet 6", lat: 25.4068, lng: 81.8229 },
  { id: 11, name: "Toilet 7", lat: 25.4468, lng: 81.8169 },
];

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

const MapComponent = ({ tentage = true }) => {
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
    <div>
      <div className="flex justify-between flex-wrap">
        <div className="text-xl font-semibold p-2">Locations Of Sanitation</div>
        <div className="flex  text-sm gap-3 items-center justify-end p-1">
          <div className="flex gap-1 justify-center items-center">
            <div className="h-full flex items-center">Require Cleaning:</div>
            <img className="h-5 w-5" src={toilet} alt="" />
          </div>{" "}
          <div className="flex gap-1">
            <span className="h-full flex items-center">Cleaned:</span>
            <img className="h-5 w-5" src={cleanedIcon} alt="" />
          </div>{" "}
          <div className="flex gap-1">
            <span className="h-full flex items-center">Under Maintenance:</span>
            <img className="h-5 w-5" src={UnderMaintenanceIcon} alt="" />
          </div>
        </div>
      </div>
      <MapContainer
        center={[userLocation.lat, userLocation.lng]}
        zoom={13}
        style={{ height: "400px", width: "100%", zIndex: 1 }}
        whenCreated={(mapInstance) => {
          mapRef.current = mapInstance;
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* <UserLocationMarker setUserLocation={setUserLocation} /> */}

        {toiletLatLong.map((place, index) => (
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
        {toiletLatLongRequire.map((place, index) => (
          <Marker
            key={index + place}
            position={[place.lat, place.lng]}
            icon={toiletIconCleaningRequire}
            eventHandlers={{
              click: () => handleMarkerClick(place.lat, place.lng),
            }}
          >
            <Popup>{place.name}</Popup>
          </Marker>
        ))}
        {toiletLatLongMaintenance.map((place, index) => (
          <Marker
            key={index + place}
            position={[place.lat, place.lng]}
            icon={underMaintenanceIcon}
            eventHandlers={{
              click: () => handleMarkerClick(place.lat, place.lng),
            }}
          >
            <Popup>{place.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
