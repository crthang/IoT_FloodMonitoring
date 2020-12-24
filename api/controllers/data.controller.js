var Data = require('../../models/data.model');

module.exports.index = async function(req, res) {
    var datas = await Data.find();
    res.json(datas);
};

module.exports.maTram = async function(req, res) {
    var tram = req.params.tram;
    var datas = await Data.find({ ma_tram:tram }).sort({ _id: -1 }).limit(10).exec();
    res.json(datas);
};
