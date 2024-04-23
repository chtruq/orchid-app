import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/GlobalProvider";
import {
  getUserAddress,
  setDefaultAddress,
  updateProfile,
} from "../../lib/actions/user";
import { Toast, useToast } from "react-native-toast-notifications";
import { router } from "expo-router";

const AddressProfile = () => {
  const { user } = useGlobalContext();
  const userId = user.id;
  const [address, setAddress] = useState([]);
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const showUserAddress = async () => {
    setIsLoading(true);
    try {
      const response = await getUserAddress(userId);
      setAddress(response);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    showUserAddress();
  }, []);

  const setDefaultedAddress = async (addressId) => {
    try {
      const response = await setDefaultAddress(userId, addressId);
      if (response) {
        toast.show("Set default address successfully", {
          type: "success",
        });
      } else {
        Alert.alert("Error", "Set default address failed");
        toast.show("Set default address failed", {
          type: "error",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView className="m-2">
      <View>
        <TouchableOpacity className="text-2xl bg-secondary-200 rounded-lg p-3 m-2 text-center">
          <Text
            className="text-xl text-white"
            onPress={() => {
              router.push("/create");
            }}
          >
            Add new address
          </Text>
        </TouchableOpacity>
      </View>

      <View className="">
        {isLoading && (
          <View className="h-[80vh] items-center justify-center">
            <ActivityIndicator size="large" color="#FFAD41" />
          </View>
        )}

        {address ? (
          address.map((data) => (
            <TouchableOpacity
              className="p-2 bg-white m-2 h-[20vh] rounded-lg"
              key={data.id}
              onPress={() => {
                router.push({
                  pathname: "/update",
                  params: { addressId: data.id },
                });
              }}
            >
              <Text className="text-lg">Info Name: {data.info_name}</Text>
              <Text className="text-lg">Address: {data.address}</Text>
              <Text className="text-lg">Phone number: {data.phone}</Text>
              <Text className="text-lg">{data.defaulted ? "Defaut" : ""}</Text>
              <TouchableOpacity
                onPress={() => setDefaultedAddress(data.id)}
                className="absolute bottom-2 p-3"
              >
                <Text className=" text-base">Set default address</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))
        ) : (
          <View>
            <Text>No address added</Text>
          </View>
        )}

        {/* {address &&
          address.map((data) => (
            <TouchableOpacity
              className="p-2 bg-white m-2 h-[20vh] rounded-lg"
              key={data.id}
              onPress={() => {
                router.push({
                  pathname: "/update",
                  params: { addressId: data.id },
                });
              }}
            >
              <Text className="text-lg">Info Name: {data.info_name}</Text>
              <Text className="text-lg">Address: {data.address}</Text>
              <Text className="text-lg">Phone number: {data.phone}</Text>
              <Text className="text-lg">{data.defaulted ? "Defaut" : ""}</Text>
              <TouchableOpacity
                onPress={() => setDefaultedAddress(data.id)}
                className="absolute bottom-2 p-3"
              >
                <Text className=" text-base">Set default address</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))} */}
      </View>
    </ScrollView>
  );
};

export default AddressProfile;
