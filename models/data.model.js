var mongoose = require('mongoose');

var dataSchema = new mongoose.Schema({
    waterLevel: String,
    date: String,
    time: String
});

var Data = mongoose.model('Data', dataSchema, 'data');

module.exports = Data;