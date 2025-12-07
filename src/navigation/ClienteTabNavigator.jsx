import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

import ClienteTiendasScreen from "../screens/client/ClienteTiendasScreen";
import ClienteComprasScreen from "../screens/client/ClienteComprasScreen";
import ClienteAbonosScreen from "../screens/client/ClienteAbonosScreen";

const Tab = createBottomTabNavigator();

export default function ClienteTabNavigator({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: "#2563eb",
        tabBarStyle: { height: 60 },
        tabBarLabelStyle: { fontSize: 12, paddingBottom: 6 },

        // BOTÓN PARA ABRIR EL DRAWER
        headerLeft: () => (
          <TouchableOpacity
            style={{ marginLeft: 15 }}
            onPress={() => navigation.openDrawer()}
          >
            <Ionicons name="menu" size={26} color="#2563eb" />
          </TouchableOpacity>
        ),
      }}
    >
      <Tab.Screen
        name="ClienteTiendas"
        component={ClienteTiendasScreen}
        options={{
          title: "Mis Tiendas",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="storefront-outline" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="ClienteCompras"
        component={ClienteComprasScreen}
        options={{
          title: "Mis Compras",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart-outline" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="ClienteAbonos"
        component={ClienteAbonosScreen}
        options={{
          title: "Mis Abonos",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cash-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
