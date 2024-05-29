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

    return response.data;
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

const getUserAddress = async (userId) => {
  try {
    const response = await api.get(`/userInfo/getByUserId/${userId}`);
    return response.data.payload?.in4DetailResponseList;
  } catch (error) {
    throw error;
  }
};

const updateUserIn4 = async (userId, body) => {
  try {
    console.log("body", body);
    const response = await api.put(`/userInfo/${userId}`, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getUserIn4BById = async (id) => {
  try {
    const response = await api.get(`/userInfo/getDefaultByUserId/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const setDefaultAddress = async (userId, addressId) => {
  try {
    addressId = parseInt(addressId);
    console.log("addressId", addressId);
    const response = await api.put(`/userInfo/${userId}`, {
      id: addressId,
      defaulted: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const createUserInfo = async (userId, body) => {
  try {
    const response = await api.post(
      `/userInfo/CreateUserIn4ByUserId/${userId}`,
      body
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export {
  login,
  logout,
  signup,
  getUser,
  updateUserIn4,
  getUserAddress,
  getUserIn4BById,
  setDefaultAddress,
  createUserInfo,
};
