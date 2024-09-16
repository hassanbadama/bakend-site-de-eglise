mongoose = require('mongoose');

const mouvements = mongoose.Schema({
    //userid est la etrange de l'autre table
  
    jour_activite:{
        type:String,
        require:true
    },
    mouvement:{
        type:String,
        require:true
    },
    date_activite:{
        type:String,
        require:true
    },
    tableau_activite:{
        type:[[String]],
        required:false
    },
    file:{
        type:String,
        default:"None"
    }
});

module.exports = mongoose.model("Mouvements", mouvements);