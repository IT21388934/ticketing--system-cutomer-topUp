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
  ScrollView, // Import ScrollView from react-native
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../constant/theme";
import loginAndSignUpStyle from "../global/loginAndSignUpStyle";
import { FontAwesome } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function SignUp({ navigation }) {
  const [values, setValues] = useState({
    email: "",
    password: "",
    lastName: "",
    firstName: "",
    nic: "",
    conformPassword: "",
    dob: "",
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handlePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const [isConformPasswordVisible, setIsConformPasswordVisible] =
    useState(false);

  const handleConformPasswordVisibility = () => {
    setIsConformPasswordVisible(!isConformPasswordVisible);
  };

  const handleSubmit = () => {
    // Implement your form submission logic here
    // For example, you can send a request to your server with the form data
    // You can access the form values from the 'values' state (values.email and values.password)
    console.log("Form Submitted!");
    console.log("Email:", values.email);
    console.log("Password:", values.password);
    console.log("First Name:", values.firstName);
    console.log("Last Name:", values.lastName);
    console.log("NIC:", values.nic);
    console.log("DOB:", values.dob);

    navigation.navigate("Home");
  };

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toLocaleDateString();
      setValues({ ...values, dob: formattedDate });
    }
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
                  onChangeText={(text) => setValues({ ...values, nic: text })}
                  value={values.nic}
                  keyboardType="default"
                />
              </View>

              {/* First name  field is here */}
              <View style={loginAndSignUpStyle.inputField}>
                <TextInput
                  style={loginAndSignUpStyle.input}
                  placeholder="First Name"
                  placeholderTextColor={COLORS.darkGray}
                  onChangeText={(text) =>
                    setValues({ ...values, firstName: text })
                  }
                  value={values.firstName}
                  keyboardType="default"
                />
              </View>

              {/* last name field is here */}
              <View style={loginAndSignUpStyle.inputField}>
                <TextInput
                  style={loginAndSignUpStyle.input}
                  placeholder="Last Name"
                  placeholderTextColor={COLORS.darkGray}
                  onChangeText={(text) =>
                    setValues({ ...values, lastName: text })
                  }
                  value={values.lastName}
                  keyboardType="default"
                />
              </View>

              {/* bod field is here */}
              <View style={loginAndSignUpStyle.inputField}>
                <TextInput
                  style={loginAndSignUpStyle.input}
                  placeholder="Date of Birth"
                  placeholderTextColor={COLORS.darkGray}
                  value={values.dob || ""}
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
                      value={date}
                      mode="date" // or "time" for time picker
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
                  onChangeText={(text) => setValues({ ...values, email: text })}
                  value={values.email}
                  keyboardType="email-address"
                />
              </View>

              {/*  password field is here */}
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

              {/* Conform password field is here */}

              <View style={loginAndSignUpStyle.inputField}>
                <TextInput
                  style={loginAndSignUpStyle.input}
                  placeholder="Conform Password"
                  placeholderTextColor={COLORS.darkGray}
                  // editable={!!values.password}
                  onChangeText={(text) =>
                    setValues({ ...values, conformPassword: text })
                  }
                  value={values.conformPassword}
                  secureTextEntry={!isConformPasswordVisible}
                />
                <TouchableOpacity onPress={handleConformPasswordVisibility}>
                  {values.conformPassword !== "" && (
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
