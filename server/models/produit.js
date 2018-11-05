const mongoose = require('mongoose');

const produit = new mongoose.Schema ({
    file : String,
    name : String,
    description : String,
    price : Number,
    category : String
});
module.exports = produit;