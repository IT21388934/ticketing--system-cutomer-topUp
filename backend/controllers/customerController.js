const Customer = require("../models/customerModel");
const bcrypt = require("bcrypt");

// Get all customers
exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json({
      status: "success",
      results: customers.length,
      data: {
        customers,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// Get a single customer by ID
exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    res.status(200).json({
      success: true,
      data: {
        customer,
      },
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err,
    });
  }
};

// Update an existing customer by ID
exports.updateCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      data: {
        customer,
      },
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err,
    });
  }
};

// Delete a customer by ID
exports.deleteCustomerById = async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.status(204).json({
      success: true,
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err,
    });
  }
};

// Create a new customer registration route
exports.signUp = async (req, res) => {
  try {
    // Extract customer information from the request body
    const { firstName, lastName, email, password, dob, nic } = req.body;

    // // Hash the password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error hashing password",
        error: error.message,
      });
      return;
    }

    // Create a new customer document
    const newCustomer = new Customer({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      dob,
      nic,
      balance: 0,
    });

    // Save the customer to the database
    const savedCustomer = await newCustomer.save();

    // Respond with a success message and the saved customer data
    res.status(201).json({
      success: true,
      message: "Customer registered successfully",
      customer: savedCustomer,
    });
  } catch (error) {
    // Handle registration errors, such as duplicate emails
    res.status(400).json({
      success: false,
      message: "Registration failed",
      error: error.message,
    });
  }
};

//login
// const Customer = require("../models/customerModel");
// const bcrypt = require("bcryptjs");

// Login a customer
exports.login = async (req, res) => {
  try {
    // Extract email and password from the request body
    const { nic, password } = req.body;

    // Find the customer with the given email
    const customer = await Customer.findOne({ nic });

    // If the customer is not found, respond with an error message
    if (!customer) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Compare the password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, customer.password);

    // If the password does not match, respond with an error message
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // If the email and password are correct, respond with a success message and the customer data
    res.status(200).json({
      success: true,
      message: "Login successful",
      customer: customer,
    });
  } catch (error) {
    // Handle login errors
    res.status(400).json({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
};

//topUp

exports.topUp = async (req, res) => {
  const customerId = req.params.id; // Get the customer ID from the route parameter
  const incrementAmount = parseFloat(req.body.increment); // Parse the increment value from the request body

  try {
    // Find the customer by their ID
    const customer = await Customer.findById(customerId);

    if (!customer) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found" });
    }

    // Calculate the new balance
    const newBalance = customer.balance + incrementAmount;

    // Update the customer's balance
    await Customer.findByIdAndUpdate(customerId, { balance: newBalance });

    return res.json({
      success: true,
      message: "Balance increased successfully",
      newBalance,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "An error occurred while increasing the balance",
    });
  }
};
