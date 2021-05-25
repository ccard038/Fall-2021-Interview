const decodeController = require("../controllers/decodeController");
const should = require("should");
const sinon = require("sinon");

describe("Decode Controller Tests: ", () => {
  describe("Post", () => {
    it("Should do...", () => {
      const ShortLinks = function (shortlink) {
        this.save = () => {};
        this.findOne = () => {};
      };

      let savedLinks = new Map();
      savedLinks.set("encoding", "https://www.google.com");

      const req = {
        body: {
          url: "encoding",
        },
      };

      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy(),
      };

      const controller = decodeController(ShortLinks, savedLinks);
      controller.post(req, res);
      res.status.calledWith(200).should.equal(true, "good status 200");
    });

    it("Should not do...", () => {
      const ShortLinks = function (shortlink) {
        this.save = () => {};
        this.findOne = () => {};
      };

      let savedLinks = new Map();
      savedLinks.set("notcorrectencoding", "https://www.google.com");

      const req = {
        body: {
          url: "encoding",
        },
      };

      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy(),
      };

      const controller = decodeController(ShortLinks, savedLinks);
      controller.post(req, res);
      res.status.calledWith(404).should.equal(true, "bad 404");
    });

    it("Should not do...", () => {
      const ShortLinks = function (shortlink) {
        this.save = () => {};
        this.findOne = () => {};
      };

      let savedLinks = new Map();
      savedLinks.set("encoding", "https://www.google.com");

      const req = {
        body: {
          url: "",
        },
      };

      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy(),
      };

      const controller = decodeController(ShortLinks, savedLinks);
      controller.post(req, res);
      res.status.calledWith(404).should.equal(true, "bad 404");
    });
    it("Should not do...", () => {
      const ShortLinks = function (shortlink) {
        this.save = () => {};
        this.findOne = () => {};
      };

      let savedLinks = new Map();
      savedLinks.set("NGUyN2E", "https://www.google.ca");

      const req = {
        body: {
          url: "NGUyN2E",
        },
      };

      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy(),
      };

      const controller = decodeController(ShortLinks, savedLinks);
      controller.post(req, res);
      res.status.calledWith(200).should.equal(true, "ok 200");
    });
  });
});
