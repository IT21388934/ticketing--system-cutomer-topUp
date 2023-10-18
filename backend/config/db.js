const mongoose = require("mongoose");
require("dotenv").config();

class DatabaseConnection {
  constructor() {
    if (!DatabaseConnection.instance) {
      this.connect();
      DatabaseConnection.instance = this;
    }

    return DatabaseConnection.instance;
  }

  async connect() {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("MongoDB connected successfully");
    } catch (error) {
      console.error("MongoDB connection error:", error);
    }
  }
}

const databaseConnection = new DatabaseConnection();

module.exports = databaseConnection;
