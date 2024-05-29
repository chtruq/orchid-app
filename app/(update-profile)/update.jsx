import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/GlobalProvider";
import { useToast } from "react-native-toast-notifications";
import { updateUserIn4 } from "../../lib/actions/user";
import { useGlobalSearchParams, useLocalSearchParams } from "expo-router";

const AddressUpdate = () => {
  const { user } = useGlobalContext();
  const userId = user.id;
  const address = useLocalSearchParams("addressId");
  const addressId = address.addressId;
  //   console.log("address", address.addressId);

  const [form, setForm] = useState({
    id: addressId,
    defaulted: false,
    address: "",
    phone: "",
    info_name: "",
  });

  const toast = useToast();

  const handleChange = (name, value) => {
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  //   const getAddress = async () => {
  //     try {
  //       const response = await getUserIn4BById(addressId);
  //       setForm(response);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   useEffect(() => {
  //     getAddress();
  //   }, []);

  console.log("form", form);

  const validateForm = () => {
    if (!form.address || !form.phone || !form.info_name) {
      Alert.alert("Error", "All fields are required");
      return false;
    }

    //regex phone number
    const phoneRegex = /^0\d{9}$/;
    if (!phoneRegex.test(form.phone)) {
      Alert.alert("Error", "Phone number is invalid");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const response = await updateUserIn4(userId, form);
      if (response) {
        toast.show("Update profile successfully", {
          type: "success",
        });

        Alert.alert("Success", "Update profile successfully");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Update profile failed");
    }
  };
  return (
    <ScrollView className="m-2">
      <View>
        <Text className="text-2xl">Tên người nhận:</Text>
        <TextInput
          name="info_name"
          value={form.info_name}
          onChangeText={(value) => handleChange("info_name", value)}
          className="space-x-4 w-full h-16 px-4 bg-white rounded-2xl border-2 border-black-200 focus:border-secondary"
        />
        <Text className="text-2xl">Địa chỉ: </Text>
        <TextInput
          name="address"
          value={form.address}
          onChangeText={(value) => handleChange("address", value)}
          className="space-x-4 w-full h-16 px-4 bg-white rounded-2xl border-2 border-black-200 focus:border-secondary"
        />
        <Text className="text-2xl">Số điện thoại:</Text>
        <TextInput
          name="phone"
          value={form.phone}
          onChangeText={(value) => handleChange("phone", value)}
          className="space-x-4 w-full h-16 px-4 bg-white rounded-2xl border-2 border-black-200 focus:border-secondary"
          keyboardType="numeric"
        />
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {
            handleSubmit();
          }}
          className="w-[100wh] justify-center items-center p-5 bg-secondary-100 mt-10 rounded-2xl"
        >
          <Text>Confirm Update</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddressUpdate;
