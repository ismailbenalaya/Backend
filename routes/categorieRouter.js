const express = require('express');
var Router = express.Router();
var categorieController = require('../controllers/categorieController')
Router.post('/addCategorie',categorieController.add)
Router.get('/getCategories',categorieController.getAll)
module.exports = Router