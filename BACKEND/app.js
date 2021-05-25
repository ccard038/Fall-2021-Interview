const express = require("express");
const bodyParser = require("body-parser");
const crypto = require("crypto-js");
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/shortendlinks", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function () {
  console.log("Connection Successful!");
});

const app = express();
const port = 8081;

var savedLinks = new Map();
const ShortLinks = require("./models/ShortLinks");
const encodeRouter = require("./routes/encodeRouter")(ShortLinks, savedLinks);

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Simple url encoding API");
});

app.use("/api/", encodeRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;
