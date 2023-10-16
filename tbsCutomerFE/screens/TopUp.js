import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import axios from "axios";
import Header from "../components/Header";
import CustomToast from "../components/CustomToast";
import { COLORS } from "../constant/theme";
import { FontAwesome } from "@expo/vector-icons";
import { BASE_URL } from "../constant/config";
import commonStyles from "../styles/commonStyles";
import topUpScreenStyles from "../styles/topUpScreenStyles";

/**
 * extract customer data from route params
 * states to manage various inputs and messages
 * function to toggle the credit card input popup
 * function to close the credit card input popup
 * function to handle the top-up process
 * function to handle the payment process
 * function to handle changes in the Expiry input field
 * function to handle changes in the Credit Card Number input field
 *
 * implement UI for the top-up screen
 *
 * @param {*} param0
 * @returns
 */

export default function TopUp({ navigation, route }) {
  // Extract customer data from route params
  const { customer } = route.params;

  // States to manage various inputs and messages
  const [topupAmount, setTopupAmount] = useState("");
  const [balance, setBalance] = useState(customer.balance);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [showCreditCardPopup, setShowCreditCardPopup] = useState(false);
  const [creditCardNumber, setCreditCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCVC] = useState("");

  // Function to toggle the credit card input popup
  const toggleCreditCardPopup = () => {
    if (topupAmount <= 0 || topupAmount === "") {
      alert("Please enter a valid top-up amount");
    } else {
      setShowCreditCardPopup(!showCreditCardPopup);
    }
  };

  // Function to close the credit card input popup
  const handleClosePopup = () => {
    setShowCreditCardPopup(false);
  };

  // Function to handle the top-up process
  async function handleTopup() {
    try {
      var data = {
        increment: topupAmount,
      };
      const response = await axios.post(
        `${BASE_URL}/api/customers/topUp/${customer._id}`,
        data
      );
      const result = response.data;
      const { success, message, newBalance } = result;
      if (success) {
        setBalance(newBalance);
        setMessage(message);
        setMessageType("success");
        setShowCreditCardPopup(false);
        setTopupAmount("");
      } else {
        alert(message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Function to handle the payment process
  const handleProceed = async () => {
    if (creditCardNumber.length === 19) {
      try {
        await handleTopup();
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please enter a valid credit card number");
    }
  };

  // Function to handle changes in the Expiry input field
  const handleExpiryChange = (text) => {
    // Ensure only numbers and "/" are allowed
    if (/^[0-9/]*$/.test(text) && text.length <= 5) {
      // Automatically insert "/" after the second character
      if (text.length === 2 && text.charAt(1) !== "/") {
        text = text.slice(0, 2) + "/" + text.slice(2);
      }
      setExpiry(text);
    }
  };

  // Function to handle changes in the Credit Card Number input field
  const handleCreditCardNumberChange = (text) => {
    // Ensure only numbers and " " are allowed
    if (/^[0-9 ]*$/.test(text) && text.length <= 19) {
      // Automatically insert " " after the 4th, 8th, and 12th characters
      if (text.length === 4 && text.charAt(3) !== " ") {
        text = text.slice(0, 4) + " " + text.slice(4);
      } else if (text.length === 9 && text.charAt(8) !== " ") {
        text = text.slice(0, 9) + " " + text.slice(9);
      } else if (text.length === 14 && text.charAt(13) !== " ") {
        text = text.slice(0, 14) + " " + text.slice(14);
      }
      setCreditCardNumber(text);
    }
  };

  return (
    <>
      <Header />

      <View style={topUpScreenStyles.container}>
        <Text style={commonStyles.headerText}>Top Up</Text>
        <View style={topUpScreenStyles.topUpContainer}>
          <Text style={topUpScreenStyles.balanceText}>
            Current Balance: Rs: {balance}
          </Text>
          <TextInput
            style={topUpScreenStyles.amountInput}
            placeholder="Enter top-up amount"
            value={topupAmount}
            onChangeText={(numeric) => setTopupAmount(numeric)}
            keyboardType="numeric"
          />

          <TouchableOpacity
            style={commonStyles.btn}
            onPress={toggleCreditCardPopup}
          >
            <Text style={commonStyles.btnText}>Top Up</Text>
          </TouchableOpacity>
          <CustomToast message={message} type={messageType} />

          <Modal
            animationType="slide"
            transparent={true}
            visible={showCreditCardPopup}
          >
            <View style={topUpScreenStyles.creditCardPopup}>
              <View style={topUpScreenStyles.popUpContainer}>
                <TouchableOpacity
                  style={topUpScreenStyles.closeBtn}
                  onPress={handleClosePopup}
                >
                  <FontAwesome name="close" size={24} color="white" />
                </TouchableOpacity>
                <View style={topUpScreenStyles.inputContainer}>
                  <View style={topUpScreenStyles.cardInput}>
                    <Text style={topUpScreenStyles.cardLabel}>Card Number</Text>
                    <TextInput
                      style={topUpScreenStyles.input}
                      placeholder="Card Number"
                      value={creditCardNumber}
                      onChangeText={handleCreditCardNumberChange}
                      keyboardType="numeric"
                    />
                  </View>
                  <View style={topUpScreenStyles.cardInput}>
                    <Text style={topUpScreenStyles.cardLabel}>
                      Expiration Date
                    </Text>
                    <TextInput
                      style={topUpScreenStyles.input}
                      placeholder="MM/YY"
                      value={expiry}
                      onChangeText={handleExpiryChange}
                      keyboardType="numeric"
                      maxLength={5}
                    />
                  </View>
                  <View style={topUpScreenStyles.cardInput}>
                    <Text style={topUpScreenStyles.cardLabel}>CVC</Text>
                    <TextInput
                      style={topUpScreenStyles.input}
                      placeholder="CVC"
                      value={cvc}
                      onChangeText={(text) => setCVC(text)}
                      keyboardType="numeric"
                      maxLength={3}
                    />
                  </View>
                </View>
                <TouchableOpacity
                  style={topUpScreenStyles.submitButton}
                  onPress={handleProceed}
                >
                  <Text style={topUpScreenStyles.submitText}>
                    Submit Payment
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </>
  );
}
