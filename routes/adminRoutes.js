const express = require('express')
const Router= express.Router();
const auth =  require("../controllers/auth")
const adminController  = require('../controllers/adminController')

Router.post('/addAdmin',adminController.addAdmin)
module.exports = Router