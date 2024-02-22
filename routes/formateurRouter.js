var express = require ("express");
var Router = express.Router();
const uploads = require('../middleware/upload')  
const auth = require('../controllers/auth')
var formateurController = require('../controllers/formateurController');
Router.post('/signup',uploads.single('cv'),formateurController.signup);
Router.put('/updateStatue/:email',auth.checkUserRole('admin'),formateurController.updateStatus);
Router.post('/affectation',formateurController.affectationFormationFormateur);
Router.delete('/deleteFormateur',formateurController.supprimerFormateur)
Router.get('/getFormateur',formateurController.getAllFormateur)

module.exports = Router
