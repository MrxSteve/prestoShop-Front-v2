import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ClienteTabNavigator from "./ClienteTabNavigator";
import CustomDrawer from "../components/CustomDrawer";
import { Ionicons } from "@expo/vector-icons";

const Drawer = createDrawerNavigator();

export default function ClienteDrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <CustomDrawer 
          {...props}
          headerColor="#0ea5e9"  // celeste (puedes cambiarlo)
          icon="person-outline" // ícono del usuario
        />
      )}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: "#0ea5e9",
        drawerLabelStyle: { fontSize: 16 },
      }}
    >
      <Drawer.Screen
        name="Inicio Cliente"
        component={ClienteTabNavigator}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
