"use strict";

var User = require('../../models/user.model');

module.exports.index_User = function _callee(req, res) {
  var datas;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(User.find());

        case 2:
          datas = _context.sent;
          res.json(datas);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};