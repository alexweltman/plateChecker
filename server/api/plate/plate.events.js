/**
 * Plate model events
 */

'use strict';

import {EventEmitter} from 'events';
var PlateEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PlateEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Plate) {
  for(var e in events) {
    let event = events[e];
    Plate.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    PlateEvents.emit(event + ':' + doc._id, doc);
    PlateEvents.emit(event, doc);
  };
}

export {registerEvents};
export default PlateEvents;
