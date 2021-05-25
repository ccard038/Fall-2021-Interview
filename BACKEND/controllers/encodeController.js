const crypto = require("crypto-js");
const express = require("express");
function encodeController(ShortLinks) {
  function post(req, res) {
    try {
      new URL(req.body.url);
    } catch (_) {
      //return res.status(404);
      return res.status(404).end();
    }

    let shaurl = crypto.SHA1(req.body.url);
    let buffer = Buffer.from(shaurl.toString(), "utf8");
    let encoded = buffer.toString("base64").substring(0, 7);

    ShortLinks.find(encoded, (err, link) => {
      if (err) {
        link = new ShortLinks(encoded, req.body.url);
        link.save();
      }

      return res.json(link);
    });
    return res.json(encoded);
  }
  return { post };
}

module.exports = encodeController;
