import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import Home from "../screens/Home";
import TopUp from "../screens/TopUp";
import Myqr from "../screens/Myqr";
import ProfileScreen from "../screens/ProfileScreen";

import COLORS from "../constant/theme";

//import CredentialsContext
import { CredentialsContext } from "../context/CredentialsContext";

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <CredentialsContext.Consumer>
      {({ storedCredentials }) => (
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: "transparent",
              },
              headerTintColor: "black",
              headerTransparent: true,
              headerTitle: "",
              HeaderLeftContainerStyle: {
                paddingLeft: 20,
              },
            }}
            initialRouteName="Login"
          >
            {storedCredentials ? (
              <Stack.Screen name="Home" component={Home} />
            ) : (
              <>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen
                  options={{
                    headerTintColor: "white",
                    headerTransparent: true,
                  }}
                  name="SignUp"
                  component={SignUp}
                />
              </>
            )}

            <Stack.Screen name="TopUp" component={TopUp} />
            <Stack.Screen name="Myqr" component={Myqr} />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </CredentialsContext.Consumer>
  );
};

export default RootStack;
