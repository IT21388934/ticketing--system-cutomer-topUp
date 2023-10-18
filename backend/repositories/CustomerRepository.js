const Customer = require("../models/customerModel");

class CustomerRepository {
  async getAllCustomers() {
    return Customer.find();
  }

  async getCustomerById(id) {
    return Customer.findById(id);
  }

  async updateCustomerById(id, data) {
    return Customer.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async deleteCustomerById(id) {
    return Customer.findByIdAndDelete(id);
  }

  async createCustomer(customerData) {
    const newCustomer = new Customer(customerData);
    return newCustomer.save();
  }

  async findCustomerByNIC(nic) {
    return Customer.findOne({ nic });
  }

  async updateCustomerBalance(id, newBalance) {
    return Customer.findByIdAndUpdate(id, { balance: newBalance });
  }
}

module.exports = new CustomerRepository();
