const express = require("express");
const bodyParser = require("body-parser");
const crypto = require("crypto-js");
const mongoose = require("mongoose");

//var mongodb = mongoose.connect("mongodb://127.0.0.1/shortendlinks");

mongoose.connect("mongodb://127.0.0.1/shortendlinks", {
  useNewUrlParser: true,
});

//const db = mongoose.connection;
//db.on("error", console.error.bind(console, "MongoDB connection error:"));

const app = express();
const port = 8081;

const ShortLinks = require("./models/ShortLinks");
const encodeRouter = require("./routes/encodeRouter")(ShortLinks);

let savedLinks = new Map();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Simple url encoding API");
});

app.use("/api/", encodeRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
