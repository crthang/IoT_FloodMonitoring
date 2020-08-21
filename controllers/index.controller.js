var Data = require('../models/data.model');

module.exports.index_CL = function(req, res) {
    Data.find().then(function(datas) {
        res.render('index', {
            title: 'Home',
            pageTitle: "Bảng điều khiển",
            datas: datas
        });
    });
}


module.exports.postIndex_CL = function(req, res) {
    //TODO: khi post dữ liệu

    res.redirect('/');
}