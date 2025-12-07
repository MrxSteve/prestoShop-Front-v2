import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import EncargadoTabNavigator from "./EncargadoTabNavigator";
import CustomDrawer from "../components/CustomDrawer";
import { Ionicons } from "@expo/vector-icons";

const Drawer = createDrawerNavigator();

export default function EncargadoDrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <CustomDrawer 
          {...props}
          headerColor="#2563eb"
          icon="briefcase-outline"
        />
      )}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: "#2563eb",
        drawerLabelStyle: { fontSize: 16 },
      }}
    >
      <Drawer.Screen
        name="Inicio"
        component={EncargadoTabNavigator}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
