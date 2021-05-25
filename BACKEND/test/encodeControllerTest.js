const encodeController = require("../controllers/encodeController");
const should = require("should");
const sinon = require("sinon");

describe("Encode Controller Tests: ", () => {
  describe("Post", () => {
    it("Should do...", () => {
      const ShortLinks = function (shortlink) {
        this.save = () => {};
        this.findOne = () => {};
      };

      let savedLinks = new Map();
      const req = {
        body: {
          url: "https://www.google.com",
        },
      };

      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy(),
      };

      const controller = encodeController(ShortLinks, savedLinks);
      controller.post(req, res);
      res.status.calledWith(200).should.equal(true, "good status 200");
    });

    it("Should not do...", () => {
      const ShortLinks = function (shortlink) {
        this.save = () => {};
        this.findOne = () => {};
      };

      let savedLinks = new Map();
      const req = {
        body: {
          url: "www.google.com",
        },
      };

      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy(),
      };

      const controller = encodeController(ShortLinks, savedLinks);
      controller.post(req, res);
      res.status.calledWith(404).should.equal(true, "bad 404");
    });

    it("Should not do...", () => {
      const ShortLinks = function (shortlink) {
        this.save = () => {};
        this.findOne = () => {};
      };

      let savedLinks = new Map();
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

      const controller = encodeController(ShortLinks, savedLinks);
      controller.post(req, res);
      res.status.calledWith(404).should.equal(true, "bad 404");
    });
    it("Should not do...", () => {
      const ShortLinks = function (shortlink) {
        this.save = () => {};
        this.findOne = () => {};
      };

      let savedLinks = new Map();
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

      const controller = encodeController(ShortLinks, savedLinks);
      controller.post(req, res);
      res.status.calledWith(404).should.equal(true, "bad 404");
    });

    it("Should not do...", () => {
      const ShortLinks = function (shortlink) {
        this.save = () => {};
        this.findOne = () => {};
      };

      let savedLinks = new Map();
      const req = {
        body: {
          url: null,
        },
      };

      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy(),
      };

      const controller = encodeController(ShortLinks, savedLinks);
      controller.post(req, res);
      res.status.calledWith(404).should.equal(true, "bad 404");
    });
  });
});
