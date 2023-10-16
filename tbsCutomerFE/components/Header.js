import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

//import style, images and theme
import { COLORS } from "../constant/theme";
import commonStyles from "../styles/commonStyles";
import { logoImage } from "../constant/images";

const Header = () => {
  return (
    <View style={commonStyles.header}>
      <Image source={logoImage} style={commonStyles.logo} />
    </View>
  );
};

export default Header;
