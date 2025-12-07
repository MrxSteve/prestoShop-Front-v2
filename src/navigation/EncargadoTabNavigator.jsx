import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

import EncargadoHomeScreen from "../screens/encargado/EncargadoHomeScreen";
import EncargadoProductosScreen from "../screens/encargado/EncargadoProductosScreen";
import EncargadoVentasScreen from "../screens/encargado/EncargadoVentasScreen";
import EncargadoClientesScreen from "../screens/encargado/EncargadoClientesScreen";
import EncargadoAbonosScreen from "../screens/encargado/EncargadoAbonosScreen";

const Tab = createBottomTabNavigator();

export default function EncargadoTabNavigator({ navigation }) {

  const MenuButton = () => (
    <TouchableOpacity
      style={{ marginLeft: 15 }}
      onPress={() => navigation.openDrawer()}
    >
      <Ionicons name="menu-outline" size={28} color="black" />
    </TouchableOpacity>
  );

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        headerLeft: () => <MenuButton />,
        tabBarActiveTintColor: "#2563eb",
        tabBarStyle: { height: 60 },
        tabBarLabelStyle: { fontSize: 12, paddingBottom: 6 },
      }}
    >
      <Tab.Screen
        name="EncargadoHome"
        component={EncargadoHomeScreen}
        options={{
          title: "Inicio",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="EncargadoProductos"
        component={EncargadoProductosScreen}
        options={{
          title: "Productos",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cube-outline" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="EncargadoVentas"
        component={EncargadoVentasScreen}
        options={{
          title: "Ventas",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart-outline" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="EncargadoClientes"
        component={EncargadoClientesScreen}
        options={{
          title: "Clientes",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-outline" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="EncargadoAbonos"
        component={EncargadoAbonosScreen}
        options={{
          title: "Abonos",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cash-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
