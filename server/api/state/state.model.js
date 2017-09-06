'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './state.events';

var StateSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

registerEvents(StateSchema);
export default mongoose.model('State', StateSchema);
