import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const Wallet = () => {
  return (
    <View className="m-5 shadow-lg flex justify-around flex-row bg-white rounded-xl border-2 border-slate-950">
      <View className=" w-[40%]">
        <TouchableOpacity className="justify-center flex-row items-center">
          <Ionicons name="wallet-outline" size={24} color="black" />
          <Text className="p-3 text-xl">Deposit</Text>
        </TouchableOpacity>
      </View>
      <View className=" w-[20%] items-center ">
        <Text className="p-3 text-xl">|</Text>
      </View>
      <View className=" w-[40%]">
        <Text className="p-3 text-xl">1000VNĐ</Text>
      </View>
    </View>
  );
};

export default Wallet;
