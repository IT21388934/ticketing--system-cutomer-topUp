const app = require("express")();
require("dotenv").config();

const cors = require("cors");
const corsOptions = {
  origin: "192.168.8.13:3003",
};

// app.use(cors(corsOptions));
app.use(cors());
// app.use(express.json({ limit: "1mb" }));

// app.use(express.urlencoded({ extended: true }));
const bodyParser = require("body-parser");
app.use(bodyParser.json());

require("./config/db");

// Customer routes
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

const customerRoutes = require("./routes/customerRoutes");
app.use("/api/customers", customerRoutes);

// const accountRoutes = require("./routes/accountRoutes");
// app.use("/api/accounts", accountRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server listening on port ", process.env.PORT);
});

const hostname = "192.168.8.131";
const port = "3003";
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
