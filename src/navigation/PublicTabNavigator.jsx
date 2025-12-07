import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import { View, Text } from "react-native";

import TiendasDisponiblesScreen from "../screens/public/TiendasDisponiblesScreen.jsx";
import LoginScreen from "../screens/auth/LoginScreen.jsx";
import SolicitudTiendaScreen from "../screens/public/SolicitudTiendaScreen.jsx";

const Tab = createBottomTabNavigator();

export default function PublicTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,

        // 🎨 Estilos del Header
        headerStyle: {
          backgroundColor: "#2563eb", // blue-600
        },
        headerTitleStyle: {
          color: "white",
          fontWeight: "700",
          fontSize: 18,
        },
        headerTitleAlign: "center",

        // 🟦 Estilos del Tab Bar
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderTopWidth: 0,
          elevation: 8,
          height: 60,
          paddingBottom: 6,
          paddingTop: 6,
        },

        // 🎯 Estilo del texto de las tabs
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },

        // 🟢 Color activo/inactivo
        tabBarActiveTintColor: "#2563eb",
        tabBarInactiveTintColor: "#6b7280", // gray-500
      }}
    >
      {/* TAB 1 - TIENDAS */}
      <Tab.Screen
        name="Tiendas"
        component={TiendasDisponiblesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="shopping-cart" size={size} color={color} />
          ),
          headerTitle: "Tiendas Disponibles",
        }}
      />

      {/* TAB 2 - LOGIN */}
      <Tab.Screen
        name="Login"
        component={LoginScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="sign-in" size={size} color={color} />
          ),
          headerTitle: "Iniciar Sesión",
        }}
      />

      {/* TAB 3 - SOLICITUD */}
      <Tab.Screen
        name="SolicitudTienda"
        component={SolicitudTiendaScreen}
        options={{
          title: "Solicitar",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="plus-circle" size={size} color={color} />
          ),
          headerTitle: "Solicitud de Apertura",
        }}
      />
    </Tab.Navigator>
  );
}
