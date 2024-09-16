mongoose = require('mongoose');

const responsable_eglise = mongoose.Schema({
    //userid est la etrange de l'autre table
  
    nom:{
        type:String,
        require:true
    },
    prenom:{
        type:String,
        require:true
    },
    fonction:{
        type:String,
        require:true
    },
    contact:{
        type:String,
        require:true
    },
    quartier:{
        type:String,
        require:true
    },
    file:{
        type:String,
        default:"None"
    }
});

module.exports = mongoose.model("Responsable_eglise", responsable_eglise);