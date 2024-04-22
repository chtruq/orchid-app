import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const DepositLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="deposit" options={{ headerShown: false }} />
    </Stack>
  );
};

export default DepositLayout;
