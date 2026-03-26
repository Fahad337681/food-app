const express = require("express");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDb = require("./config/db");

// dotenv config
dotenv.config();

// Database Connection
connectDb();

// creating rest object
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// ROUTES 
app.use("/api/v1/test", require("./routes/testRoutes"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/user", require('./routes/userRoutes'));
app.use("/api/v1/restaurant", require('./routes/restaurantRoutes'));
app.use("/api/v1/category",require('./routes/categoryRoutes'))
app.use("/api/v1/food",require('./routes/foodRoutes'))

// home route
app.get("/", (req, res) => {
  return res
    .status(200)
    .send("<h1> Welcome to Food Server APP API BASE PROJECT </h1>");
});

// PORT
const PORT = process.env.PORT || 5000;

// Listen
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`.bgMagenta.white);
});