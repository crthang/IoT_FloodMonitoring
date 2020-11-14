var express = require('express');
var controller = require('../controllers/data.controller');

var router = express.Router();

router.get('/', controller.index);

router.get('/tram/:tram', controller.maTram);

// export ra cái router của index
module.exports = router;