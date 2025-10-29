// screens/HomePassenger.js
import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { ref, onValue } from "firebase/database";
import { db } from "../config/firebase";

export default function HomePassenger() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const driversRef = ref(db, "drivers/");
    const unsubscribe = onValue(driversRef, (snapshot) => {
      const data = snapshot.val() || {};
      const driversArray = Object.keys(data).map((id) => ({
        id,
        lat: data[id].location?.lat,
        lng: data[id].location?.lng,
        active: data[id].meta?.active,
      }));
      setDrivers(driversArray);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: drivers[0]?.lat || 10.5,
        longitude: drivers[0]?.lng || -66.9,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
    >
      {drivers.map(
        (driver) =>
          driver.active && (
            <Marker
              key={driver.id}
              coordinate={{ latitude: driver.lat, longitude: driver.lng }}
              title={`Conductor ${driver.id}`}
              description="Disponible"
              pinColor="#007AFF"
            />
          )
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
