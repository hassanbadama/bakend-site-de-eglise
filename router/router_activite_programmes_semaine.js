const express = require('express');
const Control = require('../controler/Controle_programmes_semaine');
const multer = require('../middlewaire/gestion_fichier')
const auth = require('../middlewaire/auth')



const router = express.Router();
router.post('/programmes_semaine', auth,multer, Control.Ajouter_programes_semaine);
// router.post('/connexion', Control.Connexion);
router.get('/Afficher_programmes_semaine', Control.Afficher_programmes_semaine);
router.delete('/suppression_programmes_semaine/:id', auth,Control.delete_programmes);
router.get('/Recherche_pour_supprimer_programmes_semaine/:id',Control.Recherche_pour_supprimer_programmes);
router.put('/modifier_programmes_semaine/:id', auth ,multer, Control.modifier_programmes);
module.exports = router;