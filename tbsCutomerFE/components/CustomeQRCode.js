import React from "react";
import { View, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";

const CustomerQRCode = ({ customerID }) => {
  const qrCodeData = `CustomerID: ${customerID}`;

  return (
    <View style={styles.container}>
      <QRCode value={qrCodeData} size={300} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CustomerQRCode;
