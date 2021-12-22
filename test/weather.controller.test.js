/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-var */
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');

var should = chai.should();
chai.use(chaiHttp);

describe('Weather Controller APIs Tests', () => {
  describe('GET /weather', () => {
    it('it SHOULD RETURN weather forecast without query params and return statusCode 200', (done) => {
      chai
        .request(app)
        .get('/weather')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('OK');
          done();
        });
    });
    it('it SHOULD RETURN weather forecast with query params and return statusCode 200', (done) => {
      chai
        .request(app)
        .get('/weather?unit=metric')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('OK');
          done();
        });
    });
  });
});
