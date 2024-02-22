const express = require('express');
var Router = express.Router();
var sessionController  = require('../controllers/SessionController');
Router.post('/addsession', sessionController.addSession);
Router.delete('/deleteFormation/:sessionId',sessionController.deleteSession)

module.exports = Router
