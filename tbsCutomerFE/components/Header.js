import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

//import style and theme
import { COLORS } from "../constant/theme";
import commonStyles from "../styles/commonStyles";

const Header = () => {
  return (
    <View style={commonStyles.header}>
      <Image
        source={require("../assets/images/logo1.png")}
        style={commonStyles.logo}
      />
    </View>
  );
};

export default Header;
