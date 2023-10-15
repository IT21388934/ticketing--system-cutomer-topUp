import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";

//RootStack
import RootStack from "./navigators/RootStack";

//import AsyncStorage
import AsyncStorage from "@react-native-async-storage/async-storage";

//import AppLoading
import AppLoading from "expo-app-loading";

//import credentialsContext
import { CredentialsContext } from "./context/CredentialsContext";

export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [storedCredentials, setStoredCredentials] = useState("");

  const checkLogin = () => {
    AsyncStorage.getItem("customerKey")
      .then((result) => {
        if (result !== null) {
          setStoredCredentials(JSON.parse(result));
        } else {
          setStoredCredentials(null);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (!appReady) {
    return (
      <AppLoading
        startAsync={checkLogin}
        onFinish={() => setAppReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <>
      <CredentialsContext.Provider
        value={{ storedCredentials, setStoredCredentials }}
      >
        <RootStack />
        {/* <StatusBar style="auto" /> */}
      </CredentialsContext.Provider>
    </>
  );
}
