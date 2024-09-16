mongoose = require('mongoose');

const programmes_semaine = mongoose.Schema({
    //userid est la etrange de l'autre table
  
    jour_activite:{
        type:String,
        require:true,
        unique:true
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

module.exports = mongoose.model("Programmes_semaine", programmes_semaine);