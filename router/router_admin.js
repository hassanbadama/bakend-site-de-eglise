const express = require('express');
const Control = require('../controler/Controle_admin');
const multer = require('../middlewaire/gestion_fichier')
const auth = require('../middlewaire/auth')



const router = express.Router();
router.post('/ajouter_admin',multer, Control.AjouterAdmin);
router.post('/connexion', Control.Connexion_usr);
router.get('/afficher_admin', Control.Afficher_admin);
router.delete('/suppression_admin/:id',Control.supprimer_admin);
//router.get('/rechercher_admin/:id',Control.Recherche_admin);
router.get('/Rechercher_admin/:id',Control.Recherche_admin);
// router.get('/Recherche_pour_supprimer_activites_chorale/:id',Control.Recherche_pour_supprimer_Activite_chorale);
// router.put('/modifier_activites_chorale/:id',multer, Control.modifier_Activite_chorale);
module.exports = router;