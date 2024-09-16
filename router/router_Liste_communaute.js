const express = require('express');
const Control = require('../controler/Controle_liste_communaute');
const multer = require('../middlewaire/gestion_fichier')
const auth = require('../middlewaire/auth')



const router = express.Router();
router.post('/ajouter_communaute', auth ,multer, Control.ajoute_liste_communaute);
// router.post('/connexion', Control.Connexion);
router.get('/Afficher_communaute', Control.Afficher_Liste_communaute);
router.delete('/suppression_communaute/:id', auth,Control.delete_Liste_communaute);
router.get('/Recherche_pour_modifier_communaute/:id',Control.Recherche_pour_modifier_Liste_communaute);
router.put('/modifier_communaute/:id', auth ,multer, Control.modifier_Liste_communaute);
module.exports = router;