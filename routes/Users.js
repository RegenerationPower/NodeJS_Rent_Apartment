var express = require('express');
var router = express.Router();


var usersController = require('../controllers/userController');
router.get('/users', usersController.getUsers);
module.exports = router;
