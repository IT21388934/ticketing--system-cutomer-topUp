export function validateEmail(email) {
  const emailRegex = /\S+@\S+\.\S+/; // A simple email regex pattern
  return emailRegex.test(email);
}

export const validateSignUp = (formData) => {
  const { nic, firstName, lastName, dob, email, password, conformPassword } =
    formData;

  if (
    !nic ||
    !firstName ||
    !lastName ||
    !dob ||
    !email ||
    !password ||
    !conformPassword
  ) {
    return {
      message: "Please fill in all the required fields",
      messageType: "error",
    };
  } else if (password !== conformPassword) {
    return {
      message: "Password and conform password do not match",
      messageType: "error",
    };
  } else if (nic.length !== 10) {
    return {
      message: "NIC must be 10 characters",
      messageType: "error",
    };
  } else if (password.length < 6) {
    return {
      message: "Password must be at least 6 characters",
      messageType: "error",
    };
  } else if (email.indexOf("@") === -1) {
    return {
      message: "Please enter a valid email address",
      messageType: "error",
    };
  } else {
    return { message: "", messageType: "" }; // Validation successful
  }
};

export const validateLogin = (formData) => {
  const { nic, password } = formData;

  if (!nic || !password) {
    return {
      message: "Please fill in all the required fields",
      messageType: "error",
    };
  }

  return { message: "", messageType: "" }; // Validation successful
};

export const paymentInputValidation = (formData) => {
  const { cardNumber, cvc, expiryDate, amount } = formData;

  if (!cardNumber || !cvc || !expiryDate || !amount) {
    return {
      message: "Please fill in all the required fields",
      messageType: "error",
    };
  } else if (cardNumber.length !== 16) {
    return {
      message: "Card number must be 16 characters",
      messageType: "error",
    };
  } else if (cvc.length !== 3) {
    return {
      message: "CVC must be 3 characters",
      messageType: "error",
    };
  } else if (expiryDate.length !== 5) {
    return {
      message: "Expiry date must be 5 characters",
      messageType: "error",
    };
  } else if (amount < 0) {
    return {
      message: "Minimum amount is Rs.100",
      messageType: "error",
    };
  } else {
    return { message: "", messageType: "" }; // Validation successful
  }
};
