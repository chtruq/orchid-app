import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getOrderByUserId } from "../../lib/actions/order";
import { useGlobalContext } from "../../context/GlobalProvider";
import { getAuctionsByID } from "../../lib/actions/auction";
import { router } from "expo-router";

const Order = () => {
  const { user } = useGlobalContext();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState();
  const [auctionData, setAuctionData] = useState([]);
  // const userId = { userId: user.id };
  const body = { userId: 3, status: "PENDING" };

  const getOrders = async () => {
    setLoading(true);
    try {
      const response = await getOrderByUserId(body);
      setOrders(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {
    const countdown = setInterval(() => {
      orders.forEach((order) => {
        const currentTime = new Date().getTime();
        const expireTime = new Date(order.expiredAt).getTime();
        const diff = Math.max(Math.floor((expireTime - currentTime) / 1000), 0);
        setTimeLeft(diff);
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [orders]);

  return (
    <ScrollView className="">
      {loading && (
        <View className="h-[80vh] items-center justify-center">
          <ActivityIndicator size="large" color="#FF9C01" />
        </View>
      )}

      {orders &&
        orders.map((order) => {
          const hours = Math.floor(timeLeft / 3600);
          const minutes = Math.floor((timeLeft % 3600) / 60);
          const seconds = timeLeft % 60;

          return (
            <View
              key={order.id}
              className="m-2 p-2 bg-white rounded-lg shadow-lg"
            >
              <Text className="text-base">Product: {order.productName}</Text>
              <Text className="text-base">Code: {order.productCode} </Text>
              <Text className="text-base">
                Total:{" "}
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(order.total)}
              </Text>
              <Text className="text-base">
                Time left: {hours}h:{minutes}m:{seconds}s
              </Text>

              <TouchableOpacity
                onPress={() => {
                  router.navigate({
                    pathname: "/(order)/payment",
                    params: { id: order.id },
                  });
                }}
              >
                <Text className="text-base text-blue-500">
                  Process to Payment
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
    </ScrollView>
  );
};

export default Order;
