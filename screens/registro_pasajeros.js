import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { auth, db } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { useNavigation } from "@react-navigation/native";

export default function registro_pasajeros() {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      // GUARDAR EN /users/
      await set(ref(db, `users/${uid}`), {
        name,
        email,
        role: "passenger"
      });

      // GUARDAR EN /passengers/
      await set(ref(db, `passengers/${uid}`), {
        favoriteRoutes: []
      });

      Alert.alert("Registro exitoso", "Bienvenido 🚌");
      navigation.navigate("PassengerHome");

    } catch (error) {
      Alert.alert("Error al registrar", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro Pasajero</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre completo"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.btn} onPress={handleRegister}>
        <Text style={styles.btnText}>Crear cuenta</Text>
      </TouchableOpacity>

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#003B95",
    textAlign: "center",
    marginBottom: 35,
  },
  input: {
    backgroundColor: "#F0F6FF",
    padding: 14,
    marginBottom: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#BFD7FF",
  },
  btn: {
    backgroundColor: "#0066FF",
    padding: 14,
    borderRadius: 8,
    marginTop: 10,
  },
  btnText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  loginText: {
    marginTop: 18,
    textAlign: "center",
    color: "#0066FF",
    fontSize: 14,
    fontWeight: "500",
  },
});
