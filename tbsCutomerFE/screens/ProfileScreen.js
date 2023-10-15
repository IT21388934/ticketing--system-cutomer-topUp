import React, { useContext } from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";

//import AsyncStorage
import AsyncStorage from "@react-native-async-storage/async-storage";

//import CredentialsContext
import { CredentialsContext } from "../context/CredentialsContext";

//import styles
import commonStyles from "../styles/commonStyles";

const ProfileScreen = (navigation) => {
  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);
  const { customer } = storedCredentials;

  console.log("profile screen");
  // console.log(user);

  //logout function
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
      <View style={commonStyles.header}>
        <Image
          source={require("../assets/images/logo1.png")}
          style={commonStyles.logo}
        />
      </View>
      <Text style={commonStyles.headerText}>Customer Profile</Text>
      <View style={commonStyles.containerHrCentered}>
        <View style={styles.profileCard}>
          <View style={styles.detailsContainer}>
            <View style={commonStyles.rowContainer_flexStart}>
              <Text style={commonStyles.subtitles}>Name :</Text>
              <Text style={commonStyles.normalText}>
                {customer.firstName} {customer.lastName}{" "}
              </Text>
            </View>
            <View style={commonStyles.rowContainer_flexStart}>
              <Text style={commonStyles.subtitles}>Name :</Text>
              <Text style={commonStyles.normalText}>
                {customer.firstName} {customer.lastName}{" "}
              </Text>
            </View>
            <View style={commonStyles.rowContainer_flexStart}>
              <Text style={commonStyles.subtitles}>Name :</Text>
              <Text style={commonStyles.normalText}>
                {customer.firstName} {customer.lastName}{" "}
              </Text>
            </View>
            <View style={commonStyles.rowContainer_flexStart}>
              <Text style={commonStyles.subtitles}>Name :</Text>
              <Text style={commonStyles.normalText}>
                {customer.firstName} {customer.lastName}{" "}
              </Text>
            </View>
          </View>
        </View>
        <Button title="Log Out" onPress={clearLogin} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  detailsContainer: {
    margin: 20,
  },
});

export default ProfileScreen;
