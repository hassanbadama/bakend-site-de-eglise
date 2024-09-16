const express = require('express');
const Control = require('../controler/Controle_galerie');
const multer = require('../middlewaire/gestion_fichier')
const auth = require('../middlewaire/auth')



const router = express.Router();
router.post('/ajouter_galerie', auth ,multer, Control.ajoute_Galerie);
// router.post('/connexion', Control.Connexion);
router.get('/Afficher_galerie', Control.Afficher_galerie);
router.delete('/suppression_galerie/:id', auth ,Control.delete_galerie);
router.get('/Recherche_pour_modifier_galerie/:id',Control.Recherche_pour_modifier_Galerie);
router.put('/modifier_galerie/:id', auth ,multer, Control.modifier_Galerie);
module.exports = router;