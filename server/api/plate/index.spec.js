'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var plateCtrlStub = {
  index: 'plateCtrl.index',
  show: 'plateCtrl.show',
  create: 'plateCtrl.create',
  upsert: 'plateCtrl.upsert',
  patch: 'plateCtrl.patch',
  destroy: 'plateCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var plateIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './plate.controller': plateCtrlStub
});

describe('Plate API Router:', function() {
  it('should return an express router instance', function() {
    plateIndex.should.equal(routerStub);
  });

  describe('GET /api/plates', function() {
    it('should route to plate.controller.index', function() {
      routerStub.get
        .withArgs('/', 'plateCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/plates/:id', function() {
    it('should route to plate.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'plateCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/plates', function() {
    it('should route to plate.controller.create', function() {
      routerStub.post
        .withArgs('/', 'plateCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/plates/:id', function() {
    it('should route to plate.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'plateCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/plates/:id', function() {
    it('should route to plate.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'plateCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/plates/:id', function() {
    it('should route to plate.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'plateCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
