import {
  View,
  Text,
  ScrollView,
  Image,
  Button,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { signup } from "../../lib/actions/user";

const SignUp = () => {
  // const { setUser, setIsLogged } = useGlobalContext();

  const [isSubmitting, setSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "Hiện chưa có tên",
    dob: "2000-04-20T14:33:22.102Z",
    gender: "MALE",
  });
  const [passwordConfirm, setPasswordConfirm] = useState("");

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

    const passwordRegrex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (!passwordRegrex.test(form.password)) {
      Alert.alert(
        "Error",
        "Password must contain at least one numeric digit, one uppercase and one lowercase letter, and at least 6 characters"
      );
      return false;
    }
    if (form.password !== passwordConfirm) {
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

    try {
      console.log(
        "form",
        form.email,
        form.password,
        form.name,
        form.dob,
        form.gender
      );

      await signup(form.email, form.password, form.name, form.dob, form.gender);
      router.replace("/sign-in");
      setSubmitting(false);
    } catch (error) {
      console.log(error);
    }
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
            value={passwordConfirm}
            handleChangeText={(e) => setPasswordConfirm(e)}
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
