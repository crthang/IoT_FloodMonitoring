var express = require('express');
var controller = require('../controllers/station.controller');

var router = express.Router();

//* Router lấy tất cả các trạm - ex: http://localhost:3000/api/data
router.get('/', controller.index);

//* Router lấy thông tin trạm theo Mã trạm - ex: http://localhost:3000/api/station/0001
router.get('/:ma_tram', controller.xemTram);

//* Router lấy thông tin SĐT trạm theo Mã trạm - ex: http://localhost:3000/api/station/phone/0001
router.get('/phone/:ma_tram', controller.xemSDTTram);

//* Router lấy thông tin Mức cảnh báo trạm theo Mã trạm - ex: http://localhost:3000/api/station/warning/0001
router.get('/warning/:ma_tram', controller.xemCanhBaoTram);

//* Router Thêm trạm mới
router.post('/', controller.themTram);

//* Router Cập nhật thông tin trạm 
router.put('/update/:id', controller.update);

// export ra router của station
module.exports = router;