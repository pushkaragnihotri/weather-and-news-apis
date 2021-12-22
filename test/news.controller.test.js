/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-var */
const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const app = require('../server');
const config = require('../common/config/env.config');

var should = chai.should();
chai.use(chaiHttp);

const loginCredentials = { email: 'johndoe@mail.com', password: 'p@ssw0rd' };

describe('News Controller APIs Tests', () => {
  describe('GET /news', () => {
    it('it should NOT FETCH news for an unlogged-in user and return statusCode 401', (done) => {
      chai
        .request(app)
        .get('/news')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('Unauthorized');
          res.body.should.have.property('message').eql('No Access token found');
          done();
        });
    });
    it('it should FETCH news for a logged-in user and return statusCode 200', (done) => {
      const payload = { email: loginCredentials.email };
      const secret = config.jwtSecret;
      const expiresIn = config.jwtExpirationInSeconds;
      const token = jwt.sign(payload, secret, { expiresIn });
      chai
        .request(app)
        .get('/news')
        .set('Cookie', `accessToken=${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('OK');
          done();
        });
    });
    it('it should FETCH news for a logged-in user (with query params) and return statusCode 200', (done) => {
      const payload = { email: loginCredentials.email };
      const secret = config.jwtSecret;
      const expiresIn = config.jwtExpirationInSeconds;
      const token = jwt.sign(payload, secret, { expiresIn });
      chai
        .request(app)
        .get('/news?search=javascript')
        .set('Cookie', `accessToken=${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('OK');
          done();
        });
    });
  });
});
