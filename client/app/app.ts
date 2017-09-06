'use strict';
const angular = require('angular');
// import ngAnimate from 'angular-animate';
const ngCookies = require('angular-cookies');
const ngResource = require('angular-resource');
const ngSanitize = require('angular-sanitize');



const uiRouter = require('angular-ui-router');

import 'angular-validation-match';
import 'angular-ui-bootstrap';



import {appConfig} from './app.config';

import _Auth from '../components/auth/auth.module';
import account from './account';
import navbar from '../components/navbar/navbar.component';
import logo from '../components/logo/logo.component';
import main from './main/main.component';
import util from '../components/util/util.module';



import './app.scss';

angular.module('plateCheckerApp', [
  ngCookies,
  ngResource,
  ngSanitize,


  uiRouter,

  _Auth,
  account,
  'validation.match',
  'ui.bootstrap',
  navbar,
  logo,
  main,
  util
])
  .config(appConfig)
  .run(function($rootScope, $location, Auth) {
    'ngInject';
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function(event, next) {
      Auth.isLoggedIn(function(loggedIn) {
        if(next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  });

angular
  .element(document)
  .ready(() => {
    angular.bootstrap(document, ['plateCheckerApp'], {
      strictDi: true
    });
  });
