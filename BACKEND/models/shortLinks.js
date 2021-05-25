const mongoose = require("mongoose");

const { Schema } = mongoose;

const ShortLinksModel = new Schema({
  encoded: { type: String },
  url: { type: String },
});

module.exports = mongoose.model("shortLinks", ShortLinksModel);
