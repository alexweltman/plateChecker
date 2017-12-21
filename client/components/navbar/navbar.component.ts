'use strict';
/* eslint no-sync: 0 */
const angular = require('angular');
const DOWNLOAD_URI = "/api/plates/download";

export class NavbarComponent {
  private $http;
  private menu = [{
    'title': 'Home',
    'state': 'main'
  }];
  private isLoggedIn: Function;
  private isAdmin: Function;
  private getCurrentUser: Function;
  private isCollapsed: boolean = true;

  constructor(Auth, $http) {
    'ngInject';
    this.$http = $http;
    this.isLoggedIn = Auth.isLoggedInSync;
    this.isAdmin = Auth.isAdminSync;
    this.getCurrentUser = Auth.getCurrentUserSync;
  }

  private download() {
    const ERR = 'Unable to fetch download token.';
    this.$http.get(`${DOWNLOAD_URI}/token`)
    .then(response => {
      if (response.data.token) {
        window.location.href = `${DOWNLOAD_URI}?access_token=${response.data.token}`;
      } else {
        console.log(ERR)
      }
    },response => {
      console.log(ERR);
    });
  }

}

export default angular.module('directives.navbar', [])
  .component('navbar', {
    template: require('./navbar.html'),
    controller: NavbarComponent
  })
  .name;
