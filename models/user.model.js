
// TODO: Model cho người dùng: 1.tai_khoan, 2.mat_khau

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: String,
    password: String
});

var User = mongoose.model('User', userSchema, 'nguoi_dung');

module.exports = User;