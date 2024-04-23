import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { logout } from "../../lib/actions/user";
import { router } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";
import Wallet from "../../components/Wallet";
import { getWalletByUserID } from "../../lib/actions/wallet";

const Profile = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();
  const [balance, setBalance] = useState(0); // [1

  const logoutAction = async () => {
    await logout();
    await AsyncStorage.removeItem("@auth");

    setUser(null);
    setIsLogged(false);

    router.replace("/sign-in");
  };

  const handleShowBalance = async () => {
    try {
      const response = await getWalletByUserID(user.id);
      setBalance(response.balance);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleShowBalance();
  }, [balance]);

  return (
    <SafeAreaView>
      <ScrollView style={{ height: "100%" }}>
        <View className="m-2">
          <View className="flex-row justify-between items-center">
            <View className="ml-5 bg-slate-300 p-3 shadow-lg shadow-slate-300 rounded-full">
              <Feather name="user" size={40} color="black" />
            </View>
            <View>
              <Text className="text-xl text-center">Balance: {balance}VNĐ</Text>
            </View>
          </View>

          <View>
            <TouchableOpacity
              onPress={() => {
                router.push("deposit");
              }}
              className="p-2 bg-white m-1 rounded-lg shadow-lg"
            >
              <Text className="text-xl ">Deposit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                router.push("/(order)");
              }}
              className="p-2 bg-white m-1 rounded-lg shadow-lg"
            >
              <Text className="text-xl ">Order Bidding </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                router.push("/(update-profile)");
              }}
              className="p-2 bg-white m-1 rounded-lg shadow-lg"
            >
              <Text className="text-xl ">Address </Text>
            </TouchableOpacity>
            <View className="p-2 bg-white m-1 rounded-lg shadow-lg">
              <TouchableOpacity className="" onPress={() => logoutAction()}>
                <Text className="text-xl">Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
