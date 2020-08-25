"use strict";

var mongoose = require('mongoose');

var dataSchema = new mongoose.Schema({
  stationNumber: String,
  waterLevelLimit: String
});
var Setup = mongoose.model('Setup', dataSchema, 'setup');
module.exports = Setup;