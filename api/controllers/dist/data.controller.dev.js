"use strict";

var Data = require('../../models/data.model');

module.exports.index_CL = function _callee(req, res) {
  var datas;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Data.find());

        case 2:
          datas = _context.sent;
          res.json(datas);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}; // module.exports.create_CL = async function(req, res) {
//     var data = await Data.create(req.body);
//     res.json(data);
//     io.emit('Client_gui', "thang");
//     // io.emit('message', req.body);
// };