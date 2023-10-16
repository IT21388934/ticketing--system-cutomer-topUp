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

//import theme styles and images
import { COLORS } from "../constant/theme";
import loginAndSignUpStyle from "../styles/loginAndSignUpStyle";
import { loginScreenImage } from "../constant/images";

import { FontAwesome } from "@expo/vector-icons";
import CustomToast from "../components/CustomToast";

// Import axios for making HTTP requests
import axios from "axios";

//import config
import { BASE_URL } from "../constant/config";

// Import AsyncStorage for storing data locally
import AsyncStorage from "@react-native-async-storage/async-storage";

// Import the CredentialsContext for user authentication
import { CredentialsContext } from "../context/CredentialsContext";

// Import Validation for form validation
import * as Validation from "../validations/Validation";

/**
 * * states for store nic and password
 * states for store password visibility
 * states for store message and message type
 * handle password visibility
 *
 * handle submit function
 * persist login
 *
 * Login UI
 *
 * @param {object} navigation - React Navigation object for screen navigation
 * @returns {JSX.Element}
 **/
export default function Login({ navigation }) {
  // States for storing NIC, password, password visibility, and message display
  const [nic, setNic] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // Get user credentials and set them in the context
  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);

  // Toggle visibility of password field
  const handlePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // Handle user login
  const handleSubmit = async () => {
    // Create an object with user input (NIC and password)
    const formData = { nic, password };

    // Validate user input
    const validationResult = Validation.validateLogin(formData);

    if (validationResult.message !== "") {
      // Display a validation error message to the user
      setMessage(validationResult.message);
      setMessageType(validationResult.messageType);
    } else {
      try {
        // Send a POST request to the server for user login
        const response = await axios.post(`${BASE_URL}/api/customers/login`, {
          nic,
          password,
        });

        if (response.data.success) {
          const { data, success, message } = response.data;
          console.log(message);

          // Display a success message to the user
          setMessage("Login successful");
          setMessageType("success");

          // Store user data locally and set them in the context
          const customer = response.data;
          console.log(customer);
          persistLogin(customer);

          // Navigate to the home screen
          // navigation.navigate("Home", { customer: customer });
        } else {
          // Login failed, display the error message
          setMessage("Invalid password or NIC");
          setMessageType("error");
        }
      } catch (error) {
        console.error("Error:", error);

        if (error.response && error.response.status === 401) {
          // Display an error message for invalid NIC or password
          setMessage("Invalid NIC or password");
          setMessageType("error");
        } else {
          // Display a general error message for login failure
          setMessage("Login failed");
        }
      }
    }
  };

  // Persist user login data
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
      <ScrollView contentContainerStyle={loginAndSignUpStyle.scrollView}>
        <View style={loginAndSignUpStyle.container}>
          <ImageBackground
            source={loginScreenImage}
            style={loginAndSignUpStyle.bgImage}
          >
            <View style={loginAndSignUpStyle.loginFormContent}>
              <Text style={loginAndSignUpStyle.title}>Login</Text>

              {/* NIC input field */}
              <View style={loginAndSignUpStyle.inputField}>
                <TextInput
                  style={loginAndSignUpStyle.input}
                  placeholder="NIC"
                  placeholderTextColor={COLORS.darkGray}
                  onChangeText={(text) => setNic(text)}
                  keyboardType="default"
                />
              </View>

              {/* Password input field with show/hide password option */}
              <View style={loginAndSignUpStyle.inputField}>
                <TextInput
                  style={loginAndSignUpStyle.input}
                  placeholder="Password"
                  placeholderTextColor={COLORS.darkGray}
                  onChangeText={(text) => setPassword(text)}
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

              {/* "Forgot Password?" link */}
              <TouchableOpacity style={loginAndSignUpStyle.forgotPassword}>
                <Text style={loginAndSignUpStyle.forgotPasswordText}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>

              {/* "Remember Me" checkbox */}
              <View style={loginAndSignUpStyle.rememberMe}>
                <TouchableOpacity
                  style={loginAndSignUpStyle.checkbox}
                ></TouchableOpacity>
                <Text style={loginAndSignUpStyle.rememberMeText}>
                  Remember Me
                </Text>
              </View>

              {/* Login button */}
              <TouchableOpacity
                style={loginAndSignUpStyle.loginButton}
                onPress={handleSubmit}
              >
                <Text style={loginAndSignUpStyle.loginButtonText}>
                  Login Now
                </Text>
              </TouchableOpacity>

              {/* Display a custom toast message if there is one */}
              {message !== "" && (
                <CustomToast message={message} type={messageType} />
              )}

              {/* "New user? Sign up" link */}
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
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
