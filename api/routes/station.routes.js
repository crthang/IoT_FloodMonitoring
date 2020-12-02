var express = require('express');
var controller = require('../controllers/station.controller');

var router = express.Router();

//* Router lấy tất cả các trạm - ex: http://localhost:3000/api/data
router.get('/', controller.index);

//* Router lấy thông tin trạm theo Mã trạm - ex: http://localhost:3000/api/station/0001
router.get('/:ma_tram', controller.xemTram);

//* Router thêm trạm mới
router.post('/', controller.themTram);

// export ra router của station
module.exports = router;