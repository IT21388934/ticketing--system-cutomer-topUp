import React from "react";
import { View, Text, StyleSheet } from "react-native";

//import icon
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

//import styles
import commonStyles from "../styles/commonStyles";

const TransactionCard = ({ date, start, end, amount }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.amount}>{amount}</Text>
      </View>
      <View style={commonStyles.rowContainer_flexStart}>
        <View style={commonStyles.rowContainer_SpaceBetween}>
          <MaterialIcons name="location-history" size={14} color="black" />
          <Text style={styles.descriptionText}>From : {start}</Text>
        </View>
        <Text>. . . . . . . . . . </Text>
        <View style={commonStyles.rowContainer_SpaceBetween}>
          <Ionicons name="location" size={14} color="black" />
          <Text style={styles.descriptionText}>To : {end}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  date: {
    fontSize: 14,
    fontWeight: "bold",
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007BFF",
  },
  description: {
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  descriptionText: {
    marginTop: 10,
    fontSize: 14,
    // fontWeight: "bold",
    marginRight: 10,
    marginLeft: 10,
  },
});

export default TransactionCard;
