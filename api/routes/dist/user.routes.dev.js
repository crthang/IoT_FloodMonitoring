"use strict";

var express = require('express');

var controller = require('../controllers/user.controller');

var router = express.Router();
router.get('/', controller.index_User); // export ra cái router của index

module.exports = router;