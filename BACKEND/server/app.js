const express = require("express");
const bodyParser = require("body-parser");
const crypto = require("crypto-js");
const mongoose = require("mongoose");
//const { response } = require("express");
const db = mongoose.connect("mongodb://localhost/shortendlinks");

const app = express();
const port = 8081;

const ShortLinks = require("./models/shortLink");
const encodeRouter = require("./routes/encodeRouter")(ShortLinks);

let savedLinks = new Map();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Simple url encoding API");
});

app.use("/api/", encodeRouter);

/*
app.post("/encode", (req, res) => {
  try {
    new URL(req.body.url);
  } catch (_) {
    res.sendStatus(404).end();
    return;
  }

  let shaurl = crypto.SHA1(req.body.url);
  let buffer = Buffer.from(shaurl.toString(), "utf8");
  let encoded = buffer.toString("base64").substring(0, 7);

  if (!savedLinks.has(encoded)) {
    savedLinks.set(encoded, req.body.url);
  }
  //res.json!!
  res.status(200).send(encoded).end();
});

app.post("/decode", (req, res) => {
  if (req.body.url) {
    let decoded = savedLinks.get(req.body.url);
  }
  if (decoded) {
    res.status(200).send(decoded);
  } else {
    res.sendStatus(404).end();
    return;
  }
});

*/

app.get("/*", (req, res) => {
  var decoded = null;
  if (!req.params[0]) {
    res.sendStatus(404).end();
    return;
  } else if (savedLinks.has(req.params[0])) {
    decoded = savedLinks.get(req.params[0]);
  } else if (!(decoded.includes("http://") || decoded.includes("https://"))) {
    decoded = "https://" + decoded;
  }

  res.setTimeout(5000);
  res.redirect(decoded);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
