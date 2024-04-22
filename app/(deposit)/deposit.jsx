import {
  View,
  Text,
  Linking,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Touchable,
} from "react-native";
import React, { useState } from "react";
import { rechargeWalletByUserID } from "../../lib/actions/wallet";
import { WebView } from "react-native-webview";
import { useGlobalContext } from "../../context/GlobalProvider";
import { router } from "expo-router";

const Deposit = () => {
  const [amount, setAmount] = useState(0 || null); // [1
  const [error, setError] = useState("");
  const [url, setUrl] = useState(null);

  const [showWebView, setShowWebView] = useState(false);

  const { user } = useGlobalContext();
  const userID = user.id;

  const recharge = async () => {
    try {
      console.log(userID, amount);
      const response = await rechargeWalletByUserID(userID, amount);

      const canOpen = await Linking.canOpenURL(response);
      if (canOpen) {
        setUrl(response);
      } else {
        console.log("Cannot open");
      }
      setShowWebView(true);
    } catch (error) {
      console.log(error);
    }
  };

  const onNavigationStateChange = (webViewstate) => {
    if (webViewstate.url.includes("test-success")) {
      setShowWebView(false);
      setAmount(0);
      router.replace("/home");
    }
  };

  const handleAmountChange = (e) => {
    if (e < 10000) {
      setError("Minimum amount is 10000");
    } else {
      setError("");
      setAmount(e);
    }
  };

  //list selected amount
  const defaultListAmount = [
    {
      id: 1,
      amount: 10000,
    },
    {
      id: 2,
      amount: 20000,
    },
    {
      id: 3,
      amount: 50000,
    },
    {
      id: 4,
      amount: 100000,
    },
    {
      id: 5,
      amount: 200000,
    },
    {
      id: 6,
      amount: 500000,
    },
  ];

  console.log("amount", amount);

  return (
    <ScrollView className="h-[100vh] bg-white">
      <View className="m-2">
        {!showWebView && (
          <View>
            <Text> Enter the amount: </Text>
            <View className="space-x-4 w-full h-16 px-4 bg-white rounded-2xl border-2 border-black-200 focus:border-secondary">
              <TextInput
                className="text-base mt-0.5 text-black-100 flex-1 font-pregular"
                placeholder="Amount"
                placeholderTextColor="#CDCDE0"
                value={amount}
                onChangeText={handleAmountChange}
              />
            </View>

            {error && <Text className="text-red-500">{error}</Text>}

            <View className="flex-row flex-wrap justify-center items-center">
              {/* list amount choosen */}
              {defaultListAmount.map((item) => (
                <TouchableOpacity
                  className="w-[45%] bg-secondary-100 p-4 mt-4 m-2 rounded-2xl border-black-200 border-2 "
                  key={item.id}
                  onPress={() => setAmount(String(item.amount))}
                >
                  <Text className="text-white text-center">{item.amount}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {error & (error === "") ? (
              <View className="bg-slate-500 p-4 rounded-2xl mt-4">
                <Text className="text-white text-center">Recharge</Text>
              </View>
            ) : (
              <TouchableOpacity onPress={recharge}>
                <View className="bg-secondary-100 p-4 rounded-2xl border-2 mt-4">
                  <Text className="text-white text-center">Recharge</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        )}

        {showWebView && (
          <WebView
            source={{ uri: url }}
            style={styles.fullscreen}
            onNavigationStateChange={onNavigationStateChange}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default Deposit;

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
    width: "100%",
    height: 1000,
  },
});
