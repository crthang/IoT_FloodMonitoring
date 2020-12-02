var express = require('express');
var controller = require('../controllers/station.controller');

var router = express.Router();

// lấy tất cả data - ex: http://localhost:3000/api/data
router.get('/', controller.index);
// lấy data theo trạm - ex: http://localhost:3000/api/data/tram/0001
router.get('/station/:tram', controller.maTram);

// export ra cái router của index
module.exports = router;