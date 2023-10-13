// const Account = require("../models/account");

// exports.getAllAccounts = async (req, res) => {
//   try {
//     const accounts = await Account.find();
//     res.status(200).json({
//       status: "success",
//       results: accounts.length,
//       data: {
//         accounts,
//       },
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: "fail",
//       message: err,
//     });
//   }
// };

// exports.getAccountByCustomerId = async (req, res) => {
//   try {
//     const account = await Account.findOne({
//       customerID: req.params.id,
//     });
//     res.status(200).json({
//       status: "success",
//       data: {
//         account,
//       },
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: "fail",
//       message: err,
//     });
//   }
// };

// exports.createAccount = async (req, res) => {
//   try {
//     const newAccount = await Account.create(req.body);
//     res.status(201).json({
//       status: "success",
//       data: {
//         account: newAccount,
//       },
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: "fail",
//       message: err,
//     });
//   }
// };

// exports.updateAccountByID = async (req, res) => {
//   try {
//     const account = await Account.findByIdAndUpdate(req, params.id, req.body, {
//       new: true,
//       runValidators: true,
//     });
//     res.status(200).json({
//       status: "success",
//       data: {
//         account,
//       },
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: "fail",
//       message: err,
//     });
//   }
// };
// exports.topUpBalance = async (req, res) => {
//   const { amountToIncrease } = req.body; // Assuming the amount to increase is sent in the request body

//   try {
//     const account = await Account.findOne({
//       customerID: req.params.id,
//     });

//     if (!account) {
//       return res.status(404).json({ message: "Account not found" });
//     }

//     account.balance += amountToIncrease;
//     await account.save();

//     return res.status(200).json({
//       message: "Balance increased successfully",
//       newBalance: account.balance,
//     });
//   } catch (err) {
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

// //get accountID by customerID
// exports.getAccountIDByCustomerID = async (req, res) => {
//   try {
//     const account = await Account.findOne({
//       customerID: req.params.id,
//     });
//     res.status(200).json({
//       status: "success",
//       data: {
//         accountID: account._id,
//       },
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: "fail",
//       message: "Account not found",
//     });
//   }
// };
