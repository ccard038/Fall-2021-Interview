const express = require("express");
const encodeController = require("../controllers/encodeController");
const decodeController = require("../controllers/decodeController");

function routes(ShortLinks) {
  const encodeRouter = express.Router();
  const controller = encodeController(ShortLinks);

  encodeRouter.route("/encode").post((req, res) => {
    try {
      new URL(req.body.url);
    } catch (_) {
      res.sendStatus(404).end();
      return;
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
    /*
  if (!savedLinks.has(encoded)) {
    savedLinks.set(encoded, req.body.url);
  }
  */

    return res.json(encoded);
    //res.status(200).send(encoded).end();
  });

  encodeRouter.route("/decode").post((req, res) => {
    let decoded = null;
    if (req.body.url) {
      //decoded = savedLinks.get(req.body.url);
      decoded = ShortLinks.find(encoded, (err, link) => {
        if (err) {
          return null;
        }
        return link;
      });
    }

    if (decoded) {
      //res.status(200).send(decoded);
      res.status(200).json(decoded);
    } else {
      return res.sendStatus(404).end();
    }
  });

  return encodeRouter;
}

module.exports = routes;
