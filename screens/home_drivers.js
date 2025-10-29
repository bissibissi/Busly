// screens/HomeDriver.js
import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Location from "expo-location";
import { ref, update } from "firebase/database";
import { db } from "../config/firebase";

export default function HomeDriver({ route }) {
  const { userId } = route.params || {}; // uid del conductor

  useEffect(() => {
    let watcher = null;

    const startLocationUpdates = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Se necesitan permisos de ubicación.");
        return;
      }

      watcher = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 5,
        },
        (location) => {
          const { latitude, longitude } = location.coords;
          update(ref(db, `drivers/${userId}/location`), {
            lat: latitude,
            lng: longitude,
            updatedAt: Date.now(),
          });
        }
      );
    };

    startLocationUpdates();

    return () => {
      if (watcher) watcher.remove();
    };
  }, [userId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modo Conductor Activo</Text>
      <Text style={styles.subtitle}>Actualizando tu ubicación en tiempo real...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E6F0FF",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#007AFF",
  },
  subtitle: {
    fontSize: 16,
    color: "#005FCC",
    marginTop: 10,
  },
});
