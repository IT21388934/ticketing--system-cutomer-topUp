import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import Home from "./screens/Home";

export default function App() {
  return (
    <>
      <Login />
      {/* <SignUp /> */}
      {/* <Home /> */}
      <StatusBar style="auto" />
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
