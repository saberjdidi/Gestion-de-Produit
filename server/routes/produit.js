const router = require('express').Router();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/GestionProduit', {
    useNewUrlParser : true,
    useCreateIndex : true,
});

produitSchema = require('../models/produit');
produitModel = mongoose.model('produits', produitSchema);

categorieSchema = require('../models/categorie');
categorieModel = mongoose.model('categories', categorieSchema);

commandeSchema = require('../models/commande');
commandeModel = mongoose.model('commande', commandeSchema);

clientSchema = require('../models/client');
clientModel = mongoose.model('client', clientSchema);

contactSchema = require('../models/contact');
contactModel = mongoose.model('contact', contactSchema);


//CRUD categorie
router.post('/categorie', async(req, res) => {
    const result = await categorieModel.create(req.body);
    res.send(result)
});
router.get('/categorie', async(req, res) => {
    const result = await categorieModel.find();
    res.send(result)
});
router.get('/categorie/:id', async(req, res) => {
    const result = await categorieModel.findOne({_id : req.params.id});
    res.send(result)
});
router.delete('/categorie/:id', async(req, res) => {
    const result = await categorieModel.remove({_id : req.params.id});
    res.send(result)
});
router.put('/categorie/:id', async(req, res) => {
    const result = await categorieModel.update({_id : req.params.id}, {$set: req.body});
    res.send(result)
});

//CRUD Produits
router.post('/produits', async(req, res) => {
   // const result = await categorieModel.find();
    const result = await produitModel.create(req.body) // {$push: {category : result }}  //.populate({path : 'category'})

    res.send(result) 
});
router.get('/produits', async(req, res) => {
    const result = await produitModel.find()     //.populate({path : 'category'})
    res.send(result)
});
router.get('/produits/:id', async(req, res) => {
    const result = await produitModel.findOne({_id: req.params.id})       //.populate({path : 'category'})
    res.send(result)
});
router.delete('/produits/:id', async(req, res) => {
    const result = await produitModel.remove({_id: req.params.id})
    res.send(result)
});
router.put('/produits/:id', async(req, res) => {
    const result = await produitModel.update({_id : req.params.id}, {$set : req.body})
    res.send(result)
});

//CRUD Commande
router.post('/commande', async(req, res) => {
    //const result1 = await produitModel.findOne({_id : req.params.id});
    const result = await commandeModel.create(req.body);
   // const result2 = await commandeModel.update({$push: {num_prod : result1._id }})
    res.send(result)
});
router.get('/commande', async(req, res) => {
    const result = await commandeModel.find().populate({path : 'num_prod'}).populate({path : 'num_client'})
    res.send(result)
});
router.get('/commande/:id', async(req, res) => {
    const result = await commandeModel.findOne({_id:req.params.id}).populate({path : 'num_prod'}).populate({path : 'num_client'})
    res.send(result)
});
router.delete('/commande/:id', async(req, res) => {
    const result = await commandeModel.remove({_id:req.params.id})
    res.send(result)
});
router.put('/commande/:id', async(req, res) => {
    const result = await commandeModel.update({_id:req.params.id}, {$set : req.body})
    res.send(result)
});

//CRUD contact
router.post('/contact', async(req, res) => {
    const result = await contactModel.create(req.body)
    res.send(result)
});
router.get('/contact', async(req, res) => {
    const result = await contactModel.find();
    res.send(result)
});
router.delete('/contact/:id', async(req, res) => {
    const result = await contactModel.remove({_id: req.params.id});
    res.send(result)
});
router.put('/contact/:id', async(req, res) => {
    const result = await contactModel.update({_id : req.params.id}, {$set : req.body})
    res.send(result)
});

module.exports = router;