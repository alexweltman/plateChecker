'use strict';
const angular = require('angular');
import routes from './admin.routes';
import AdminController from './admin.controller';

export default angular.module('plateCheckerApp.admin', [
  'plateCheckerApp.auth',
  'ui.router'
])
  .config(routes)
  .controller('AdminController', AdminController)
  .name;
