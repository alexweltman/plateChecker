'use strict';
import _ from 'lodash';
module.exports = {
  json: (errorArray) => {
    console.log("ErrorArray: ", errorArray);
    let message = "There are problems with your request:";
    _.each(errorArray, error => {
      message += " " + error.param + " '" + error.value + "' " + error.msg + ".";
    });
    return { "message": message };
  }
};
