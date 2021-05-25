const crypto = require("crypto-js");
const express = require("express");
function encodeController(ShortLinks, savedLinks) {
  function post(req, res) {
    try {
      new URL(req.body.url);
    } catch (_) {
      res.status(404);
      return res.send();
    }
    let url = req.body.url;
    let shaurl = crypto.SHA1(req.body.url);
    let buffer = Buffer.from(shaurl.toString(), "utf8");
    let encoded = buffer.toString("base64").substring(0, 7);

    //query not working
    /*
    let query = ShortLinks.findOne({ url: url });
    query
      .exec()
      .then(function (urlA) {
        if (urlA !== req.body.url) {
          let link = new ShortLinks({ encoded: encoded, url: urlA });
          link.save(function (err, doc) {
            if (err) {
              return console.error(err);
            }
            console.log("Document inserted succussfully!");
          });
        }
        return;
      })
      .catch(function (err) {
        return;
      });
      */

    //using map instead for functionality for now
    if (!savedLinks.has(encoded)) {
      savedLinks.set(encoded, req.body.url);
    }
    res.status(200);
    return res.json(encoded);
  }
  return { post };
}

module.exports = encodeController;
