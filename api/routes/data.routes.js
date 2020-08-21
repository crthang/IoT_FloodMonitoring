var express = require('express');
var controller = require('../controllers/data.controller');

var router = express.Router();

router.get('/', controller.index_CL);

router.post('/', controller.create_CL);



// export ra cái router của index
module.exports = router;