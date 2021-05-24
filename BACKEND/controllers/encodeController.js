function encodeController(ShortLinks) {
  function post(req, res) {
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
  }
}

module.exports = encodeController;
