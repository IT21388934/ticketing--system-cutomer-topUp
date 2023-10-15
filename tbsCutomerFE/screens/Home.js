import React, { useEffect, useState, useContext } from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import axios from "axios";

//import screens
import JourneyCard from "../components/JourneyCard";

//import theme
import { COLORS } from "../constant/theme";

//import icons
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

//import styles
import commonStyles from "../styles/commonStyles";

//import AsyncStorage
import AsyncStorage from "@react-native-async-storage/async-storage";

//import CredentialsContext
import { CredentialsContext } from "../context/CredentialsContext";

const Home = ({ navigation }) => {
  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);
  const { customer } = storedCredentials;

  console.log(customer);

  const [data, setData] = useState([]);

  async function fetchData() {
    try {
      const response = await axios({
        url: "http://192.168.8.131:3003/api/customers/" + customer._id,
        method: "GET",
        header: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const result = response.data;
      // console.log(result);
      const { success, data } = result;
      if (success) {
        console.log(data.customer);
        console.log("feched data");
        setData(data.customer);
      } else {
        // console.log("Error fetching data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    const fetchDataOnMount = async () => {
      await fetchData(); // Fetch data when the component mounts
    };
    fetchDataOnMount();
    console.log(customer);
  }, []);

  const clearLogin = () => {
    AsyncStorage.removeItem("customerKey")
      .then(() => {
        setStoredCredentials("");
        console.log("Logout");
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      {/* Header */}
      <View style={commonStyles.header}>
        <Image
          source={require("../assets/images/logo1.png")} // Replace with your logo image
          style={commonStyles.logo}
        />
      </View>
      <ScrollView style={styles.container}>
        <View style={commonStyles.rowContainer_SpaceBetween}>
          <Text style={commonStyles.headerText}>Welcome, {data.firstName}</Text>
          <TouchableOpacity onPress={clearLogin} style={{ marginRight: 20 }}>
            <AntDesign name="logout" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* Wallet Balance */}
        <View style={styles.balanceContainer}>
          <TouchableOpacity
            style={styles.topUpBtn}
            onPress={() => navigation.navigate("TopUp", { customer: data })}
          >
            <Text style={styles.topUpText}> Top Up</Text>
          </TouchableOpacity>
          <Text style={styles.balanceText}>Token Balance :</Text>
          <View style={styles.balanceAmountContainer}>
            <Text style={styles.balanceAmount}>
              Rs:
              {data.balance ? data.balance.toFixed(2) : 0.0}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.refreshIcon}
            onPress={() => fetchData()}
          >
            <Ionicons name="refresh" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.buttonContainer}>
            <View style={styles.selectedButton}>
              <Ionicons name="home-outline" size={24} color="white" />
            </View>

            <Text style={styles.buttonText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            // onPress={() =>
            //   // navigation.navigate("ProfileScreen", { customer: data })
            // }
          >
            <View style={styles.button}>
              <FontAwesome name="user-o" size={25} color="white" />
            </View>
            <Text style={styles.buttonText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer}>
            <View style={styles.button}>
              <MaterialIcons name="history" size={24} color="white" />
            </View>
            <Text style={styles.buttonText}>My Journeys</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => navigation.navigate("Myqr", { customer: data })}
          >
            <View style={styles.button}>
              <FontAwesome5 name="qrcode" size={25} color="white" />
            </View>
            <Text style={styles.buttonText}>My QR</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Journeys */}
        <View style={styles.journeys}>
          <Text style={styles.transactionsTitle}>Recent Journeys</Text>
          <JourneyCard
            date="Oct 05, 2023"
            start="Colombo"
            end="Galle"
            amount="Rs: 500.00"
          />
          <JourneyCard
            date="Oct 05, 2023"
            start="Nugegoda"
            end="Kurunegala"
            amount="Rs: 500.00"
          />
          <JourneyCard
            date="Oct 05, 2023"
            start="Malabe"
            end="Kaduwela"
            amount="Rs: 80.00"
          />
          <JourneyCard
            date="Oct 05, 2023"
            start="Colombo"
            end="Galle"
            amount="Rs: 500.00"
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

  balanceContainer: {
    position: "relative",
    width: 350,
    height: 150,
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
  },
  buttonContainer: {
    // alignItems: "center",
    flex: 1,
    justifyContent: "center",
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
    fontSize: 13,
    fontWeight: "bold",
    flexWrap: "wrap",
    textAlign: "center",
  },
  journeys: {
    padding: 20,
  },
  transactionsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  topUpBtn: {
    position: "absolute",
    top: 20,
    right: 20,
    width: 80,
    height: 30,
    backgroundColor: COLORS.lightBlue,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  topUpText: {
    color: COLORS.white,
    fontWeight: "900",
  },

  refreshIcon: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});

export default Home;
