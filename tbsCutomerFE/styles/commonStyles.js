import { StyleSheet } from "react-native";

//import theme
import { COLORS } from "../constant/theme";

const commonStyles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    // backgroundColor: "#fff",
    // borderBottomWidth: 1,
    // borderBottomColor: "white",
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
    marginLeft: 20,
    color: COLORS.secondaryBlue,
  },
  btn: {
    width: "80%",
    height: 40,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 5,
  },
  btnText: {
    color: COLORS.white,
    fontSize: 16,
  },
});

export default commonStyles;
