const crypto = require("crypto-js");
function decodeController(ShortLinks) {
  function post(req, res) {
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
  }

  //used when a encoded string is send as a get, used like https://www.localhost/dfdf3dgf to redirect like bitly.
  function get(req, res) {
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
  }
  return { post, get };
}

module.exports = decodeController;
