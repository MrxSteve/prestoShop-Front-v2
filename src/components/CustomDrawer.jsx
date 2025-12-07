import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";

export default function CustomDrawer(props) {
  const { user, logout } = useAuth();

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>

        {/* HEADER DEL USUARIO */}
        <View style={[styles.header, { backgroundColor: props.headerColor || "#2563eb" }]}>
          <View style={styles.avatar}>
            <Ionicons name={props.icon || "person-circle-outline"} size={65} color="#fff" />
          </View>
          <Text style={styles.name}>
            {user?.nombreCompleto || "Usuario"}
          </Text>
          <Text style={styles.email}>
            {user?.email}
          </Text>
        </View>

        {/* ITEMS DEL DRAWER */}
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      {/* BOTÓN DE CERRAR SESIÓN */}
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Ionicons name="log-out-outline" size={22} color="#e11d48" />
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    paddingTop: 50,
  },
  avatar: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  email: {
    fontSize: 14,
    color: "#e0e7ff",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  logoutText: {
    fontSize: 16,
    marginLeft: 10,
    color: "#e11d48",
    fontWeight: "bold",
  },
});
