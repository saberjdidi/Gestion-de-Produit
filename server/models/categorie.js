const mongoose = require('mongoose');

const categorie = new mongoose.Schema({
    title : String,
    description : String
});
module.exports = categorie;