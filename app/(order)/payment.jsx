import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { getOrderByOrderId, updateOrder } from "../../lib/actions/order";
import { getAuctionsByID } from "../../lib/actions/auction";
import { useGlobalContext } from "../../context/GlobalProvider";
import { getUserAddress } from "../../lib/actions/user";
import { useToast } from "react-native-toast-notifications";
import { WebView } from "react-native-webview";

const Payment = () => {
  const id = useLocalSearchParams("id");
  const orderId = Number(id.id);
  const [order, setOrder] = useState({});
  const [auctionID, setAuctionID] = useState();
  const [auction, setAuction] = useState();
  const { user } = useGlobalContext();
  const [address, setAddress] = useState();
  const [form, setForm] = useState({
    userIn4Id: "",
    paymentMethod: "",
    note: "",
  });
  const [selectedAddress, setSelectedAddress] = useState();
  const [selectedPayment, setSelectedPayment] = useState();
  const [url, setUrl] = useState(null);

  const [showWebView, setShowWebView] = useState(false);

  //   const userId = user.id;
  const userId = 3;

  const toast = useToast();

  const getOrderById = async () => {
    try {
      const response = await getOrderByOrderId(orderId);
      setOrder(response.payload);
      setAuctionID(response.payload.auctionID);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrderById();
  }, []);

  const getAuction = async () => {
    try {
      if (auctionID) {
        const response = await getAuctionsByID(auctionID);
        setAuction(response.payload);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAuction();
  }, [auctionID]);

  const getUserInfor = async () => {
    try {
      const response = await getUserAddress(userId);
      setAddress(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserInfor();
  }, [userId]);

  //validate the form show toast if the form is not valid

  const validateForm = () => {
    if (form.userIn4Id === "" || form.paymentMethod === "") {
      // Show toast or display an error message
      // Example: toast.error("Please fill in all required fields");

      // Replace toast.error with the appropriate method for displaying a toast or error message in your application

      toast.error("Please fill in all required fields");

      return false;
    }
  };

  const handlePayment = async () => {
    try {
      const response = await updateOrder(orderId, form);
      console.log(response.payload);
      if (selectedPayment === "BANK") {
        const canOpen = await Linking.canOpenURL(response.payload);
        if (canOpen) {
          setUrl(response.payload);
        } else {
          console.log("Cannot open");
        }
        setShowWebView(true);
      } else if (selectedPayment === "CARD") {
        // do things with card here
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onNavigationStateChange = (webViewstate) => {
    if (webViewstate.url.includes("test-success")) {
      setShowWebView(false);
      toast.show("Payment successful", {
        type: "success",
      });
      router.replace("/home");
    } else if (webViewstate.url.includes("test-failed")) {
      setShowWebView(false);
      toast.show("Payment failed", {
        type: "error",
      });
    }
  };

  return (
    <ScrollView className="h-[100vh]">
      {showWebView ? (
        <WebView
          source={{ uri: url }}
          style={styles.fullscreen}
          onNavigationStateChange={onNavigationStateChange}
        />
      ) : (
        <View className="">
          <Image
            className="w-[80wh] h-[35vh]"
            source={{ uri: auction?.image_url }}
          />
          <View className="m-2">
            <Text className="text-xl font-psemibold">{order.productName} </Text>
            <Text className="">Code: {order.productCode}</Text>
            <Text className="">Quantity: {order.quantity}</Text>
          </View>

          {/* selection to choose the address */}
          <View className="m-2">
            <Text className="text-xl font-psemibold">Delivery Address</Text>

            {address &&
              address.map((add) => (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedAddress(add.id);
                    setForm({ ...form, userIn4Id: add.id });
                  }}
                  key={add.id}
                  className={`flex-row justify-between items-center border-2 m-1 rounded-md border-gray-300 p-2 ${
                    selectedAddress === add.id ? "bg-secondary-100" : ""
                  } `}
                >
                  <Text
                    className={`${
                      selectedAddress === add.id ? "text-white" : ""
                    } `}
                  >
                    {add.address}
                  </Text>
                </TouchableOpacity>
              ))}
          </View>

          <View className="m-2">
            <Text className="text-xl font-psemibold">Payment Method</Text>
            <View className="flex-row justify-around">
              <TouchableOpacity
                onPress={() => {
                  setSelectedPayment("CARD");
                  setForm({ ...form, paymentMethod: "CARD" });
                }}
                className={`p-3 rounded-xl shadow-xl  ${
                  selectedPayment === "CARD" ? "bg-secondary-100" : ""
                }`}
              >
                <Text
                  className={`text-lg ${
                    selectedPayment === "CARD" ? "text-white" : ""
                  } `}
                >
                  Wallet
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setSelectedPayment("BANK");
                  setForm({ ...form, paymentMethod: "BANK" });
                }}
                className={`p-3 ${
                  selectedPayment === "BANK" ? "bg-secondary-100" : ""
                } rounded-xl shadow-xl`}
              >
                <Text
                  className={`text-lg ${
                    selectedPayment === "BANK" ? "text-white" : ""
                  } `}
                >
                  VNPay
                </Text>
              </TouchableOpacity>
            </View>

            {
              // selected payment and address
              selectedPayment && selectedAddress ? (
                <TouchableOpacity
                  onPress={handlePayment}
                  className="w-[90wh] p-5 bg-secondary-200 mt-2 rounded-xl"
                >
                  <Text className="text-center text-white text-base">
                    Proceed to Payment{" "}
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(order.total)}
                  </Text>
                </TouchableOpacity>
              ) : (
                <View className="w-[90wh] p-5 bg-slate-400 mt-2 rounded-xl">
                  <Text className="text-center text-white text-base">
                    Proceed to Payment{" "}
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(order.total)}
                  </Text>
                </View>
              )
            }
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default Payment;

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
    width: "100%",
    height: 1000,
  },
});
