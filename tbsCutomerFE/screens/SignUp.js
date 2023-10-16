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
import { COLORS } from "../constant/theme";
import loginAndSignUpStyle from "../styles/loginAndSignUpStyle";
import { FontAwesome } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

// Import axios for making HTTP requests
import axios from "axios";

// Import config
import { BASE_URL } from "../constant/config";

// Import AsyncStorage for storing data locally
import AsyncStorage from "@react-native-async-storage/async-storage";

// Import the CredentialsContext for user authentication
import { CredentialsContext } from "../context/CredentialsContext";

// Import CustomToast for displaying messages to the user
import CustomToast from "../components/CustomToast";

// Import ValidationUtils for form validation
import * as ValidationUtils from "../validations/Validation";

/**
 * States for storing user input
 * and displaying messages to the user
 *
 * password and conformPassword visibility toggles
 * get user information and store them in the context
 *
 * data picker
 * handle changes in the date picker
 * handle user registration
 *
 * @param {object} navigation - React Navigation object for screen navigation
 * @returns {JSX.Element}
 */

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [nic, setNic] = useState("");
  const [conformPassword, setConformPassword] = useState("");
  const [dob, setDob] = useState("");

  const [message, setMessage] = useState(""); // Message to display to the user
  const [messageType, setMessageType] = useState(""); // Type of message (e.g., error, success)

  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Toggle for showing/hiding password
  const [isConformPasswordVisible, setIsConformPasswordVisible] =
    useState(false); // Toggle for showing/hiding confirm password

  // Get user credentials and set them in the context
  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);

  // Toggle visibility of password field
  const handlePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // Toggle visibility of confirm password field
  const handleConformPasswordVisibility = () => {
    setIsConformPasswordVisible(!isConformPasswordVisible);
  };

  // Toggle the date picker
  const [showPicker, setShowPicker] = useState(false);

  // Selected date for the date of birth
  const [selectedDate, setSelectedDate] = useState(new Date()); // Initial date

  // Handle changes in the date picker
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

  // Handle user registration
  const handleSubmit = async () => {
    // Perform validation using the imported functions
    const formData = {
      nic,
      firstName,
      lastName,
      dob,
      email,
      password,
      conformPassword,
    };
    const validationResult = ValidationUtils.validateSignUp(formData);

    if (validationResult.message) {
      // Display an error message to the user
      setMessage(validationResult.message);
      setMessageType(validationResult.messageType);
    } else {
      try {
        // Send a POST request to the server for user registration
        const response = await axios.post(`${BASE_URL}/api/customers/signUp`, {
          firstName,
          lastName,
          nic,
          dob,
          email,
          password,
        });
        if (response.data.success) {
          // Registration was successful
          const customer = response.data;
          console.log(customer);
          console.log("Sign up successful");

          // Store user data locally and set them in the context
          persistSignUp(customer);
        } else {
          // Registration failed
          console.log(response);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Store user data locally and set them in the context
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
      <ScrollView contentContainerStyle={loginAndSignUpStyle.scrollView}>
        <View style={loginAndSignUpStyle.container}>
          <ImageBackground
            source={require("../assets/images/loginbg.png")}
            style={loginAndSignUpStyle.bgImage}
          >
            <View style={loginAndSignUpStyle.formContent}>
              <Text style={loginAndSignUpStyle.title}>Sign Up</Text>

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

              {/* First Name input field */}
              <View style={loginAndSignUpStyle.inputField}>
                <TextInput
                  style={loginAndSignUpStyle.input}
                  placeholder="First Name"
                  placeholderTextColor={COLORS.darkGray}
                  onChangeText={(text) => setFirstName(text)}
                  keyboardType="default"
                />
              </View>

              {/* Last Name input field */}
              <View style={loginAndSignUpStyle.inputField}>
                <TextInput
                  style={loginAndSignUpStyle.input}
                  placeholder="Last Name"
                  placeholderTextColor={COLORS.darkGray}
                  onChangeText={(text) => setLastName(text)}
                  keyboardType="default"
                />
              </View>

              {/* Date of Birth input field with date picker */}
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

              {/* Email input field */}
              <View style={loginAndSignUpStyle.inputField}>
                <TextInput
                  style={loginAndSignUpStyle.input}
                  placeholder="Email Address"
                  placeholderTextColor={COLORS.darkGray}
                  onChangeText={(text) => setEmail(text)}
                  keyboardType="email-address"
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

              {/* Confirm Password input field with show/hide password option */}
              <View style={loginAndSignUpStyle.inputField}>
                <TextInput
                  style={loginAndSignUpStyle.input}
                  placeholder="Confirm Password"
                  placeholderTextColor={COLORS.darkGray}
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

              {/* Sign Up button */}
              <TouchableOpacity
                style={loginAndSignUpStyle.loginButton}
                onPress={handleSubmit}
              >
                <Text style={loginAndSignUpStyle.loginButtonText}>
                  SignUp Now
                </Text>
              </TouchableOpacity>

              {/* Already have an account? Login button */}
              <TouchableOpacity
                style={loginAndSignUpStyle.newUser}
                onPress={() => navigation.navigate("Login")}
              >
                {/* Display a custom toast message if there is one */}
                {message !== "" && (
                  <CustomToast message={message} type={messageType} />
                )}

                <Text style={loginAndSignUpStyle.forgotPasswordText}>
                  Already have an account? Login
                </Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
