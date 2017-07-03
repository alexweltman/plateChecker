'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './plate.events';

var PlateSchema = new mongoose.Schema({
  number: String,
  state: String,
  addedBy: String,
  createdAt: Date
});

registerEvents(PlateSchema);
export default mongoose.model('Plate', PlateSchema);
