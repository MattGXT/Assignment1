var assert = require("assert");
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);
channel  = { 'name': 'a' }
user = {'username': 'super'}


describe('Get a single channel', () => {
    it('it should return a channel', (done) => {
        chai.request('http://localhost:3000').post('/api/getachannel').send(channel)
            .end((err, res) => {
                should.not.exist(err);
                res.body[0].should.have.property('name');
                res.body[0].should.have.property('members');
                res.body[0].should.have.property('group');
                res.body[0].should.have.property('history');
                done();
            });
    });

    it('it should return status 400', (done) => {
        chai.request('http://localhost:3000').post('/api/getachannel')
            .end((err, res) => {
                should.not.exist(err);
                assert.equal(res.status,400);
                done();
            });
    });
});

describe('Get all channels', () => {
    it('should respond with all channels', (done) => {
      chai.request('http://localhost:3000')
      .get('/api/getchannel')
      .end((err, res) => {
        should.not.exist(err);
        res.body.should.be.a('array');
        done();
      });
    });
    it('The return data should have 4 basic attributes',(done) =>{
        chai.request('http://localhost:3000')
      .get('/api/getchannel')
      .end((err, res) => {
        should.not.exist(err);
        res.body[0].should.have.property('name');
        res.body[0].should.have.property('group');
        res.body[0].should.have.property('members');
        res.body[0].should.have.property('history');
        done();
      });
    })
});

describe('Get group of user', () => {
    it('should return group of user', (done) => {
      chai.request('http://localhost:3000')
      .post('/api/getgroup').send(user)
      .end((err, res) => {
        should.not.exist(err);
        res.body.should.be.a('array');
        done();
      });
    });
    it('The return data should have 4 basic attributes',(done) =>{
        chai.request('http://localhost:3000')
      .post('/api/getgroup').send(user)
      .end((err, res) => {
        should.not.exist(err);
        res.body[0].should.have.property('name');
        res.body[0].should.have.property('members');
        res.body[0].should.have.property('channels');
        res.body[0].should.have.property('assis');
        done();
      });
    })
  });

  describe('Get all users', () => {
    it('should respond with all channels', (done) => {
      chai.request('http://localhost:3000')
      .get('/api/getuser')
      .end((err, res) => {
        should.not.exist(err);
        res.body.should.be.a('array');
        done();
      });
    });
    it('The return data should have 7 basic attributes',(done) =>{
        chai.request('http://localhost:3000')
      .get('/api/getuser')
      .end((err, res) => {
        should.not.exist(err);
        res.body[0].should.have.property('name');
        res.body[0].should.have.property('super');
        res.body[0].should.have.property('admin');
        res.body[0].should.have.property('email');
        res.body[0].should.have.property('grouplist');
        res.body[0].should.have.property('admingrouplist');
        res.body[0].should.have.property('password');
        done();
      });
    })
});





