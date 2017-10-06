/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/plates                 ->  index
 * POST    /api/plates                 ->  create
 * GET     /api/plates/:state/:number  ->  show
 * PUT     /api/plates/:id             ->  upsert
 * PATCH   /api/plates/:id             ->  patch
 * DELETE  /api/plates/:id             ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Plate from './plate.model';
import validatorError from '../../services/validatorError';
import states from '../../services/states';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      // eslint-disable-next-line prefer-reflect
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.remove()
        .then(() => {
          return res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Plates
export function index(req, res) {
  return Plate.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Plate from the DB
export function show(req, res) {
  req.checkParams('number', 'may only contain letters and numbers').isAlphanumeric();
  req.checkParams('number', 'may only contain uppercase characters').isUppercase();
  req.checkParams('number', 'must contain between 1 and 7 characters').isLength({min:1, max: 7});
  req.checkParams('state', 'must be a valid US state or territory').isIn(states);
  req.getValidationResult().then(result => {
    if (!result.isEmpty()) {
      return res.status(400).json(validatorError.json(result.array()));
    }
    return Plate.findOne({number: req.params.number, state: req.params.state}).exec()
      .then(handleEntityNotFound(res))
      .then(respondWithResult(res))
      .catch(handleError(res));
  });
}

// Creates a new Plate in the DB
export function create(req, res) {
  req.checkBody('number', 'may only contain letters and numbers').isAlphanumeric();
  req.checkBody('number', 'may only contain uppercase characters').isUppercase();
  req.checkBody('number', 'must contain between 1 and 7 characters').isLength({min:1, max: 7});
  req.checkBody('state', 'must be a valid US state or territory').isIn(states);

  req.getValidationResult().then(result => {
    if (!result.isEmpty()) {
      return res.status(400).json(validatorError.json(result.array()));
    }
    return Plate.findOne({number: req.body.number, state: req.body.state}).exec((err, plate) => {
      if (err) {
        return res.status(500).json({message: err});
      } else if (!plate) {
        let plateToAdd = req.body;
        plateToAdd.createdAt = Date.now();
        return Plate.create(plateToAdd)
          .then(respondWithResult(res, 201))
          .catch(handleError(res));
      }
      return res.status(409).json(plate);
    });
  });
}

// Upserts the given Plate in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Plate.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Plate in the DB
export function patch(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Plate.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Plate from the DB
export function destroy(req, res) {
  return Plate.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
