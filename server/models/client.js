const mongoose = require('mongoose');

const client = new mongoose.Schema({
    file : String,
    name : String,
    lastname : String,
    phone : Number,
    email : String,
    password : String,
    access : {
        type: Boolean,
        default: true
    },
    role : {
        type: String,
        enum : ['admin', 'client', 'fournisseur'],
        default : 'client'
    }
});

module.exports = client;