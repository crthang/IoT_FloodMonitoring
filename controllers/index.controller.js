var Data = require('../models/data.model');
var User = require('../models/user.model');


module.exports.index_CL = function(req, res) {
    Data.find().then(function(data) {
        var leg = data.length;
        var waterCurrent = (data[leg - 1].waterLevel);

        res.render('index', {
            title: 'Home',
            pageTitle: "Bảng điều khiển",
            waterLevelCurrent: waterCurrent,
            datas: data
        });
    });
}



module.exports.postIndex_CL = function(req, res) {
    //TODO: khi post dữ liệu
    console.log(req.body);

}