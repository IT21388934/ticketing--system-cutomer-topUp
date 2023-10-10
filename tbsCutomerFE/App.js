import React from "react";
import { StatusBar } from "expo-status-bar";

//RootStack
import RootStack from "./navigators/RootStack";

export default function App() {
  return (
    <>
      <RootStack />
      {/* <StatusBar style="auto" /> */}
    </>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
