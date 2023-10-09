import React from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import TransactionCard from "../components/TransactionCard";
import { COLORS } from "../constant/theme";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const Home = () => {
  return (
    <>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require("../assets/images/logo1.png")} // Replace with your logo image
          style={styles.logo}
        />
        <Text style={styles.headerText}>Welcome, Rumesh</Text>
      </View>
      <ScrollView style={styles.container}>
        {/* Wallet Balance */}
        <View style={styles.balanceContainer}>
          {/* <TouchableOpacity style={styles.topUpBtn}>
          <Text style={styles.topUpText}> Top Up</Text>
        </TouchableOpacity> */}
          <Text style={styles.balanceText}>Token Balance :</Text>
          <View style={styles.balanceAmountContainer}>
            <Text style={styles.balanceAmount}>Rs : 10,000.00</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.buttonContainer}>
            <View style={styles.selectedButton}>
              <Ionicons name="home-outline" size={24} color="white" />
            </View>

            <Text style={styles.buttonText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer}>
            <View style={styles.button}>
              <FontAwesome name="user-o" size={25} color="white" />
            </View>
            <Text style={styles.buttonText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer}>
            <View style={styles.button}>
              <FontAwesome name="money" size={25} color="white" />
            </View>
            <Text style={styles.buttonText}>Top Up</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer}>
            <View style={styles.button}>
              <FontAwesome5 name="qrcode" size={25} color="white" />
            </View>
            <Text style={styles.buttonText}>My QR</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Transactions */}
        <View style={styles.transactions}>
          <Text style={styles.transactionsTitle}>Recent Transactions</Text>
          <TransactionCard
            date="Oct 05, 2023"
            description="Received from John Doe"
            amount="Rs: 500.00"
          />
          <TransactionCard
            date="Oct 04, 2023"
            description="Sent to Jane Smith"
            amount="Rs: 200.00"
          />
          <TransactionCard
            date="Oct 05, 2023"
            description="Received from John Doe"
            amount="Rs: 500.00"
          />
          <TransactionCard
            date="Oct 04, 2023"
            description="Sent to Jane Smith"
            amount="Rs: 200.00"
          />
          <TransactionCard
            date="Oct 05, 2023"
            description="Received from John Doe"
            amount="Rs: 500.00"
          />
          <TransactionCard
            date="Oct 04, 2023"
            description="Sent to Jane Smith"
            amount="Rs: 200.00"
          />
          <TransactionCard
            date="Oct 05, 2023"
            description="Received from John Doe"
            amount="Rs: 500.00"
          />
          <TransactionCard
            date="Oct 04, 2023"
            description="Sent to Jane Smith"
            amount="Rs: 200.00"
          />
          <TransactionCard
            date="Oct 05, 2023"
            description="Received from John Doe"
            amount="Rs: 500.00"
          />
          <TransactionCard
            date="Oct 04, 2023"
            description="Sent to Jane Smith"
            amount="Rs: 200.00"
          />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 40,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  logo: {
    width: 100,
    height: 50,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  balanceContainer: {
    position: "relative",
    width: 350,
    height: 120,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    marginTop: 20,
    borderRadius: 10,
    padding: 20,
  },
  balanceText: {
    position: "absolute",
    top: 20,
    left: 20,
    fontSize: 20,
    color: COLORS.white,
  },
  balanceAmount: {
    // position: "absolute",
    color: COLORS.white,
    fontSize: 40,
    fontWeight: "bold",
    marginTop: 30,
  },
  topUpBtn: {
    position: "absolute",
    top: 20,
    right: 20,
    width: 80,
    height: 30,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  topUpText: {
    color: COLORS.secondaryBlue,
    fontWeight: "900",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
    // backgroundColor: "#fff",
    // borderBottomWidth: 1,
    // borderBottomColor: "#ddd",
  },
  buttonContainer: {
    alignItems: "center",
  },
  button: {
    backgroundColor: COLORS.primary,
    // padding: 10,
    width: 60,
    height: 60,
    borderRadius: 50,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  selectedButton: {
    backgroundColor: COLORS.secondaryBlue,
    // padding: 10,
    width: 60,
    height: 60,
    borderRadius: 50,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  buttonText: {
    color: COLORS.secondaryBlue,
    fontSize: 16,
    fontWeight: "bold",
  },
  transactions: {
    padding: 20,
  },
  transactionsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  // Add more styles for transaction items if needed
});

export default Home;
