const express = require ('express');
// const mongo = require('mongodb');
const app = express();
const mongoose = require('mongoose')
const cors = require('cors')
const body_parser = require('body-parser');
const path = require('path');
//pour gere tt les variables envirenement
require('dotenv').config()


const router_mouvements = require('./router/router_mouvements')
const rooter_projet = require('./router/rooter_projet')
const router_galerie = require('./router/router_galerie')
const router_admin = require('./router/router_admin')
const router_responsable_eglise = require('./router/router_responsable_eglise')
const router_responsable_communaute = require('./router/router_responsable_communaute')
const router_Liste_communaute = require('./router/router_Liste_communaute')
const router_actvite_programmes_seamine = require('./router/router_activite_programmes_semaine')




//projet_complet
 mongoose.connect(process.env.lien_bd,
 //mongoose.connect('mongodb+srv://badama:hassane1998COM@expressapi.lzw8bql.mongodb.net/eglise_mellen?retryWrites=true&w=majority&appName=ExpressApi',
// {userNewUrlParser:true,useUnifiedTopology:true

// }
).then(()=>console.log("connexion en mongodb recu"))
 .catch(()=>{
    console.log("connexion n'est pas vraiment  reçu");
 });
//  app.get('/',(req, res)=>{
//     res.send("bonjoure bbbb")
//  });

//rendre le service demande par front
//cors(crousss origine resource sharhne partage) utiliser
app.use((req,res, next)=>{
   res.setHeader('Access-Control-Allow-Origin', '*'); //le lien de requette(localhost, http...)
   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTION');
   next();
});
//passer toutes les donnees en json
app.use(express.json());
//passer les donnees en body  en json
app.use(body_parser.json());


app.use('/api/auth',router_mouvements);
app.use('/api/auth',rooter_projet);
app.use('/api/auth',router_galerie);
app.use('/api/auth',router_admin);
app.use('/api/auth',router_responsable_eglise);
app.use('/api/auth',router_responsable_communaute);
app.use('/api/auth',router_Liste_communaute);



app.use('/api/auth',router_actvite_programmes_seamine);
// app.use('/api/auth',route_sauces);

//app.use('/api/sauces',routerajout);
//chemin en local pour afficher image
app.use('/images', express.static(path.join(__dirname,'images')));
module.exports = app;
