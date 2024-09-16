const bcryp = require("bcrypt");
const web_token = require('jsonwebtoken');
const fichierImageModifier = require('fs');
const Mouvements  = require('../models/Mouvements')


exports.Ajouter_Mouvements= (req, res, next)=>{
    console.log("nous Mouvements");
    console.log("Mouvements");
    console.log(req.body);
    
    console.log(req.body.jour_activite);
    console.log(req.body.tableau_activite);

    console.log(`${req.protocol}://${req.get("host")}/images/${req.file.filename}`);
     console.log(' Mouvements');
    
     try{
        const tabobjet = req.body.tableau_activite
      const taobj = JSON.parse(tabobjet)
      console.log("converture Mouvements");
      console.log(taobj);
      const mouvements = new Mouvements({
          jour_activite: req.body.jour_activite,
          mouvement: req.body.mouvement,
          date_activite:req.body.date_activite,
          tableau_activite : taobj,
          file:`${req.protocol}://${req.get("host")}/images/${req.file.filename}`
      });
      mouvements.save()
        .then(() => res.status(201).json({ message: "Le programe du "+ req.body.jour_activite +" est avec succés"}))
        .catch((erreur) => res.status(400).json({ erreur}));
     }
     catch(error){
      console.error("erreur enregistrement : ", error)

     }
}

exports.Afficher_Mouvements = (req, res, next)=>{
    console.log("Mouvements");
    Mouvements.find()
      .then((data) => res.status(200).json(data))
      .catch(error => res.status(400).json({ error }));
  
  }


    //supprimer
exports.delete_Mouvements = (req, res, next) => {
  console.log("suppression.....");
  Mouvements.findOne({ _id: req.params.id })
  .then((data) => {
    //pour le niveau de securite pour tester si c'est vraiment user qui est connecté
   // if (data.userId === req.auth.userId || req.auth.role === true) {
      const elt = data.file.split('/images/')[1];
      
      //supprimer l'image qui existe dans le dossier images
      fichierImageModifier.unlink(`images/${elt}`, (error) => {
        if (error) {
          console.log(error);
        }
      })
      const id = req.params.id
      Mouvements.deleteOne({ _id: id })
        .then((data) => res.status(200).json(data))
        .catch(error => res.status(400).json({ error }));

  //  }
  })
  .catch(error => res.status(400).json({ error }));
}
//rechercher pour supp
exports.Recherche_pour_modifier_Mouvements = (req, res, next) => {
  const id = req.params.id
  Mouvements.findOne({ _id: id })
    .then((data) => res.status(200).json(data))
    .catch(error => res.status(400).json({ error }));
}



//modification
exports.modifier_Mouvements = (req, res, next) => {
  const tabobjet = req.body.tableau_activite
  const taobj = JSON.parse(tabobjet)
  const donnees_modifier = {
    jour_activite: req.body.jour_activite,
    date_activite:req.body.date_activite,
    tableau_activite : taobj 
}
  //const id = req.params.id
  console.log("teste moddifier ");
  console.log(donnees_modifier);
  console.log(req.params.id);
  console.log(req.params);
  console.log(req.body);
  Mouvements.findOne({ _id: req.params.id })
    .then((data) => {
      //pour le niveau de securite pour tester si c'est vraiment user qui est connecté
     // if (data.userId === req.auth.userId || req.auth.role === true) {
        if (req.file) {
          const elt = data.file.split('/images/')[1];
          //supprimer le image qui existe dans le dossier image
          fichierImageModifier.unlink(`images/${elt}`, (error) => {
            if (error) {
              console.log(error);
            }
          });
        }
        // si on a modifie les elements avec image
        const ObjetNouveaufichier = req.file ? {
          ...donnees_modifier,
          file:`${req.protocol}://${req.get("host")}/images/${req.file.filename}`,

        } : { ...donnees_modifier };
        // Modelsauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id }) ça modifier juste les elements sans modifie image
        Mouvements.updateOne({ _id: req.params.id }, { ...ObjetNouveaufichier, _id: req.params.id })
          .then((data) => res.status(200).json(data))
          .catch(error => res.status(400).json({ error }));
     // }
    })
    .catch(error => res.status(400).json({ error }));
}