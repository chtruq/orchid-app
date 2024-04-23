import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { getOrderByUserId } from "../../lib/actions/order";
import { useGlobalContext } from "../../context/GlobalProvider";

const Order = () => {
  const { user } = useGlobalContext();
  const [orders, setOrders] = useState([]);
  //   const userId = { userId: user.id };
  const userId = { userId: 3 };

  const getOrders = async () => {
    try {
      const response = await getOrderByUserId(userId);
      setOrders(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  console.log("orders", orders);

  return (
    <View className="">
      {orders &&
        orders.map((order) => {
          return (
            <View
              key={order.id}
              className="m-2 p-2 bg-slate-300 rounded-lg shadow-lg"
            >
              <Text className="text-xl">Product: {order.productName}</Text>
              <Text className="text-xl">Quantity: {order.quantity}</Text>
              <Text className="text-xl">
                Payment method: {order.paymentMethod}
              </Text>
              <Text className="text-xl">Phone: 0{order.phone}</Text>
              <Text className="text-xl">Address: {order.address}</Text>
              <Text className="text-xl">
                Status: {order.status === "CONFIRMED" ? "Confirmed" : "Failed"}
              </Text>
            </View>
          );
        })}
    </View>
  );
};

export default Order;
