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

//import axios
import axios from "axios";

//import  styles
import commonStyles from "../styles/commonStyles";
import topUpScreenStyles from "../styles/topUpScreenStyles";

//import toast
import CustomToast from "../components/CustomToast";

//import theme
import { COLORS } from "../constant/theme";

//import fonts
import { FontAwesome } from "@expo/vector-icons";

/**
 * TopUp screen
 * state for store topup amount and balance of the customer
 * state for store message and message type
 *  state for store credit card details
 * state for store show credit card popup
 *
 * handle popup
 * handle close popup
 *
 * handle topup function
 *
 * TopUp UI
 *
 * @param {*} navigation
 * @param {*} param0
 * @returns
 */

export default function TopUp({ navigation, route }) {
  //set customer object
  const { customer } = route.params;

  //set constants
  const [topupAmount, setTopupAmount] = useState("");
  const [balance, setBalance] = useState(customer.balance);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const [showCreditCardPopup, setShowCreditCardPopup] = useState(false);
  const [creditCardNumber, setCreditCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCVC] = useState("");

  const toggleCreditCardPopup = () => {
    if (topupAmount <= 0 || topupAmount == "") {
      alert("Please enter a valid top-up amount");
    } else {
      setShowCreditCardPopup(!showCreditCardPopup);
    }
  };

  const handleClosePopup = () => {
    setShowCreditCardPopup(false);
  };

  async function handleTopup() {
    try {
      var data = {
        increment: topupAmount,
      };
      const response = await axios.post(
        `http://192.168.8.131:3003/api/customers/topUp/${customer._id}`,
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

  const handleProceed = async () => {
    if (creditCardNumber.length == 16) {
      try {
        await handleTopup();
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please enter a valid credit card number");
    }
  };

  return (
    <>
      <View style={commonStyles.header}>
        <Image
          source={require("../assets/images/logo1.png")}
          style={commonStyles.logo}
        />
      </View>
      <View style={topUpScreenStyles.container}>
        <Text style={commonStyles.headerText}>Top Up </Text>
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
            <Text style={commonStyles.btnText}> TopUp </Text>
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
                      onChangeText={(text) => setCreditCardNumber(text)}
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
                      onChangeText={(text) => setExpiry(text)}
                      keyboardType="numeric"
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
