import React, { useEffect, useState } from "react";
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  ToastAndroid,
} from "react-native";
import { getWalletByUserID } from "../../../lib/actions/wallet";
import { useGlobalContext } from "../../../context/GlobalProvider";
import { registerByAuctionID } from "../../../lib/actions/auction";

const ModalRegisterAuction = ({ data, isVisible, onClose }) => {
  const { user } = useGlobalContext();
  const [balance, setBalance] = useState(0);
  const [isRegistered, setIsRegistered] = useState(false);
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
  }, []);
  useEffect(() => {
    handleShowBalance();
    const isUserRegistered = data.bidList.some((bid) => bid.userID === user.id);
    setIsRegistered(isUserRegistered);
  }, [data, user.id]);

  console.log("user-id", user.id);
  console.log("balance", balance);
  console.log("data", data);
  const handleRegister = async () => {
    if (isRegistered) {
      ToastAndroid.show("Bạn đã vào phiên đấu giá", ToastAndroid.SHORT);
    } else if (balance >= data.startPrice) {
      try {
        const body = {
          userId: user.id,
        };
        await registerByAuctionID(data.id, body);
        console.log("Registering...");
        onClose();
      } catch (error) {
        console.log(error);
      }
    } else {
      ToastAndroid.show("Bạn không đủ số dư trong ví", ToastAndroid.SHORT);
    }
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View className="backdrop-blur-sm bg-white/60 flex-1 justify-center items-center">
        <View className=" bg-white p-4 w-[40vh] h-[35vh] rounded-lg border-2">
          <Text className="text-center text-[22px] text-red-400">
            Register for auction
          </Text>
          <View className="m-1.5 flex-row justify-start">
            <Text className="font-medium text-[18px]">Product name: </Text>
            <Text className="text-[18px]">{data.productName}</Text>
          </View>
          <View className="m-1.5 flex-row justify-start">
            <Text className="font-medium text-[18px]">Start price: </Text>
            <Text className="text-[18px]"> {data.startPrice}</Text>
          </View>
          <View className="m-1.5 flex-row justify-start">
            <Text className="font-medium text-[18px]">Start day: :</Text>
            <Text className="text-[18px]">
              {" "}
              {new Date(data.startDate).toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </View>
          <View className="m-1.5 flex-row justify-start">
            <Text className="font-medium text-[18px]">End day:</Text>
            <Text className="text-[18px]">
              {" "}
              {new Date(data.startDate).toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </View>
          <View className="flex-row justify-around mt-5">
            <TouchableOpacity
              className="flex-1 bg-gray-400 p-2 ml-4 mr-8 rounded-lg justify-center border-2"
              onPress={onClose}
            >
              <Text className="text-[16px] text-center">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 bg-orange-400 mr-4 p-2 rounded-lg justify-center border-2"
              onPress={handleRegister}
            >
              <Text className="text-[16px] text-white text-center">
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalRegisterAuction;
