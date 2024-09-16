const express = require('express');
const Control = require('../controler/Controle_mouvements');
const multer = require('../middlewaire/gestion_fichier')
const auth = require('../middlewaire/auth')



const router = express.Router();
router.post('/activites_mouvements', auth, multer, Control.Ajouter_Mouvements);
// router.post('/connexion', Control.Connexion);
router.get('/Afficher_mouvements', Control.Afficher_Mouvements);
router.delete('/suppression_mouvements/:id', auth,Control.delete_Mouvements);
router.get('/Recherche_pour_modifier_mouvements/:id',Control.Recherche_pour_modifier_Mouvements);
router.put('/modifier_mouvements/:id', auth ,multer, Control.modifier_Mouvements);
module.exports = router;