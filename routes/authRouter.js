const express = require('express');
var Router = express.Router();
var authController = require('../controllers/auth')
Router.post('/signIn',authController.signIn);
module.exports = Router