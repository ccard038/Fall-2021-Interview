process.env.NODE_ENV = 'test';

var app = require('../BACKEND/server/app.js');
let chai = require('chai');
let chaiHttp = require('chai-http');
var request = require('request');

    
/*
// add ability to remove from db
 chai.use(chaiHttp);
 describe('app', ()=> {
     beforeEach(done) => {
         //
         done();
     });
 });
 */

 
 /*
  * Test the /POST route
  */
 
 chai.use(chaiHttp);
  describe('/POST encode', () => {
      it('it should encode the valid url', (done) => {
          let url = {
              url : "https://reddit.com"
          }
        chai.request(app).keepOpen()
            .post('/encode')
            .send(url)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('json');
              done();
            });
      });
  });

