var mongoose = require('mongoose');

// TODO: Model cho Trạm

var stationSchema = new mongoose.Schema({
    ma_tram: String,
    ten_tram: String,
    sdt: String,
    vi_do: String,
    kinh_do: String,
    muc_1: Number,
    muc_2: Number,
    muc_3: Number
});

var Station = mongoose.model('Station', stationSchema, 'tram');
module.exports = Station;