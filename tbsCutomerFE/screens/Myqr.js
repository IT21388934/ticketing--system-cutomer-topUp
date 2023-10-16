import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

//import sceens and components
import CustomerQRCode from "../components/CustomeQRCode";
import Header from "../components/Header";

//import styles and themw
import commonStyles from "../styles/commonStyles";
import { COLORS } from "../constant/theme";

/**
 * extract customer data from route params
 * implement UI for the My QR screen
 *
 * @param {*} param0
 * @returns
 */
export default function Myqr({ navigation, route }) {
  const { customer } = route.params;
  console.log(customer);

  const customerID = customer._id;

  return (
    <>
      <Header />
      <View style={commonStyles.centeredContainer}>
        <Text style={commonStyles.headerText}>My QR Code</Text>
        <CustomerQRCode customerID={customerID} />
      </View>
    </>
  );
}
