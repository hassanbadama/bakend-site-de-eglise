const bcryp = require("bcrypt");
const web_token = require('jsonwebtoken');
const fichierImageModifier = require('fs');
const Programmes_semaine  = require('../models/Programmes_semaine')


exports.Ajouter_programes_semaine = (req, res, next)=>{
    console.log("Ajouter_programes_semaine");
   
    console.log(req.body);
    
    console.log(req.body.jour_activite);
    console.log(req.body.tableau_activite);

    console.log(`${req.protocol}://${req.get("host")}/images/${req.file.filename}`);
     console.log('enregitre programmes');
    
     try{
        const tabobjet = req.body.tableau_activite
      const taobj = JSON.parse(tabobjet)
      console.log("convertire");
      console.log(taobj);
      const programmes_semaine = new Programmes_semaine({
          jour_activite: req.body.jour_activite,
          date_activite:req.body.date_activite,
          tableau_activite : taobj,
          file:`${req.protocol}://${req.get("host")}/images/${req.file.filename}`
      });
      programmes_semaine.save()
        .then(() => res.status(201).json({ message: "Le programe du "+ req.body.jour_activite +" est avec succés"}))
        .catch((erreur) => res.status(400).json({ erreur}));
     }
     catch(error){
      console.error("erreur enregistrement : ", error)

     }
}

exports.Afficher_programmes_semaine = (req, res, next)=>{
    console.log("Afficher_programmes_semaine");
    Programmes_semaine.find()
      .then((data) => res.status(200).json(data))
      .catch(error => res.status(400).json({ error }));
  
  }


    //supprimer
exports.delete_programmes = (req, res, next) => {
  console.log("suppression.....");
  Programmes_semaine.findOne({ _id: req.params.id })
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
      Programmes_semaine.deleteOne({ _id: id })
        .then((data) => res.status(200).json(data))
        .catch(error => res.status(400).json({ error }));

  //  }
  })
}
//rechercher pour supp
exports.Recherche_pour_supprimer_programmes = (req, res, next) => {
  const id = req.params.id
  Programmes_semaine.findOne({ _id: id })
    .then((data) => res.status(200).json(data))
    .catch(error => res.status(400).json({ error }));
}



//modification
exports.modifier_programmes = (req, res, next) => {
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
  Programmes_semaine.findOne({ _id: req.params.id })
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
        Programmes_semaine.updateOne({ _id: req.params.id }, { ...ObjetNouveaufichier, _id: req.params.id })
          .then((data) => res.status(200).json(data))
          .catch(error => res.status(400).json({ error }));
     // }
    })
}