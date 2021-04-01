require("dotenv").config();

//import mongoose
const mongoose = require("mongoose");

//establish connection to database
mongoose.connect(
  process.env.MONGODB_URI,
  {
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) return console.log("Error: ", err);
    console.log(
      "MongoDB Connection -- Ready state is:",
      mongoose.connection.readyState
    );
  }
);

// 1. create an Express app
const express = require("express");
const routes = require("./routes/tea"); // import the routes

const app = express();

app.use(express.json()); // parses incoming requests with JSON payloads
app.use("/", routes); //to use the routes
app.use("/uploads", express.static("./uploads"));

// our listener asks our server to listen for a request
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("App is listening on port " + listener.address().port);
});
