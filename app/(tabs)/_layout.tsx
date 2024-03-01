import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs>
        <Tabs.Screen
          name="updates"
          options={{
            title: "Updates",
            tabBarIcon: ({ size, color }) => (
              <MaterialCommunityIcons name="update" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ size, color }) => (
              <MaterialCommunityIcons
                name="update"
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </GestureHandlerRootView>
  );
}
