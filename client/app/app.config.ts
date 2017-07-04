'use strict';

export function appConfig($urlRouterProvider, $locationProvider, $qProvider) {
  'ngInject';

  $urlRouterProvider
    .otherwise('/');

  $locationProvider.html5Mode(true);
  $qProvider.errorOnUnhandledRejections(false);
}
