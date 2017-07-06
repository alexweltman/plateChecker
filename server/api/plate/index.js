'use strict';

var express = require('express');
var controller = require('./plate.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:state/:number', controller.show);
router.post('/', controller.create);
router.delete('/:id', controller.destroy);

module.exports = router;
