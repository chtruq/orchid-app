import { View, Text, ScrollView, Image, Button, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";

const SignUp = () => {
  // const { setUser, setIsLogged } = useGlobalContext();

  const [isSubmitting, setSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [form, setForm] = useState({
    email: "",
    password: "",
    password_confirm: "",
  });

  const validate = () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
      return false;
    }

    // regrex for email validation
    const emailRegrex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegrex.test(form.email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return false;
    }

    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
      return false;
    }

    if (form.password !== form.password_confirm) {
      Alert.alert("Error", "Passwords do not match");
      return false;
    }

    return true;
  };

  const onChange = (event, selectedDate) => {
    setDate(selectedDate);
    setOpen(false);
  };

  const submit = async () => {
    if (!validate()) {
      return;
    }

    setSubmitting(true);

    // try {
    //   await signUp(form.email, form.password);
    //   const result = await getCurrentUser();
    //   setUser(result);
    //   setIsLogged(true);

    //   Alert.alert("Success", "User signed up successfully");
    //   router.replace("/home");
    // } catch (error) {
    //   Alert.alert("Error", error.message);
    // } finally {
    //   setSubmitting(false);
    // }
  };

  return (
    <SafeAreaView className="bg-white">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full flex justify-center h-full px-4">
          {/* <View className="flex-row justify-start items-center">
            <Image
              source={icons.logo}
              className="w-[65px] h-[60px]"
              resizeMode="contain"
            />
            <Text className="text-5xl font-bold mt-4">Orchid</Text>
          </View> */}
          <View>
            <Text className="text-2xl font-bold text-left mt-4">
              Sign Up to Orchid
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
          <FormField
            title="Password Confirm"
            value={form.password_confirm}
            handleChangeText={(e) => setForm({ ...form, password_confirm: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-black-100 font-pregular">
              Have an account already?
            </Text>
            <Link
              href="/sign-in"
              className="text-lg font-psemibold text-secondary"
            >
              Login
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
