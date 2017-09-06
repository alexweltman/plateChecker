'use strict';
const angular = require('angular');

export class LogoComponent {
  constructor() {
  }
}

export default angular.module('directives.logo', [])
  .component('logo', {
    template: require('./logo.html'),
    controller: LogoComponent
  })
  .name;
