import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import Login from "../screens/Login";

describe("Login Component", () => {
  it("should update the NIC input field", () => {
    const { getByPlaceholderText } = render(<Login />);
    const nicInput = getByPlaceholderText("NIC");

    // Simulate user input by changing the value of the input field
    fireEvent.changeText(nicInput, "test-nic-value");

    // Verify if the input value has been updated
    expect(nicInput.props.value).toBe("test-nic-value");
  });

  it("should update the password input field", () => {
    const { getByPlaceholderText } = render(<Login />);
    const passwordInput = getByPlaceholderText("Password");

    // Simulate user input by changing the value of the input field
    fireEvent.changeText(passwordInput, "test-password-value");

    // Verify if the input value has been updated
    expect(passwordInput.props.value).toBe("test-password-value");
  });
});
