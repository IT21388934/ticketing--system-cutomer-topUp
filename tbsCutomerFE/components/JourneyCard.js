import React from "react";
import { View, Text, StyleSheet } from "react-native";

const TransactionCard = ({ date, start, end, amount }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.amount}>{amount}</Text>
      </View>
      <View style={styles.description}>
        <Text style={styles.descriptionText}>From : {start}</Text>
        <Text style={styles.descriptionText}>To : {end}</Text>
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
  },
  descriptionText: {
    marginTop: 10,
    fontSize: 14,
    // fontWeight: "bold",
    marginRight: 10,
  },
});

export default TransactionCard;
