import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerTitleAlign: "center",
      }}
    >
      <Tabs.Screen
        name="screen1"
        options={{
          title: "Pantalla1",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="screen2"
        options={{
          title: "Pantalla2",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="paper-plane" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="screen3"
        options={{
          title: "Pantalla3",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="paper-plane" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="screen4"
        options={{
          title: "Pantalla4",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="paper-plane" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="screen5"
        options={{
          title: "Pantalla5",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="paper-plane" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
