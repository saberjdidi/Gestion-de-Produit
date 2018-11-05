const mongoose = require('mongoose');

const contact = new mongoose.Schema({
    name : String,
    email : String,
    title : String,
    message : String,
    etat : String
});

module.exports = contact;