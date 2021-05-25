const express = require("express");
const encodeController = require("../controllers/encodeController");
const decodeController = require("../controllers/decodeController");

function routes(ShortLinks) {
  const encodeRouter = express.Router();

  const controller = encodeController(ShortLinks);
  const controllerDecode = decodeController(ShortLinks);

  encodeRouter.route("/encode").post(controller.post);

  encodeRouter.route("/decode").post(controllerDecode.post);

  encodeRouter.route("/*").post(controllerDecode.get);

  return encodeRouter;
}

module.exports = routes;
