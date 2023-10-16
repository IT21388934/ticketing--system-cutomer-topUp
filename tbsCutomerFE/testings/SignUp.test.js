import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import SignUp from "../screens/SignUp"; // Adjust the path accordingly

describe("SignUp Component", () => {
  it("Renders the SignUp form", () => {
    const { getByText, getByPlaceholderText } = render(<SignUp />);

    // Ensure that the required elements are present on the form
    expect(getByText("Sign Up")).toBeTruthy();
    expect(getByPlaceholderText("NIC")).toBeTruthy();
    expect(getByPlaceholderText("First Name")).toBeTruthy();
    expect(getByPlaceholderText("Last Name")).toBeTruthy();
    expect(getByPlaceholderText("Date of Birth")).toBeTruthy();
    expect(getByPlaceholderText("Email Address")).toBeTruthy();
    expect(getByPlaceholderText("Password")).toBeTruthy();
    expect(getByPlaceholderText("Confirm Password")).toBeTruthy();
    expect(getByText("SignUp Now")).toBeTruthy();
  });

  it("Toggles password visibility", () => {
    const { getByPlaceholderText, getByTestId } = render(<SignUp />);

    const passwordInput = getByPlaceholderText("Password");
    const passwordToggle = getByTestId("password-toggle");

    expect(passwordInput.props.secureTextEntry).toBe(true);

    fireEvent.press(passwordToggle);

    expect(passwordInput.props.secureTextEntry).toBe(false);

    fireEvent.press(passwordToggle);

    expect(passwordInput.props.secureTextEntry).toBe(true);
  });

  it("Fills and submits the form", () => {
    const { getByPlaceholderText, getByText } = render(<SignUp />);

    // Fill out the form
    fireEvent.changeText(getByPlaceholderText("NIC"), "12345678X");
    fireEvent.changeText(getByPlaceholderText("First Name"), "John");
    fireEvent.changeText(getByPlaceholderText("Last Name"), "Doe");
    fireEvent.changeText(getByPlaceholderText("Date of Birth"), "01/01/1990");
    fireEvent.changeText(
      getByPlaceholderText("Email Address"),
      "johndoe@example.com"
    );
    fireEvent.changeText(getByPlaceholderText("Password"), "password123");
    fireEvent.changeText(
      getByPlaceholderText("Confirm Password"),
      "password123"
    );

    // Submit the form
    fireEvent.press(getByText("SignUp Now"));

    // Assert that the form has been submitted successfully (e.g., you could check for a success message or a navigation event)
    // For example, expect(getByText("Registration successful")).toBeTruthy();
  });
});
