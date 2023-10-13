import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  Button,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../constant/theme";
import loginAndSignUpStyle from "../global/loginAndSignUpStyle";
import { FontAwesome } from "@expo/vector-icons";
import CustomToast from "../components/CustomToast";

//API Clients
import axios from "axios";

export default function Login({ navigation }) {
  // const [values, setValues] = useState({ nic: "", password: "" });
  const [nic, setNic] = useState("");
  const [password, setPassword] = useState("");

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // const showToast = (message) => {
  //   ToastAndroid.show(message, ToastAndroid.SHORT);
  // };

  const handlePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // const handleSubmit = () => {
  //   console.log("Form Submitted!");
  //   const data = {
  //     nic: nic,
  //     password: password,
  //   };
  //   const url = "http://localhost:3000/api/customers/login";
  //   axios
  //     .post(url, data)
  //     .then((res) => {
  //       const result = res.data;
  //       const { status, message, data } = result;

  //       if (status !== "SUCCESS") {
  //         setMessage(message);
  //         setMessageType("error");

  //         return;
  //       } else {
  //         navigation.navigate("Home");
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err.JSON);
  //       setMessage(
  //         "An error occurred. Please check your network and try again later."
  //       );
  //       setMessageType("error");
  //     });
  //   // const data = {
  //   //   nic: nic,
  //   //   password: password,
  //   // };
  //   // console.log(data);
  // };
  async function handleSubmit() {
    var data = {
      nic: nic,
      password: password,
    };

    await axios({
      url: "http://192.168.8.131:3003/api/customers/login",
      method: "POST",
      data: data,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        // handle success
        console.log(response.data);
        setNic("");
        setPassword("");

        const { message, data, success } = response.data;
        if (success) {
          navigation.navigate("Home");
        } else {
          setMessage(message);
          setMessageType("error");
        }

        // Alert.alert("added");
      })
      .catch(function (error, response) {
        // handle error
        console.log(error);
        console.log(response);
        // if (response === undefined) {
        //   setMessage("Nic or password Incorrect");
        // }
        setMessage("Nic or Password Incorrect");
      });
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LinearGradient
        colors={[COLORS.primary, COLORS.endGradientBlue]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.9 }}
        style={loginAndSignUpStyle.gradientBackground}
      >
        <View style={loginAndSignUpStyle.container}>
          <ImageBackground
            source={require("../assets/images/loginbg.png")}
            style={loginAndSignUpStyle.bgImage}
          >
            <View style={loginAndSignUpStyle.loginFormContent}>
              <Text style={loginAndSignUpStyle.title}>Login</Text>
              <View style={loginAndSignUpStyle.inputField}>
                <TextInput
                  style={loginAndSignUpStyle.input}
                  placeholder="NIC"
                  placeholderTextColor={COLORS.darkGray}
                  onChangeText={(text) => setNic(text)}
                  // value={values.nic}
                  // onChangeText={onChangeNic(value)} // add this line
                  keyboardType="default"
                />
              </View>
              <View style={loginAndSignUpStyle.inputField}>
                <TextInput
                  style={loginAndSignUpStyle.input}
                  placeholder="Password"
                  placeholderTextColor={COLORS.darkGray}
                  onChangeText={(text) => setPassword(text)}
                  // onChangeText={onChangePassword(value)}
                  // value={values.password}
                  secureTextEntry={!isPasswordVisible}
                />
                <TouchableOpacity onPress={handlePasswordVisibility}>
                  {password !== "" && (
                    <FontAwesome
                      name={isPasswordVisible ? "eye" : "eye-slash"}
                      size={24}
                      style={loginAndSignUpStyle.inputFieldIcon}
                    />
                  )}
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={loginAndSignUpStyle.forgotPassword}>
                <Text style={loginAndSignUpStyle.forgotPasswordText}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
              <View style={loginAndSignUpStyle.rememberMe}>
                <TouchableOpacity
                  style={loginAndSignUpStyle.checkbox}
                ></TouchableOpacity>
                <Text style={loginAndSignUpStyle.rememberMeText}>
                  Remember Me
                </Text>
              </View>
              <TouchableOpacity
                style={loginAndSignUpStyle.loginButton}
                onPress={handleSubmit}
              >
                <Text style={loginAndSignUpStyle.loginButtonText}>
                  Login Now
                </Text>
              </TouchableOpacity>
              {message !== "" && (
                <CustomToast message={message} type={messageType} />
              )}

              <TouchableOpacity
                style={loginAndSignUpStyle.newUser}
                onPress={() => navigation.navigate("SignUp")}
              >
                <Text style={loginAndSignUpStyle.forgotPasswordText}>
                  New user? Sign up
                </Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}
