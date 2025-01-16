const express = require("express");
const app = express();
const cors = require("cors");
const port = 7000;
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const bookRoute = require("./routes/bookRoutes");

// Database connection
mongoose.connect("mongodb://127.0.0.1:27017/bookmanagement").then(() => {
  console.log("DB Connected!!!");
});

// Allow all origins with CORS
app.use(cors());

// Body parser middleware
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

// Routes
const UserRoute = require("./routes/UserRoute");
app.use("/books", bookRoute);
app.use("/user", UserRoute);

// Default route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
