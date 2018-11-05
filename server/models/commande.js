const mongoose = require('mongoose');

const commande = new mongoose.Schema({
    date : {
        type : Date,
        default : Date.now()
    },
    qteprod : Number,
    num_prod : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'produits'
    },
    num_client: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'client'
    }
});
module.exports = commande;