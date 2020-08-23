"use strict";

var mongoose = require('mongoose');

var dataSchema = new mongoose.Schema({
  username: String,
  password: String
});
var User = mongoose.model('User', dataSchema, 'users');
module.exports = User;