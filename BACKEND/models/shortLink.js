const mongoose = require("mogoose");

const { Schema } = mongoose;

const shortLinkModel = new Schema({
  encoded: { type: String },
  url: { type: String },
});

module.exports = mongoose.model("shortLink", shortLinkModel);
