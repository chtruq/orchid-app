import React, { useContext } from "react";
import { Redirect, Stack } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";
import Loader from "../../components/Loader";

const AuthLayout = () => {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/home" />;

  return (
    <>
      <Stack>
        <Stack.Screen
          name="sign-in"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="sign-up"
          options={{
            headerShown: false,
          }}
        />
      </Stack>

      <Loader isLoading={loading} />
    </>
  );
};

export default AuthLayout;
