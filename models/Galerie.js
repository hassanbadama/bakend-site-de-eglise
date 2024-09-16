mongoose = require('mongoose');

const galerie = mongoose.Schema({
    //userid est la etrange de l'autre table
    file:{
        type:String,
        default:"None"
    }
});

module.exports = mongoose.model("Galerie", galerie);