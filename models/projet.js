mongoose = require('mongoose');

const projet = mongoose.Schema({
    //userid est la etrange de l'autre table
  
    description:{
        type:String,
        require:true
    },
    file:{
        type:String,
        default:"None"
    }
});

module.exports = mongoose.model("Projet", projet);