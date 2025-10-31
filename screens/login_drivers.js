import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { ref, get } from "firebase/database";
import { auth, db } from "../config/firebase";

export default function login_drivers({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const PRIMARY = "#004AAD";

  // 🔄 Verificar si ya hay sesión activa
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userRef = ref(db, `users/${user.uid}`);
          const snapshot = await get(userRef);

          if (snapshot.exists() && snapshot.val().role === "driver") {
            await AsyncStorage.setItem("driverUser", JSON.stringify(user));
            navigation.replace("DriverHome");
          }
        } catch (error) {
          console.log("Error comprobando sesión:", error);
        }
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // 🚪 Iniciar sesión
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor, completa todos los campos");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      const userRef = ref(db, `users/${uid}`);
      const snapshot = await get(userRef);

      if (snapshot.exists() && snapshot.val().role === "driver") {
        await AsyncStorage.setItem("driverUser", JSON.stringify(userCredential.user));
        Alert.alert("Bienvenido", `Hola ${snapshot.val().name}`);
        navigation.replace("DriverHome");
      } else {
        Alert.alert("Acceso denegado", "No tienes permiso para iniciar como conductor");
      }
    } catch (error) {
      Alert.alert("Error de inicio de sesión", error.message);
    }
  };

  // 🚪 Cerrar sesión (por si la necesitas luego)
  const handleLogout = async () => {
    await AsyncStorage.removeItem("driverUser");
    await auth.signOut();
    navigation.replace("login_drivers");
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={PRIMARY} />
        <Text style={{ color: PRIMARY, marginTop: 10 }}>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inicio de Sesión - Conductor</Text>
      <Text style={styles.subtitle}>Accede a tu cuenta para manejar con Busly</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        placeholderTextColor="#6E6E6E"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#6E6E6E"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("registro_drivers")}>
        <Text style={styles.backText}>¿No tienes cuenta? Regístrate aquí</Text>
      </TouchableOpacity>
    </View>
  );
}

const PRIMARY = "#004AAD";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 25,
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "600",
    color: PRIMARY,
    marginBottom: 5,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#6E6E6E",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    height: 48,
    borderColor: "#D9D9D9",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 15,
    color: "#0A0A0A",
  },
  button: {
    backgroundColor: PRIMARY,
    height: 48,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
  backText: {
    color: PRIMARY,
    textAlign: "center",
    marginTop: 15,
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
});
