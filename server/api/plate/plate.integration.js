'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newPlate;

describe('Plate API:', function() {
  describe('GET /api/plates', function() {
    var plates;

    beforeEach(function(done) {
      request(app)
        .get('/api/plates')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          plates = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      plates.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/plates', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/plates')
        .send({
          name: 'New Plate',
          info: 'This is the brand new plate!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newPlate = res.body;
          done();
        });
    });

    it('should respond with the newly created plate', function() {
      newPlate.name.should.equal('New Plate');
      newPlate.info.should.equal('This is the brand new plate!!!');
    });
  });

  describe('GET /api/plates/:id', function() {
    var plate;

    beforeEach(function(done) {
      request(app)
        .get(`/api/plates/${newPlate._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          plate = res.body;
          done();
        });
    });

    afterEach(function() {
      plate = {};
    });

    it('should respond with the requested plate', function() {
      plate.name.should.equal('New Plate');
      plate.info.should.equal('This is the brand new plate!!!');
    });
  });

  describe('PUT /api/plates/:id', function() {
    var updatedPlate;

    beforeEach(function(done) {
      request(app)
        .put(`/api/plates/${newPlate._id}`)
        .send({
          name: 'Updated Plate',
          info: 'This is the updated plate!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedPlate = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedPlate = {};
    });

    it('should respond with the updated plate', function() {
      updatedPlate.name.should.equal('Updated Plate');
      updatedPlate.info.should.equal('This is the updated plate!!!');
    });

    it('should respond with the updated plate on a subsequent GET', function(done) {
      request(app)
        .get(`/api/plates/${newPlate._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let plate = res.body;

          plate.name.should.equal('Updated Plate');
          plate.info.should.equal('This is the updated plate!!!');

          done();
        });
    });
  });

  describe('PATCH /api/plates/:id', function() {
    var patchedPlate;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/plates/${newPlate._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Plate' },
          { op: 'replace', path: '/info', value: 'This is the patched plate!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedPlate = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedPlate = {};
    });

    it('should respond with the patched plate', function() {
      patchedPlate.name.should.equal('Patched Plate');
      patchedPlate.info.should.equal('This is the patched plate!!!');
    });
  });

  describe('DELETE /api/plates/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/plates/${newPlate._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when plate does not exist', function(done) {
      request(app)
        .delete(`/api/plates/${newPlate._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
