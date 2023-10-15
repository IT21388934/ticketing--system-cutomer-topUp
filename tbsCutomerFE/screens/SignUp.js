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
import DateTimePicker from "@react-native-community/datetimepicker";

//import axios
import axios from "axios";

//import AsyncStorage
import AsyncStorage from "@react-native-async-storage/async-storage";

//import credentials context
import { CredentialsContext } from "../context/CredentialsContext";

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [nic, setNic] = useState("");
  const [conformPassword, setConformPassword] = useState("");
  const [dob, setDob] = useState("");

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConformPasswordVisible, setIsConformPasswordVisible] =
    useState(false);

  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);

  const handlePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleConformPasswordVisibility = () => {
    setIsConformPasswordVisible(!isConformPasswordVisible);
  };

  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date()); // Initial date

  const onChange = (event, selectedDate) => {
    if (event.type === "set") {
      // 'set' event occurs when the user selects a date
      setShowPicker(false); // Close the date picker
      if (selectedDate) {
        setSelectedDate(selectedDate); // Update the selected date
        setDob(selectedDate);
      }
    } else if (event.type === "dismissed") {
      // 'dismissed' event occurs when the user cancels the date picker
      setShowPicker(false); // Close the date picker without changes
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://192.168.8.131:3003/api/customers/signUp",
        {
          firstName,
          lastName,
          nic,
          dob,
          email,
          password,
        }
      );
      if (response.data.success) {
        const customer = response.data;
        console.log(customer);
        console.log("Sign up successful");
        // navigation.navigate("Home", { customer: customer });
        persistSignUp(customer);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //signup persist
  const persistSignUp = (customer) => {
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
      <LinearGradient
        colors={[COLORS.primary, COLORS.endGradientBlue]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.9 }}
        style={loginAndSignUpStyle.gradientBackground}
      >
        {/* <ScrollView contentContainerStyle={loginAndSignUpStyle.scrollView}> */}
        <View style={loginAndSignUpStyle.container}>
          <ImageBackground
            source={require("../assets/images/loginbg.png")}
            style={loginAndSignUpStyle.bgImage}
          >
            <View style={loginAndSignUpStyle.formContent}>
              <Text style={loginAndSignUpStyle.title}>Sign Up</Text>

              {/* NIC field is here */}
              <View style={loginAndSignUpStyle.inputField}>
                <TextInput
                  style={loginAndSignUpStyle.input}
                  placeholder="NIC"
                  placeholderTextColor={COLORS.darkGray}
                  onChangeText={(text) => setNic(text)}
                  keyboardType="default"
                />
              </View>

              {/* First name  field is here */}
              <View style={loginAndSignUpStyle.inputField}>
                <TextInput
                  style={loginAndSignUpStyle.input}
                  placeholder="First Name"
                  placeholderTextColor={COLORS.darkGray}
                  onChangeText={(text) => setFirstName(text)}
                  keyboardType="default"
                />
              </View>

              {/* last name field is here */}
              <View style={loginAndSignUpStyle.inputField}>
                <TextInput
                  style={loginAndSignUpStyle.input}
                  placeholder="Last Name"
                  placeholderTextColor={COLORS.darkGray}
                  onChangeText={(text) => setLastName(text)}
                  keyboardType="default"
                />
              </View>

              {/* bod field is here */}
              <View style={loginAndSignUpStyle.inputField}>
                <TextInput
                  style={loginAndSignUpStyle.input}
                  placeholder="Date of Birth"
                  placeholderTextColor={COLORS.darkGray}
                  value={dob ? dob.toISOString().split("T")[0] : ""} // Convert date object to string
                  keyboardType="default"
                  editable={false}
                />
                <View>
                  <FontAwesome
                    name="calendar"
                    size={24}
                    color="black"
                    style={loginAndSignUpStyle.inputFieldIcon}
                    onPress={() => setShowPicker(true)}
                  />
                  {showPicker && (
                    <DateTimePicker
                      value={dob || new Date()} // Set the value prop to selectedDate or a new Date object
                      mode="date"
                      onChange={onChange}
                    />
                  )}
                </View>
              </View>

              {/* Email field is here */}
              <View style={loginAndSignUpStyle.inputField}>
                <TextInput
                  style={loginAndSignUpStyle.input}
                  placeholder="Email Address"
                  placeholderTextColor={COLORS.darkGray}
                  onChangeText={(text) => setEmail(text)}
                  keyboardType="email-address"
                />
              </View>

              {/*  password field is here */}
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

              {/* Conform password field is here */}

              <View style={loginAndSignUpStyle.inputField}>
                <TextInput
                  style={loginAndSignUpStyle.input}
                  placeholder="Conform Password"
                  placeholderTextColor={COLORS.darkGray}
                  // editable={!!values.password}
                  onChangeText={(text) => setConformPassword(text)}
                  secureTextEntry={!isConformPasswordVisible}
                />
                <TouchableOpacity onPress={handleConformPasswordVisibility}>
                  {conformPassword !== "" && (
                    <FontAwesome
                      name={isPasswordVisible ? "eye" : "eye-slash"}
                      size={24}
                      style={loginAndSignUpStyle.inputFieldIcon}
                    />
                  )}
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={loginAndSignUpStyle.loginButton}
                onPress={handleSubmit}
              >
                <Text style={loginAndSignUpStyle.loginButtonText}>
                  SingUp Now
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={loginAndSignUpStyle.newUser}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={loginAndSignUpStyle.forgotPasswordText}>
                  Already have an account? Login
                </Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
        {/* </ScrollView> */}
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}
