const crypto = require("crypto-js");
function decodeController(ShortLinks, savedLinks) {
  function post(req, res) {
    let decoded = null;
    if (req.body.url) {
      //query not working some replacing for now
      /*
      let query = ShortLinks.findOne({ encoded: req.body.url });
      query
        .exec()
        .then(function (decoded) {
          return res.status(200).json(decoded.url);
        })
        .catch(function (err) {
          return res.sendStatus(404);
        });
        */
      decoded = savedLinks.get(req.body.url);
    }
    if (decoded) {
      res.status(200);
      res.json(decoded);
    } else {
      res.status(404);
      res.send();
      return;
    }
  }
  return { post };
}

module.exports = decodeController;
