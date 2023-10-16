import React, { useEffect, useState, useContext } from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

//import axios for making HTTP requests
import axios from "axios";

//import config
import { BASE_URL } from "../constant/config";

//import screens and components
import JourneyCard from "../components/JourneyCard";
import Header from "../components/Header";

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
import homeStyle from "../styles/homeStyle";

//import AsyncStorage
import AsyncStorage from "@react-native-async-storage/async-storage";

//import CredentialsContext
import { CredentialsContext } from "../context/CredentialsContext";

/**
 * Declare constants for storing customer data and setting customer data
 * Declare state for storing customer data
 * Declare function for fetching data from the database
 * Declare function for logout
 *
 * Implement UI for the home screen
 *
 */

const Home = ({ navigation }) => {
  //Constants
  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);
  const { customer } = storedCredentials;

  const [data, setData] = useState([]);

  //Fetch data from the database
  async function fetchData() {
    try {
      const response = await axios({
        url: `${BASE_URL}/api/customers/` + customer._id,
        method: "GET",
        header: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const result = response.data;
      const { success, data } = result;

      //success fetching data
      if (success) {
        console.log(data.customer);
        console.log("feched data");
        setData(data.customer);
      }
      //error fetching data
      else {
        console.log("Error fetching data");
      }
    } catch (error) {
      //axios error
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

  //Logout Function
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
      <Header />

      <ScrollView style={homeStyle.container}>
        {/* Wallet Balance */}
        <View style={commonStyles.rowContainer_SpaceBetween}>
          <Text style={commonStyles.headerText}>Welcome, {data.firstName}</Text>
          <TouchableOpacity onPress={clearLogin} style={{ marginRight: 20 }}>
            <AntDesign name="logout" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={homeStyle.balanceContainer}>
          <TouchableOpacity
            style={homeStyle.topUpBtn}
            onPress={() => navigation.navigate("TopUp", { customer: data })}
          >
            <Text style={homeStyle.topUpText}> Top Up</Text>
          </TouchableOpacity>
          <Text style={homeStyle.balanceText}>Token Balance :</Text>
          <View style={homeStyle.balanceAmountContainer}>
            <Text style={homeStyle.balanceAmount}>
              Rs:
              {data.balance ? data.balance.toFixed(2) : 0.0}
            </Text>
          </View>
          <TouchableOpacity
            style={homeStyle.refreshIcon}
            onPress={() => fetchData()}
          >
            <Ionicons name="refresh" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        <View style={homeStyle.actionButtons}>
          <TouchableOpacity style={homeStyle.buttonContainer}>
            <View style={homeStyle.selectedButton}>
              <Ionicons name="home-outline" size={24} color="white" />
            </View>

            <Text style={homeStyle.buttonText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={homeStyle.buttonContainer}
            // onPress={() =>
            //   // navigation.navigate("ProfileScreen", { customer: data })
            // }
          >
            <View style={homeStyle.button}>
              <FontAwesome name="user-o" size={25} color="white" />
            </View>
            <Text style={homeStyle.buttonText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={homeStyle.buttonContainer}>
            <View style={homeStyle.button}>
              <MaterialIcons name="history" size={24} color="white" />
            </View>
            <Text style={homeStyle.buttonText}>My Journeys</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={homeStyle.buttonContainer}
            onPress={() => navigation.navigate("Myqr", { customer: data })}
          >
            <View style={homeStyle.button}>
              <FontAwesome5 name="qrcode" size={25} color="white" />
            </View>
            <Text style={homeStyle.buttonText}>My QR</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Journeys */}
        <View style={homeStyle.journeys}>
          <Text style={homeStyle.transactionsTitle}>Recent Journeys</Text>
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

export default Home;
