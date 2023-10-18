const app = require("express")();
require("dotenv").config();

const cors = require("cors");

app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.json());

module.exports = app;

require("./config/db");

// Customer routes
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

const customerRoutes = require("./routes/customerRoutes");
app.use("/api/customers", customerRoutes);

// app.listen(process.env.PORT, () => {
//   console.log("Server listening on port ", process.env.PORT);
// });

const hostname = "192.168.8.131";
const port = "3003";
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
