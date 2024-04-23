import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const Wallet = ({ balance }) => {
  return (
    <View className="m-5 shadow-xl flex justify-around flex-row rounded-xl ">
      <View className=" w-[40%]">
        <TouchableOpacity
          onPress={() => router.push("deposit")}
          className="justify-center flex-row items-center"
        >
          <Ionicons name="wallet-outline" size={24} color="black" />
          <Text className="p-3 text-xl">Deposit</Text>
        </TouchableOpacity>
      </View>
      <View className=" w-[20%] items-center ">
        <Text className="p-3 text-xl">|</Text>
      </View>
      <View className=" w-[40%]">
        <Text className="p-3 text-xl">{balance}đ</Text>
      </View>
    </View>
  );
};

export default Wallet;
