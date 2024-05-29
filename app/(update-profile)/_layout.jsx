import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const UpdateProfile = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="update" options={{ headerShown: false }} />
      <Stack.Screen name="create" options={{ headerShown: false }} />
    </Stack>
  );
};

export default UpdateProfile;
