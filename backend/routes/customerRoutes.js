const express = require("express");
const router = express.Router();

// Import the customer controller
const customerController = require("../controllers/customerController");

// Define the customer routes
router.get("/", customerController.getAllCustomers);
router.get("/:id", customerController.getCustomerById);
// router.post("/", customerController.createCustomer);
router.put("/:id", customerController.updateCustomerById);
router.delete("/:id", customerController.deleteCustomerById);
router.post("/signUp", customerController.signUp);
router.post("/login", customerController.login);
router.post("/topUp/:id", customerController.topUp);
module.exports = router;
