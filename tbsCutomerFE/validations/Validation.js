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
