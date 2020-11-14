
// TODO: Model cho dữ liệu: 1.ma_tram, 2.muc_nuoc, 3.ngay_thang, 4.thoi_gian

var mongoose = require('mongoose');

var dataSchema = new mongoose.Schema({
    ma_tram: String,
    muc_nuoc: Number,
    ngay_thang: String,
    thoi_gian: String
});

var Data = mongoose.model('Data', dataSchema, 'du_lieu');
module.exports = Data;