// __tests__/api.test.js
const request = require("supertest");
const app = require("../server"); // Import your Express app or API

const mongoose = require("mongoose");
require("dotenv").config();

const Customer = require("../models/customerModel"); // Import the Customer model

const bcrypt = require("bcrypt");

// Define beforeAll and afterAll hooks to manage the MongoDB connection.
beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("MongoDB connected successfully");
});

afterAll(async () => {
  await mongoose.connection.close();
});

// Define the test suite for the Customer Controller
describe("Get all customers", () => {
  // Test the getAllCustomers route
  it("should get all customers", async () => {
    const response = await request(app).get("/api/customers");
    expect(response.status).toBe(200);
  });
});
//customer sign up test

describe("Customer Controller - signUp", () => {
  it("should successfully register a new customer", async () => {
    // Define the test customer data
    const testCustomer = {
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@example.com",
      password: "testpassword",
      dob: "1990-01-01",
      nic: "123456789V",
    };

    // Send a POST request to the signUp route
    const response = await request(app)
      .post("/api/customers/signUp")
      .send(testCustomer);

    // Assertions
    expect(response.status).toBe(201); // Check if the response status is 201 (Created)
    expect(response.body.success).toBe(true); // Check if the success property is true
    expect(response.body.message).toBe("Customer registered successfully"); // Check the success message

    // Check if the customer is saved in the database
    const savedCustomer = await Customer.findOne({
      email: testCustomer.email,
    });
    expect(savedCustomer).not.toBeNull();
  });

  it("should return an error if a customer with the same NIC already exists", async () => {
    // Define a test customer with the same NIC
    const existingCustomer = {
      firstName: "Alice",
      lastName: "Smith",
      email: "alicesmith@example.com",
      password: "testpassword",
      dob: "1985-05-05",
      nic: "123456789V", // Same NIC as in the previous test
    };

    // Send a POST request to the signUp route with the existing NIC
    const response = await request(app)
      .post("/api/customers/signUp")
      .send(existingCustomer);

    // Assertions
    expect(response.status).toBe(400); // Check if the response status is 400 (Bad Request)
    expect(response.body.success).toBe(false); // Check if the success property is false
  });
});

// Define the test suite for the Login Controller
describe("Customer Controller - login", () => {
  it("should successfully log in a customer with valid credentials", async () => {
    // Create a test customer with a known NIC and password
    const testCustomer = {
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@example.com",
      password: "testpassword", // This password matches the hashed password
      dob: "1990-01-01",
      nic: "123456789V",
    };

    // Register the test customer in the database
    await request(app).post("/api/customers/signUp").send(testCustomer);

    // Log in the test customer with the known NIC and password
    const loginRequest = {
      nic: "123456789V", // NIC matches the test customer's NIC
      password: "testpassword", // Password matches the hashed password
    };

    // Send a POST request to the login route
    const response = await request(app)
      .post("/api/customers/login")
      .send(loginRequest);

    // Assertions
    expect(response.status).toBe(200); // Check if the response status is 200 (OK)
    expect(response.body.success).toBe(true); // Check if the success property is true
    expect(response.body.message).toBe("Login successful"); // Check the success message
    expect(response.body.customer).toBeDefined(); // Check if the customer data is defined

    // Clean up: Delete the test customer from the database
    await Customer.findOneAndDelete({ nic: "123456789V" });
  });

  it("should handle login failure with invalid credentials", async () => {
    // Attempt to log in with incorrect NIC and password
    const loginRequest = {
      nic: "invalidnic",
      password: "invalidpassword",
    };

    // Send a POST request to the login route with invalid credentials
    const response = await request(app)
      .post("/api/customers/login")
      .send(loginRequest);

    // Assertions
    expect(response.status).toBe(401); // Check if the response status is 401 (Unauthorized)
    expect(response.body.success).toBe(false); // Check if the success property is false
    expect(response.body.message).toBe("Invalid NIC or password"); // Check the error message
  });
});
