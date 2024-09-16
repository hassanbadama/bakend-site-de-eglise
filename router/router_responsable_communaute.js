const express = require('express');
const Control = require('../controler/Controle_responsable_communaute');
const multer = require('../middlewaire/gestion_fichier')
const auth = require('../middlewaire/auth')



const router = express.Router();
router.post('/ajouter_responsable_communaute', auth ,multer, Control.ajoute_Responsable_communaute);
// router.post('/connexion', Control.Connexion);
router.get('/Afficher_responsable_communaute', Control.Afficher_Responsable_communaute);
router.delete('/suppression_responsable_communaute/:id', auth,Control.delete_Responsable_communaute);
router.get('/Recherche_pour_modifier_responsable_communaute/:id',Control.Recherche_pour_modifier_Responsable_communaute);
router.put('/modifier_responsable_communaute/:id', auth,multer, Control.modifier_responsable_communaute);
module.exports = router;