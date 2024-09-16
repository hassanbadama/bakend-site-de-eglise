const Liste_communaute = require('../models/liste_communaute');
const fichierImageModifier = require('fs');
const web_token = require('jsonwebtoken');

exports.ajoute_liste_communaute = (req, res, next) => {
    //recuperer toutes les donnee dans le formulaire
    console.log("teste Projet");
   
   console.log(req.body);
    const data = req.body
    console.log('enregitre');
    console.log(data);
    const liste_communaute = new Liste_communaute({
        nom_communaute:req.body.nom
    });
    liste_communaute.save()
      .then(() => res.status(201).json({ message: "objet sauces ajouter avec succe!" }))
      .catch((error) => res.status(400).json({ error }));
  };

  exports.Afficher_Liste_communaute = (req, res, next)=>{
    console.log("Liste_communaute");
    Liste_communaute.find()
      .then((data) => res.status(200).json(data))
      .catch(error => res.status(400).json({ error }));
  
  }

      //supprimer
exports.delete_Liste_communaute = (req, res, next) => {
    console.log("suppression projet.....");
    Liste_communaute.findOne({ _id: req.params.id })
    .then((data) => {
        const id = req.params.id
        Liste_communaute.deleteOne({ _id: id })
          .then((data) => res.status(200).json(data))
          .catch(error => res.status(400).json({ error }));
  
    //  }
    })
    .catch(error => res.status(400).json({ error }));
  }

  //rechercher pour modifier
exports.Recherche_pour_modifier_Liste_communaute = (req, res, next) => {
    const id = req.params.id
    Liste_communaute.findOne({ _id: id })
      .then((data) => res.status(200).json(data))
      .catch(error => res.status(400).json({ error }));
  }

  //modification
exports.modifier_Liste_communaute = (req, res, next) => {
    //const id = req.params.id
    console.log("teste Liste_communaute ");
    console.log(req.params.id);
    console.log(req.params);
    console.log(req.body);
    Liste_communaute.findOne({ _id: req.params.id })
      .then((data) => {
          // Modelsauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id }) ça modifier juste les elements sans modifie image
          Liste_communaute.updateOne({ _id: req.params.id },{ nom_communaute:req.body.nom, _id: req.params.id })
            .then((data) => res.status(200).json(data))
            .catch(error => res.status(400).json({ error }));
       // }
      }).catch(error => res.status(400).json({ error }));
  }
  