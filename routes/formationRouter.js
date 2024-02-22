const express = require('express')
const Router =  express.Router()
const auth =  require("../controllers/auth")

const  formationConntroller = require("../controllers/formationController")
Router.post('/addFormation',auth.checkUserRole('admin'),formationConntroller.addFormation)
Router.delete('/supprimerFormation/:formationId',formationConntroller.supprimerFormation)
Router.get('/getFormation/:formateurId',formationConntroller.getFormationForFormateur)
Router.get('/getAll',formationConntroller.getAllFormation);
/*Router.post('/addApprenet',formationConntroller.addMaxApprenent)*/
Router.post('/addReview/:formationId',auth.checkUserRole('condidat'),formationConntroller.addReview)
module.exports =  Router