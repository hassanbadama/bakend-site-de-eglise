const express = require('express');
const Control = require('../controler/Controle_activite_responsable_eglise');
const multer = require('../middlewaire/gestion_fichier')
const auth = require('../middlewaire/auth')



const router = express.Router();
router.post('/ajouter_responsable_eglise', auth,multer, Control.ajoute_Responsable_eglise);
// router.post('/connexion', Control.Connexion);
router.get('/Afficher_responsable_eglise', Control.Afficher_Responsable_eglise);
router.delete('/suppression_responsable_eglise/:id', auth,Control.delete_Responsable_eglise);
router.get('/Recherche_pour_modifier_responsable_eglise/:id',Control.Recherche_pour_modifier_Responsable_eglise);
router.put('/modifier_responsable_eglise/:id', auth,multer, Control.modifier_responsable);
module.exports = router;