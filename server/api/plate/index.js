'use strict';

var express = require('express');
var controller = require('./plate.controller');
import * as auth from '../../auth/auth.service';

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/download/token', auth.isAuthenticated(), controller.getDownloadToken);
router.get('/download', auth.isAuthenticated(), controller.download);
router.get('/:state/:number', auth.isAuthenticated(), controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

module.exports = router;
