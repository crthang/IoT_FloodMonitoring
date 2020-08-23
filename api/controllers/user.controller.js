var User = require('../../models/user.model');

module.exports.index_User = async function(req, res) {
    var datas = await User.find();
    res.json(datas);
};