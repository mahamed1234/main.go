import React from 'react';
import MapView, { Marker } from 'react-native-maps';

const YourMapComponent = () => {
  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: 46.6031, // Latitude du centre de la France
        longitude: 1.8883, // Longitude du centre de la France
        latitudeDelta: 5, // Delta de latitude pour zoomer sur la France
        longitudeDelta: 5, // Delta de longitude pour zoomer sur la France
      }}
    >
      {/* Marqueur au centre de la France */}
      <Marker
        coordinate={{ latitude: 46.6031, longitude: 1.8883 }}
        title="France"
        description="Centre of France"
      />
    </MapView>
  );
};

export default YourMapComponent;
