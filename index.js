// Désactivation du rejet TLS non autorisé (Attention: Ceci est à des fins de débogage uniquement, ne pas utiliser en production)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// Importation du module express pour la gestion des routes
const express = require('express');
const app = express();
require('dotenv').config({path :"./config/.env"})
// Importation du module body-parser pour traiter les données JSON
var bodyParser = require('body-parser');

// Importation des routes pour les formateurs
var routeFormateur = require('./routes/formateurRouter');
var routeCondidat = require('./routes/condidatRouter');
var routeCategorie = require('./routes/categorieRouter');
var routeFormation = require('./routes/formationRouter');
var routerAuth = require('./routes/authRouter')
var routerAdmin = require('./routes/adminRoutes')
var routerSession = require('./routes/sessionRouter')
var routerStat = require('./routes/statRouter')
// Connexion à la base de données
require('./database/dbconfig');
app.use('/uploads',express.static('uploads'));
// Utilisation de body-parser pour traiter les données JSON dans les requêtes
app.use(bodyParser.json());

// Utilisation des routes définies pour les formateurs
app.use('/formateur', routeFormateur);
app.use('/condidat',routeCondidat);
app.use('/categorie',routeCategorie);
app.use('/formation',routeFormation)
app.use('/auth',routerAuth)
app.use('/admin',routerAdmin)
app.use('/session',routerSession)
app.use('/stat',routerStat)
// Configuration du port sur lequel le serveur écoutera
const port = 2700;

// Lancement du serveur avec une arrow function
app.listen(port, () => {
    console.log("Le serveur a démarré sur le port " + port);
});
