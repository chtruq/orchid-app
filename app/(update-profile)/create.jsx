import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useGlobalContext } from "../../context/GlobalProvider";
import { createUserInfo } from "../../lib/actions/user";
import { useToast } from "react-native-toast-notifications";
import { router } from "expo-router";

const CreateNewAddress = () => {
  const { user } = useGlobalContext();
  const userId = user.id;
  const [form, setForm] = useState({
    defaulted: false,
    address: "",
    phone: "",
    info_name: "",
  });

  const toast = useToast();
  const handleChange = (name, value) => {
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

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
      const response = await createUserInfo(userId, form);
      if (response) {
        toast.show("Add new profile successfully", {
          type: "success",
        });
        router.replace("/profile");
      }
    } catch (error) {
      console.log(error);
      toast.show("Add new profile failed", {
        type: "error",
      });
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
          onPress={handleSubmit}
          className="w-[100wh] justify-center items-center p-5 bg-secondary-100 mt-10 rounded-2xl"
        >
          <Text>Add new profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CreateNewAddress;
