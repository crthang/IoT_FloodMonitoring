var Station = require('../../models/station.model');

module.exports.index = async function(req, res) {
    var stations = await Station.find();
    res.json(stations);
};

module.exports.maTram = async function(req, res) {
    var tram = req.params.tram;
    var datas = await Data.find({ ma_tram:tram }).exec();
    res.json(datas);
};