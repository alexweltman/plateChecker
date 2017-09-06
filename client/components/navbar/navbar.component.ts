'use strict';
/* eslint no-sync: 0 */
const angular = require('angular');

export class NavbarComponent {
  private menu = [{
    'title': 'Home',
    'state': 'main'
  }];
  private isLoggedIn: Function;
  private isAdmin: Function;
  private getCurrentUser: Function;
  private isCollapsed: boolean = true;

  constructor(Auth) {
    'ngInject';
    this.isLoggedIn = Auth.isLoggedInSync;
    this.isAdmin = Auth.isAdminSync;
    this.getCurrentUser = Auth.getCurrentUserSync;
  }

}

export default angular.module('directives.navbar', [])
  .component('navbar', {
    template: require('./navbar.html'),
    controller: NavbarComponent
  })
  .name;
