import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../lib/actions/api";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem("@auth")
      .then((data) => {
        if (data) {
          const parsedData = JSON.parse(data);
          console.log("parsedData", parsedData);
          if (parsedData && parsedData.metadata) {
            api.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${parsedData.metadata.access_token}`;
          }

          if (parsedData && parsedData.payload) {
            setIsLogged(true);
            setUser(parsedData.payload);
            console.log(isLogged, user);
          } else {
            setIsLogged(false);
            setUser(null);
          }
        } else {
          setIsLogged(false);
          setUser(null);
        }
      })
      .catch((error) => {
        console.error("Error in getting auth", error);
        setIsLogged(false);
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  console.log("isLogged", isLogged, "user", user, "loading", loading);

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        setUser,
        loading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
