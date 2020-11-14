var express = require('express');
var router = express.Router();

var controller = require('../controllers/index.controller');

router.get('/', controller.index_CL);
router.post('/', controller.postIndex_CL);

// export ra cái router của index
module.exports = router;