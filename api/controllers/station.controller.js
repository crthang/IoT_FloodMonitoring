var Station = require('../../models/station.model');

//*Xem tất cả các trạm
module.exports.index = async function(req, res) {
    var stations = await Station.find();
    res.json(stations);
};

//*Xem thông tin trạm theo Mã trạm
module.exports.xemTram = async function(req, res) {
    var ma_tram = req.params.ma_tram;
    var station = await Station.find({ ma_tram:ma_tram }).exec();
    res.json(station);
};

//*Thêm trạm mới
module.exports.themTram = async function(req, res) {
   
    var station = new Station({
        ma_tram: req.param('ma_tram'),
        ten_tram: req.param('ten_tram'),
        sdt: req.param('sdt'),
        vi_do: req.param('vi_do'),
        kinh_do: req.param('kinh_do'),
        muc_1: req.param('muc_1'),
        muc_2: req.param('muc_2'),
        muc_3: req.param('muc_3')
    });

    var data = Station.create(station);
    res.redirect('/');
};

//TODO làm update thông tin trạm
