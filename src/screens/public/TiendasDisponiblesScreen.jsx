import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function TiendasDisponiblesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tiendas Disponibles</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9fafb", // gray-50
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937", // gray-800
  },
});
