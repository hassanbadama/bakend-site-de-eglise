const express = require('express');
const Control = require('../controler/Controle_projet');
const multer = require('../middlewaire/gestion_fichier')
const auth = require('../middlewaire/auth')



const router = express.Router();
router.post('/ajouter_projet', auth,multer, Control.ajoute_projet);
// router.post('/connexion', Control.Connexion);
router.get('/Afficher_projet', Control.Afficher_projet);
router.delete('/suppression_projet/:id', auth ,Control.delete_projet);
router.get('/Recherche_pour_modifier_projet/:id',Control.Recherche_pour_modifier_projet);
router.put('/modifier_projet/:id', auth ,multer, Control.modifier_projet);
module.exports = router;