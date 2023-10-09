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

export default function Login() {
  const [values, setValues] = useState({ email: "", password: "" });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handlePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSubmit = () => {
    // Implement your form submission logic here
    // For example, you can send a request to your server with the form data
    // You can access the form values from the 'values' state (values.email and values.password)
    console.log("Form Submitted!");
    console.log("Email:", values.email);
    console.log("Password:", values.password);
  };

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
                  placeholder="Email Address"
                  placeholderTextColor={COLORS.darkGray}
                  onChangeText={(text) => setValues({ ...values, email: text })}
                  value={values.email}
                  keyboardType="email-address"
                />
              </View>
              <View style={loginAndSignUpStyle.inputField}>
                <TextInput
                  style={loginAndSignUpStyle.input}
                  placeholder="Password"
                  placeholderTextColor={COLORS.darkGray}
                  onChangeText={(text) =>
                    setValues({ ...values, password: text })
                  }
                  value={values.password}
                  secureTextEntry={!isPasswordVisible}
                />
                <TouchableOpacity onPress={handlePasswordVisibility}>
                  {values.password !== "" && (
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
              <TouchableOpacity style={loginAndSignUpStyle.newUser}>
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
