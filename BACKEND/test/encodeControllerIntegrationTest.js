require("should");
const request = require("supertest");
const mongoose = require("mongoose");

const app = require("../app.js");

const ShortLink = mongoose.model("shortLinks");
const agent = request.agent(app);

describe("Post Test", () => {
  it("should encode a url", (done) => {
    const req = {
      body: {
        url: "http://www.google.ca",
      },
    };
    agent
      .post("/api/encode")
      .send({ req })
      .expect(200)
      .end((err, results) => {
        console.log(results.text);
        //results.body.should.equal("NGUyN2E").done();
        done();
      });
  });

  it("should not work without https://", (done) => {
    const req = {
      body: {
        url: "www.google.ca",
      },
    };
    agent
      .post("/api/encode")
      .send({ req })
      .expect(404)
      .end((err, results) => {
        console.log(results.text);
        //results.body.should.equal("NGUyN2E").done();
        done();
      });
  });

  it("should decode", (done) => {
    const req = {
      body: {
        url: "YTk2OTU",
      },
    };
    agent
      .post("/api/decode")
      .send({ req })
      .expect(200)
      .end((err, results) => {
        console.log(results.text);
        //results.body.should.equal("NGUyN2E").done();
        done();
      });
  });
});
