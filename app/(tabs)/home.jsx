import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { getProducts } from "../../lib/actions/product";
import { rechargeWalletByUserID } from "../../lib/actions/wallet";

const Home = () => {
  const check = async () => {
    try {
      const active = true;
      const response = await getProducts(active);
      console.log(response.content);
    } catch (error) {
      console.log(error);
    }
  };

  const recharge = async () => {
    try {
      const userID = 3;
      const amount = 10000;
      const response = await rechargeWalletByUserID(userID, amount);

      const canOpen = await Linking.canOpenURL(response);
      if (canOpen) {
        await Linking.openURL(response);
      } else {
        console.log("Cannot open");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View>
          <Text>Home</Text>

          <TouchableOpacity onPress={() => check()}>
            <Text className="text-3xl">Check APi</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => recharge()}>
            <Text className="text-3xl">Test Wallet</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
