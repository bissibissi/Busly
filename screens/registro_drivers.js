
/*import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, db } from "../firebase";

export default function registro_drivers({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleDriverRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      // Guardar info del usuario en Realtime Database
      await set(ref(db, `users/${uid}`), {
        name,
        email,
        role: "driver",
      });

      await set(ref(db, `drivers/${uid}`), {
        location: {
          lat: null,
          lng: null,
          updatedAt: Date.now(),
        },
        meta: {
          active: false,
        },
      });

      Alert.alert("Registro exitoso", "Conductor registrado correctamente");
      navigation.navigate("LoginScreen");

    } catch (error) {
      Alert.alert("Error de registro", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de Conductor</Text>
      <Text style={styles.subtitle}>Crea tu cuenta para manejar con Busly</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre completo"
        placeholderTextColor="#6E6E6E"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        placeholderTextColor="#6E6E6E"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
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

      <TouchableOpacity style={styles.button} onPress={handleDriverRegister}>
        <Text style={styles.buttonText}>Registrarme como Conductor</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Volver</Text>
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
});*/
