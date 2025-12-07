import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { ActivityIndicator, Text, View, StyleSheet } from "react-native";
import { useAuth } from "../context/AuthContext";

import PublicTabNavigator from "./PublicTabNavigator";
import EncargadoDrawerNavigator from "./EncargadoDrawerNavigator";
import ClienteDrawerNavigator from "./ClienteDrawerNavigator";

const Stack = createNativeStackNavigator();

function LoadingScreen() {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#2563eb" />
      <Text style={styles.loadingText}>Cargando...</Text>
    </View>
  );
}

export default function AppNavigator() {
  const { isAuthenticated, userRole, isLoading } = useAuth();

  if (isLoading) return <LoadingScreen />;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="Public" component={PublicTabNavigator} />
        ) : userRole === "ENCARGADO" || userRole === "EMPLEADO" ? (
          <Stack.Screen
            name="EncargadoDrawer"
            component={EncargadoDrawerNavigator}
          />
        ) : userRole === "CLIENTE" ? (
          <Stack.Screen
            name="ClienteDrawer"
            component={ClienteDrawerNavigator}
          />
        ) : (
          <Stack.Screen name="Public" component={PublicTabNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
  },
  loadingText: {
    marginTop: 16,
    color: "#4b5563",
  },
});