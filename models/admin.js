mongoose = require('mongoose');

const admin = mongoose.Schema({
    //userid est la etrange de l'autre table
  
    nom_user:{
        type:String,
        require:true
    },
    mdp_user:{
        type:String,
        require:true
    },
    file:{
        type:String,
        default:"None"
    }
});

module.exports = mongoose.model("admin", admin);