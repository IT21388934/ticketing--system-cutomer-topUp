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
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../constant/theme";
import loginAndSignUpStyle from "../styles/loginAndSignUpStyle";
import { FontAwesome } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

import axios from "axios";

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

  async function handleSubmit() {
    var data = {
      firstName: values.firstName,
      lastName: values.lastName,
      dob: values.dob,
      nic: values.nic,
      email: values.email,
      password: values.password,
    };

    await axios({
      url: "http://192.168.8.131:3003/api/customers/signUp",
      method: "POST",
      data: data,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        // handle success
        const { success } = response.data;
        if (success) {
          console.log(response.data.customer);
          const { customer } = response.data;
          navigation.navigate("Home", { customer: customer });
        } else {
          console.log(response.data);
          alert(response.data.message);
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        console.log("async error");
      });
  }

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
