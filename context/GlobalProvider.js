import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../lib/actions/api";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //use Async storage to check if the user is logged in
  useEffect(() => {
    AsyncStorage.getItem("@auth").then((data) => {
      if (data) {
        const parsedData = JSON.parse(data);
        if (parsedData && parsedData.metadata) {
          const { access_token } = parsedData.metadata;
          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${access_token}`;
        }

        if (parsedData && parsedData.payload) {
          const { userinfo } = parsedData.payload;

          setIsLogged(true);
          setUser(userinfo);
        } else {
          setIsLogged(false);
          setUser(null);
        }
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  }, []);

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
