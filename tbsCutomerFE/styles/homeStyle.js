import { StyleSheet } from "react-native";

//import theme
import { COLORS } from "../constant/theme";

export default homeStyle = StyleSheet.create({
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
