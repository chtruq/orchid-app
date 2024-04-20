import { Link, Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "../constants/icons";
import CustomButton from "../components/CustomButton";
import { useGlobalContext } from "../context/GlobalProvider";

export default function App() {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/home" />;

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      <ScrollView
        contentContainerStyle={{ height: "100%", justifyContent: "center" }}
      >
        <View className="justify-center items-center">
          <Image
            source={icons.logo}
            className="w-[120px] h-[84px]"
            resizeMode="contain"
          />
          <Text className="text-2xl font-bold text-center mt-4">
            Welcome to Orchid!
          </Text>
        </View>
        <CustomButton
          title="Continue with Email"
          handlePress={() => router.push("/sign-in")}
          containerStyles="w-full mt-7"
        />
      </ScrollView>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}
