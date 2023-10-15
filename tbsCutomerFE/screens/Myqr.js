import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import CustomerQRCode from "../components/CustomeQRCode";

//import styles
import commonStyles from "../styles/commonStyles";
import { COLORS } from "../constant/theme";

export default function Myqr({ navigation, route }) {
  const { customer } = route.params;
  console.log(customer);

  const customerID = "12555";

  return (
    <>
      <View style={commonStyles.header}>
        <Image
          source={require("../assets/images/logo1.png")}
          style={commonStyles.logo}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.headerText}>Customer QR Code</Text>
        <CustomerQRCode customerID={customerID} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.secondaryBlue,
  },
});
