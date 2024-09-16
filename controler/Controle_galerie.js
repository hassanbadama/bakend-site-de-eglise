const Galerie = require('../models/Galerie');
const fichierImageModifier = require('fs');
const web_token = require('jsonwebtoken');

exports.ajoute_Galerie = (req, res, next) => {
    //recuperer toutes les donnee dans le formulaire
    console.log("teste Projet");
   
   console.log(req.body);
   console.log(req.body.description);
    console.log('enregitre');
    const galerie = new Galerie({
      file:`${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    });
    galerie.save()
      .then(() => res.status(201).json({ message: "objet sauces ajouter avec succe!" }))
      .catch((error) => res.status(400).json({ error }));
  };

  exports.Afficher_galerie = (req, res, next)=>{
    console.log("galerie");
    Galerie.find()
      .then((data) => res.status(200).json(data))
      .catch(error => res.status(400).json({ error }));
  
  }

      //supprimer
exports.delete_galerie = (req, res, next) => {
    console.log("suppression galerie.....");
    Galerie.findOne({ _id: req.params.id })
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
        Galerie.deleteOne({ _id: id })
          .then((data) => res.status(200).json(data))
          .catch(error => res.status(400).json({ error }));
  
    //  }
    })
    .catch(error => res.status(400).json({ error }));
  }

  //rechercher pour modifier
exports.Recherche_pour_modifier_Galerie = (req, res, next) => {
    const id = req.params.id
    Galerie.findOne({ _id: id })
      .then((data) => res.status(200).json(data))
      .catch(error => res.status(400).json({ error }));
  }

  //modification
exports.modifier_Galerie = (req, res, next) => {
    //const id = req.params.id
    console.log("teste projet ");
    console.log(req.params.id);
    console.log(req.params);
    console.log(req.body);
    Galerie.findOne({ _id: req.params.id })
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
            file:`${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
  
          } : { ...req.body };
          // Modelsauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id }) ça modifier juste les elements sans modifie image
          Galerie.updateOne({ _id: req.params.id }, { ...ObjetNouveaufichier, _id: req.params.id })
            .then((data) => res.status(200).json(data))
            .catch(error => res.status(400).json({ error }));
       // }
      })
  }
  