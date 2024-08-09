import React, { useEffect } from "react";
import { GoogleMap, useMap } from "@react-google-maps/api";

const DirectionsRendererComponent = ({ userLocation, destination }) => {
  const map = useMap();

  useEffect(() => {
    if (!userLocation || !destination) return;

    const directionsService = new GoogleMap.maps.DirectionsService();
    const directionsRenderer = new GoogleMap.maps.DirectionsRenderer();

    directionsRenderer.setMap(map);

    const request = {
      origin: new GoogleMap.maps.LatLng(userLocation.lat, userLocation.lng),
      destination: new GoogleMap.maps.LatLng(destination.lat, destination.lng),
      travelMode: GoogleMap.maps.TravelMode.DRIVING,
    };

    directionsService.route(request, (result, status) => {
      if (status === GoogleMap.maps.DirectionsStatus.OK) {
        directionsRenderer.setDirections(result);
      } else {
        console.error("Directions request failed due to ", status);
      }
    });
  }, [map, userLocation, destination]);

  return null;
};

export default DirectionsRendererComponent;
