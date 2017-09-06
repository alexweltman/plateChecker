/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/states              ->  index
 */

'use strict';

import States from '../../services/states';

// Gets a list of States
export function index(req, res) {
  res.status(200).json(States);
}
