require("dotenv").config();
const mongoose = require("mongoose");
const helmet = require("helmet");
const compression = require("compression");
//establish connection to database
mongoose.connect(
  process.env.MONGODB_URI,
  {
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    server: {
      socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 },
    },
    replset: {
      socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 },
    },
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

app.use(helmet());
app.use(express.json()); // parses incoming requests with JSON payloads
app.use("/", routes); //to use the routes
app.route("/").get(function (req, res) {
  res.sendFile(process.cwd() + "/index.html");
});
app.use("/uploads", express.static("./uploads"));
app.use(compression()); //Compress all routes

// our listener asks our server to listen for a request
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("App is listening on port " + listener.address().port);
});
