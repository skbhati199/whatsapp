import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Tabs } from "expo-router";
import {  MaterialIcons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: Colors.background
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.gray,
        tabBarActiveBackgroundColor: Colors.background,
        headerStyle: {
          backgroundColor: Colors.background,
        },
        headerShown: false,
      }}
      >
        <Tabs.Screen
          name="updates"
          options={{
            title: "Updates",
            tabBarIcon: ({ size, color }) => (
              <MaterialIcons name="update" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="calls"
          options={{
            title: "Calls",
            tabBarIcon: ({ size, color }) => (
              <MaterialIcons name="phone" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="communities"
          options={{
            title: "Communities",
            tabBarIcon: ({ size, color }) => (
              <MaterialIcons name="people-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="chats"
          options={{
            title: "Chats",
            tabBarIcon: ({ size, color }) => (
              <MaterialIcons name="chat" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ size, color }) => (
              <MaterialIcons name="settings" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </GestureHandlerRootView>
  );
}
