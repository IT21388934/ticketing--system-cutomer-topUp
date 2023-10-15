import React, { useState, useContext } from "react";
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
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../constant/theme";
import loginAndSignUpStyle from "../styles/loginAndSignUpStyle";
import { FontAwesome } from "@expo/vector-icons";
import CustomToast from "../components/CustomToast";

//import axios
import axios from "axios";

//import AsyncStorage
import AsyncStorage from "@react-native-async-storage/async-storage";

//import credentials context
import { CredentialsContext } from "../context/CredentialsContext";

//import Validation
import * as Validation from "../validations/Validation";

export default function Login({ navigation }) {
  const [nic, setNic] = useState("");
  const [password, setPassword] = useState("");

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);

  const handlePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSubmit = async () => {
    const formData = { nic, password };

    const ValidationResult = Validation.validateLogin(formData);

    if (ValidationResult.message !== "") {
      setMessage(ValidationResult.message);
      setMessageType(ValidationResult.messageType);
    } else {
      try {
        const response = await axios.post(
          "http://192.168.8.131:3003/api/customers/login",
          {
            nic,
            password,
          }
        );

        if (response.data.success) {
          const { data, success, message } = response.data;
          console.log(message);
          // Login successful
          setMessage("Login successful");
          setMessageType("success");
          console.log(response.data.customer);
          const customer = response.data;
          console.log(customer);
          persistLogin(customer);

          // navigation.navigate("Home", { customer: customer });
        } else {
          // Login failed, display the error message
          setMessage("Invalid password or NIC");
          setMessageType("error");
        }
      } catch (error) {
        console.error("Error:", error);

        if (error.response && error.response.status === 401) {
          setMessage("Invalid nic or password");
          setMessageType("error");
        } else {
          setMessage("Login failed");
        }
      }
    }
  };

  //persist login
  const persistLogin = (customer) => {
    AsyncStorage.setItem("customerKey", JSON.stringify(customer))
      .then(() => {
        console.log("Login credentials stored");
        setStoredCredentials(customer);
      })
      .catch((error) => {
        console.log(error);
        setMessage("Persisting login failed");
        setMessageType("error");
      });
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {/* <LinearGradient
        colors={[COLORS.primary, COLORS.endGradientBlue]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.9 }}
        style={loginAndSignUpStyle.gradientBackground}
      > */}
      <ScrollView contentContainerStyle={loginAndSignUpStyle.scrollView}>
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
        {/* </LinearGradient> */}
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
