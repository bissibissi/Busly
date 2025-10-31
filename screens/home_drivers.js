import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { ref, set, update } from "firebase/database";
import { auth, db } from "../config/firebase";

export default function DriverHome({ navigation }) {
  const [location, setLocation] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [watcher, setWatcher] = useState(null);
  const PRIMARY = "#004AAD";

  // ✅ Obtener permisos de ubicación al iniciar
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permiso denegado", "Se necesita acceso a la ubicación para funcionar correctamente");
        return;
      }
      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
    })();

    // Limpiar watcher al salir
    return () => {
      if (watcher) watcher.remove();
    };
  }, []);

  // ✅ Actualizar ubicación en Firebase en tiempo real
  const startSharingLocation = async () => {
    if (!auth.currentUser) {
      Alert.alert("Error", "No hay sesión activa");
      return;
    }

    const userId = auth.currentUser.uid;
    setIsActive(true);

    const subscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 5000,
        distanceInterval: 5,
      },
      (loc) => {
        const { latitude, longitude } = loc.coords;
        setLocation(loc.coords);

        update(ref(db, `drivers/${userId}/location`), {
          lat: latitude,
          lng: longitude,
          updatedAt: Date.now(),
        });
      }
    );

    setWatcher(subscription);

    update(ref(db, `drivers/${userId}/meta`), {
      active: true,
    });

    Alert.alert("Conectado", "Tu ubicación ahora se está compartiendo");
  };

  const stopSharingLocation = () => {
    if (watcher) watcher.remove();
    setWatcher(null);
    setIsActive(false);

    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      update(ref(db, `drivers/${userId}/meta`), {
        active: false,
      });
    }

    Alert.alert("Desconectado", "Has detenido el uso compartido de tu ubicación");
  };

  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          showsUserLocation={true}
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Tu ubicación"
            description="Conductor Busly activo"
            pinColor={PRIMARY}
          />
        </MapView>
      ) : (
        <Text style={styles.loading}>Obteniendo ubicación...</Text>
      )}

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: isActive ? "#E53935" : PRIMARY }]}
          onPress={isActive ? stopSharingLocation : startSharingLocation}
        >
          <Text style={styles.buttonText}>
            {isActive ? "Desactivar" : "Activar ubicación"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => {
            stopSharingLocation();
            navigation.replace("login_drivers");
          }}
        >
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const PRIMARY = "#004AAD";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  map: {
    flex: 1,
  },
  loading: {
    textAlign: "center",
    marginTop: 50,
    color: "#555",
  },
  bottomContainer: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  button: {
    width: "80%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 15,
  },
  logoutText: {
    color: PRIMARY,
    fontSize: 14,
    fontWeight: "500",
  },
});
