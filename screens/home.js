import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function home({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/buslylogo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Bienvenido a Busly</Text>
      <Text style={styles.subtitle}>¿Cómo deseas registrarte?</Text>

      <View style={styles.cardsContainer}>

        {/* CARD PASAJERO */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("registro_pasajeros")}
        >
          <Image
           
            style={styles.cardImage}
            resizeMode="contain"
          />
          <Text style={styles.cardTitle}>Soy Pasajero</Text>
          <Text style={styles.cardText}>Encuentra tu bus y paga fácilmente</Text>
        </TouchableOpacity>

        {/* CARD CONDUCTOR */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("registro_drivers")}
        >
          <Image
           
            style={styles.cardImage}
            resizeMode="contain"
          />
          <Text style={styles.cardTitle}>Soy Conductor</Text>
          <Text style={styles.cardText}>Registra tu bus y comparte tu ruta</Text>
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
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: 200,
    height: 100,
    marginBottom: 15,
  },
  title: {
    fontSize: 26,
    fontWeight: "600",
    color: PRIMARY,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 15,
    color: "#6E6E6E",
    marginBottom: 30,
  },
  cardsContainer: {
    width: "100%",
    gap: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    alignItems: "center",
  },
  cardImage: {
    width: 90,
    height: 75,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: PRIMARY,
    marginBottom: 5,
  },
  cardText: {
    fontSize: 13,
    color: "#6E6E6E",
    textAlign: "center",
  },
});

