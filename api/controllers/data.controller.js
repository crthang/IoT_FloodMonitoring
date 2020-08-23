var Data = require('../../models/data.model');

module.exports.index_CL = async function(req, res) {
    var datas = await Data.find();
    res.json(datas);
};

// module.exports.create_CL = async function(req, res) {
//     var data = await Data.create(req.body);
//     res.json(data);

//     io.emit('Client_gui', "thang");

//     // io.emit('message', req.body);
// };