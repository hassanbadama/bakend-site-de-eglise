const bcryp = require("bcrypt");
const web_token = require('jsonwebtoken');
const fichierImageModifier = require('fs');
const Admin = require('../models/admin')


exports.AjouterAdmin = (req, res, next)=>{
    console.log("oui ici admin");
   console.log(`${req.protocol}://${req.get("host")}/images/${req.file.filename}`);
    console.log(req.body.nom_user);
    console.log(req.body.mdp_user);
    console.log(req.body);
    bcryp
      .hash(req.body.mdp_user, 10)
      .then((hash) => {
        const admin = new Admin({
            nom_user: req.body.nom_user,
            mdp_user: hash,
            // email: req.body.email,
            file:`${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        });
        
        admin.save()
          .then(() => res.status(201).json({ message: "admin créé !" }))
          .catch((error) => res.status(400).json({ error }));
      })
      
      .catch((error) => res.status(500).json({ error }));
 
}


exports.Connexion_usr = (req, res, next) => {

  Admin.findOne({ nom_user: req.body.nom_user })
    .then((model) => {
      console.log("il ya user teste");
      console.log(model);
      if (!model) {
        return res.status(401).json({ message: "utilisateur inconnu" })
      }
      //compare le mot de passe
      bcryp.compare(req.body.mdp_user, model.mdp_user)
        .then(valid => {
          if (!valid) {
            return res.status(400).json({ message: "mot de passe incorrect" })
          }
          else {
            //generer un token pour la securité
            console.log("c'est bn token creeer");
            return res.status(201).json({
              role:model.role,
              userId: model._id,
              token: web_token.sign(
                { userId: model._id,
                  role:model.role },
                `${process.env.MOT_SECRE}`,
                { expiresIn: "24h" }
              )
            });
          }
        }).catch(error => res.status(403).json({ error }));
    }).catch(error => res.status(500).json({ error }));

}

exports.Afficher_admin = (req, res, next)=>{
  console.log("affichetall admin");
  Admin.find()
    .then((data) => res.status(200).json(data))
    .catch(error => res.status(400).json({ error }));

}

    //supprimer
    exports.supprimer_admin = (req, res, next) => {
      console.log("suppression.....");
      Admin.findOne({ _id: req.params.id })
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
          Admin.deleteOne({ _id: id })
            .then((data) => res.status(200).json(data))
            .catch(error => res.status(400).json({ error }));
    
      //  }
      })
      .catch(error => res.status(400).json({ error }));
    }

    exports.Recherche_admin = (req, res, next) => {
      console.log("oui rechercher admin");
      const id = req.params.id
      Admin.findOne({ _id: id })
        .then((data) => res.status(200).json(data))
        .catch(error => res.status(400).json({ error }));
    }



// exports.RechercheUser = (req, res, next) => {
//   const id = req.params.id
//   Utilisateur.findOne({ _id: id })
//     .then((data) => res.status(200).json(data))
//     .catch(error => res.status(400).json({ error }));
// }
  //rechercher 
