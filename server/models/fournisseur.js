const mongoose = require('mongoose');

const fournisseur = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    todo: [{
        phone: Number,
        address: String,
        salary: Number
    }]
});
module.exports = fournisseur;