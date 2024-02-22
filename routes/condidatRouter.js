const express = require('express')
var Router = express.Router()
const image = require('../middleware/image')
var condidatController = require('../controllers/condiadatController')
Router.post('/signup',image.single('avatar'),condidatController.signup)
Router.post('/inscription/:condidatId/formation/:formationId/enroll',condidatController.InscriptioFormation)
Router.post('/desinscription/:condidatId/formation/:formationId/enroll',condidatController.DesnscriptioFormation)
Router.post('/forgetpassword',condidatController.forgetPassword)
Router.get('/confirmation/:token', condidatController.confirmacount);
module.exports = Router