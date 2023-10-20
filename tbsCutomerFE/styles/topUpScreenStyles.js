import { StyleSheet } from "react-native";

//import theme
import { COLORS } from "../constant/theme";

const topUpScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  topUpContainer: {
    flex: 1,
    padding: 40,
    alignContent: "center",
  },
  balanceText: {
    fontSize: 24,
    marginBottom: 20,
    alignSelf: "center",
  },
  input: {
    width: "80%",
    height: 40,
    backgroundColor: "#ECF1F8",
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    padding: 5,
    alignSelf: "center",
    color: COLORS.primary,
  },
  amountInput: {
    width: "80%",
    height: 40,
    borderColor: COLORS.secondaryBlue,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    padding: 5,
    alignSelf: "center",
    color: COLORS.black,
  },
  ProceedBtn: {
    width: "80%",
    height: 40,
    backgroundColor: COLORS.secondaryBlue,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 5,
  },
  btnText: {
    color: COLORS.white,
    fontSize: 16,
  },
  creditCardPopup: {
    // flex: 1,
    width: "100%",
    // backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "flex-end",
    position: "absolute",
    bottom: 0,
    borderRadius: 10,
    // paddingBottom: 20,
  },

  inputContainer: {
    backgroundColor: COLORS.white,
    padding: 20,
    // height: "100%",
    borderRadius: 10,
  },
  cardInput: {
    marginBottom: 10,
  },
  cardLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: COLORS.black,
    marginBottom: 10,
  },

  submitButton: {
    backgroundColor: COLORS.primary,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  submitText: {
    color: "white",
    fontSize: 18,
  },
  popUpContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
  },
  closeBtn: {
    alignSelf: "flex-end",
    margin: 10,
  },
});

export default topUpScreenStyles;
