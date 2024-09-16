mongoose = require('mongoose');

const liste_communaute = mongoose.Schema({
    //userid est la etrange de l'autre table
  
    nom_communaute:{
        type:String,
        require:true
    }
});

module.exports = mongoose.model("Liste_communaute", liste_communaute);