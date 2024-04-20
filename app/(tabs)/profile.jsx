import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { logout } from "../../lib/actions/user";
import { router } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";

const Profile = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();

  const logoutAction = async () => {
    await logout();
    setUser(null);
    setIsLogged(false);
    router.replace("/sign-in");
  };

  return (
    <SafeAreaView>
      <ScrollView style={{ height: "100%" }}>
        <View className="flex-1 justify-center items-center">
          <TouchableOpacity className="" onPress={() => logoutAction()}>
            <Text className="text-4xl">Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
