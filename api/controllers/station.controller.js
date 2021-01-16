var Station = require('../../models/station.model');

//*Xem tất cả các trạm
module.exports.index = async function(req, res) {
    var stations = await Station.find();
    res.json(stations);
};

//*Xem thông tin SĐT trạm theo Mã trạm
module.exports.xemSDTTram = async function(req, res) {
    var ma_tram = req.params.ma_tram;
    const  station = await Station.find({ ma_tram:ma_tram }).exec();
    const  sdt =  (station[0]['sdt']);
    res.send(sdt);
};

//*Xem thông tin Mực cảnh báo trạm theo Mã trạm
module.exports.xemCanhBaoTram = async function(req, res) {
    var ma_tram = req.params.ma_tram;
    const  station = await Station.find({ ma_tram:ma_tram }).exec();
    const  level =  (station[0]['muc_1']);
    res.json(level);
};

//*Xem thông tin trạm theo Mã trạm
module.exports.xemTram = async function(req, res) {
    var ma_tram = req.params.ma_tram;
    const  station = await Station.find({ ma_tram:ma_tram }).exec();
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

//*Cập nhật trạm
module.exports.update = async function(req, res) {
   
    var ma_tram = req.params.id;
    var req_muc_1   = req.body.muc_1;
    var req_muc_2   = req.body.muc_2;
    var req_muc_3   = req.body.muc_3;
    
    const query = { ma_tram: ma_tram };
   
    Station.findOneAndUpdate(query, 
        {muc_1:req_muc_1, muc_2:req_muc_2, muc_3:req_muc_3}, function(err, data) {
            if(err){
                console.log(err);
            }
            else{
                res.send(data);
                console.log("Data updated!");
            }
        });  
};