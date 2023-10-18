const customerRepository = require("../repositories/CustomerRepository");
const bcrypt = require("bcrypt");

exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await customerRepository.getAllCustomers();
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

exports.getCustomerById = async (req, res) => {
  try {
    const customer = await customerRepository.getCustomerById(req.params.id);
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

exports.updateCustomerById = async (req, res) => {
  try {
    const customer = await customerRepository.updateCustomerById(
      req.params.id,
      req.body
    );
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

exports.deleteCustomerById = async (req, res) => {
  try {
    await customerRepository.deleteCustomerById(req.params.id);
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

exports.signUp = async (req, res) => {
  try {
    const { firstName, lastName, email, password, dob, nic } = req.body;

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

    const existingCustomer = await customerRepository.findCustomerByNIC(nic);

    if (existingCustomer) {
      return res.status(400).json({
        success: false,
        message: "Customer with the same NIC already exists",
      });
    }

    const newCustomerData = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      dob,
      nic,
      balance: 0,
    };

    const savedCustomer = await customerRepository.createCustomer(
      newCustomerData
    );

    res.status(201).json({
      success: true,
      message: "Customer registered successfully",
      customer: savedCustomer,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Registration failed",
      error: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { nic, password } = req.body;

    const customer = await customerRepository.findCustomerByNIC(nic);

    if (!customer) {
      return res.status(401).json({
        success: false,
        message: "Invalid NIC or password",
      });
    }

    const isMatch = await bcrypt.compare(password, customer.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid NIC or password",
      });
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      customer: customer,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
};

exports.topUp = async (req, res) => {
  const customerId = req.params.id;
  const incrementAmount = parseFloat(req.body.increment);

  try {
    const customer = await customerRepository.getCustomerById(customerId);

    if (!customer) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found" });
    }

    const newBalance = customer.balance + incrementAmount;

    await customerRepository.updateCustomerBalance(customerId, newBalance);

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
