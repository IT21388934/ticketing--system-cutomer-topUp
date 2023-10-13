import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CustomToast = ({ message, type }) => {
  let backgroundColor;

  // Define different background colors for different types
  switch (type) {
    case "success":
      backgroundColor = "green";
      break;
    case "warning":
      backgroundColor = "orange";
      break;
    case "error":
      backgroundColor = "red";
      break;
    default:
      backgroundColor = "transparent";
      break;
  }

  return (
    <View style={[styles.toast, { backgroundColor }]}>
      <Text style={styles.toastText}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  toast: {
    padding: 10,
    borderRadius: 5,
    marginTop: 25,
  },
  toastText: {
    color: "white", // You can customize the text color here
  },
});

export default CustomToast;
