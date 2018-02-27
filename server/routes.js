/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';
const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS;

export default function(app) {

  app.use(redirectToHTTPS([/localhost:(\d{4})/]));
  // Insert routes below
  app.use('/api/states', require('./api/state'));
  app.use('/api/plates', require('./api/plate'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth').default);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
    });
}
