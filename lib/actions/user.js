import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api";
import { router } from "expo-router";

//save the login return to async storage
const login = async (password, email) => {
  try {
    const response = await api.post("/auth/login", {
      password,
      email,
    });

    // await AsyncStorage.setItem("@auth", JSON.stringify(response.data));
    return response.data;
    return;
  } catch (error) {
    throw error;
  }
};

const signup = async (email, password, name, dob, gender) => {
  try {
    const response = await api.post("/users/register", {
      email: email,
      password: password,
      name: name,
      dob: dob,
      gender: gender,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

const logout = async () => {
  try {
    await AsyncStorage.removeItem("@auth");
    api.defaults.headers.common["Authorization"] = "";
  } catch (error) {
    throw error;
  }
};

const getUser = async () => {
  try {
    const response = await api.get("/auth/user");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { login, logout, signup, getUser };
