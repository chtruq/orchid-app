import { View, Text, ScrollView, Image, Dimensions, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "../../constants/icons";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { login } from "../../lib/actions/user";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignIn = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
      return false;
    }

    //regex for email validation
    const emailRegrex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegrex.test(form.email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return false;
    }

    //regex for password validation

    setSubmitting(true);

    try {
      await login(form.password, form.email).then(() => {
        router.replace("/home");
      });
      // await AsyncStorage.setItem("@auth", JSON.stringify(data));
      //save the token to async storage
      setSubmitting(false);
      router.replace("/home");
    } catch (error) {
      console.log(error);
      setSubmitting(false);
    }

    return true;
  };

  return (
    <SafeAreaView className="bg-white">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full flex justify-center h-full px-4 ">
          <View className="flex-row justify-start items-center">
            <Image
              source={icons.logo}
              className="w-[65px] h-[60px]"
              resizeMode="contain"
            />
            <Text className="text-5xl font-bold mt-4">Orchid</Text>
          </View>
          <View>
            <Text className="text-2xl font-bold text-left mt-4">
              Log in to Orchid
            </Text>
          </View>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-black-100 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary"
            >
              Signup
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
