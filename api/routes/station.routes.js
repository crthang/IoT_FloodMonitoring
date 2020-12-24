var express = require('express');
var controller = require('../controllers/station.controller');

var router = express.Router();

//* Router lấy tất cả các trạm - ex: http://localhost:3000/api/data
router.get('/', controller.index);

//* Router lấy thông tin trạm theo Mã trạm - ex: http://localhost:3000/api/station/0001
router.get('/:ma_tram', controller.xemTram);

//* Router Thêm trạm mới
router.post('/', controller.themTram);

//* Router Cập nhật thông tin trạm 
router.put('/update/:id', controller.update);

// export ra router của station
module.exports = router;