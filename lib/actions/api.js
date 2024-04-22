import axios from "axios";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: "https://orchid-be.azurewebsites.net/api/v1",

  // set the bearer token by using the async storage
});

const setAuthToken = async () => {
  const data = await AsyncStorage.getItem("@auth");
  if (data) {
    const parsedData = JSON.parse(data);
    if (parsedData && parsedData.metadata) {
      const { access_token } = parsedData.metadata.access_token;
      api.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
    } else {
      console.error("Parsed data does not contain metadata");
    }
  }
};

const removeAuthToken = () => {
  api.defaults.headers.common["Authorization"] = "";
};

if (AsyncStorage.getItem("@auth") === null) {
  removeAuthToken();
}

setAuthToken();
export default api;
