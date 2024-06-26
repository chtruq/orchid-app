import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import GlobalProvider from "../context/GlobalProvider";
import { ToastProvider } from "react-native-toast-notifications";

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) {
    return null;
  }

  if (!fontsLoaded && !error) {
    return null;
  }
  return (
    <>
      <GlobalProvider>
        <ToastProvider>
          <Stack>
            <Stack.Screen
              name="index"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="(auth)"
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="(tabs)"
              options={{
                headerShown: false,
                headerBackButtonMenuEnabled: false,
              }}
            />
            <Stack.Screen
              name="(deposit)"
              options={{
                headerTitle: "Deposit",
                headerBackTitle: "Back",
              }}
            />

            <Stack.Screen
              name="product-detail"
              options={{
                headerTitle: "Auction Detail",
                headerBackTitle: "Back",
              }}
            />

            <Stack.Screen
              name="(order)"
              options={{
                headerTitle: "Order",
                headerBackTitle: "Back",
              }}
            />
            <Stack.Screen
              name="(update-profile)"
              options={{
                headerTitle: "Address",
                headerBackTitle: "Back",
              }}
            />
          </Stack>
        </ToastProvider>
      </GlobalProvider>
    </>
  );
};

export default RootLayout;
