'use strict';

// @flow
interface User {
  name: string;
  email: string;
  password: string;
}

export default class LoginController {
  private user: User = {
    name: '',
    email: '',
    password: ''
  };
  private error: string;
  private submitted : boolean = false;
  Auth;
  $state;

  /*@ngInject*/
  constructor(Auth, $state) {
    this.Auth = Auth;
    this.$state = $state;
    this.error = undefined;
  }

  login(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.login({
        email: this.user.email,
        password: this.user.password
      })
      .then(() => {
        // Logged in, redirect to home
        this.$state.go('main');
      })
      .catch(err => {
        this.error = err.message;
      });
    }
  }

  private checkFields(form) {
    if (!this.allFieldsSet(form) && form.email.$dirty && form.password.$dirty) {
      this.error = "All fields are required";
    } else {
      this.error = undefined;
    }
  }

  private allFieldsSet(form) {
    let set: boolean  =
      this.user.email &&
      this.user.email !== '' &&
      this.user.password &&
      this.user.password !== '';
    return set && form.$dirty;
  }
}
