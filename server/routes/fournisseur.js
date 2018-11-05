const router = require('express').Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');

mongoose.connect('mongodb://localhost:27017/GestionProduit', {
    useNewUrlParser: true,
    useCreateIndex: true,
});

const fournisseurSchema = require('../models/fournisseur');
const fournisseurModel = mongoose.model('fournisseur', fournisseurSchema);

//CRUD fournisseur

router.post('', async(req, res) => {
    req.body.password = await bcrypt.hashSync(req.body.password);
    const result = await fournisseurModel.create(req.body);
    res.send(result)
});
//login fournisseur
router.post('/login', async(req, res) => {
    const resultLogin = await fournisseurModel.findOne({email : req.body.email})
     if(!resultLogin){
         res.send({message : 'mail not found'})
     }
     if(!bcrypt.compareSync(req.body.password, resultLogin.password)){
         res.send({message: 'not password'})
     }

     const token= jwt.sign({data:resultLogin}, 'secret_code')
     res.send({message: 'ok', usertoken:token});
});

router.get('', async(req, res) => {
    const result = await fournisseurModel.find()
    res.send(result)
});
router.delete('/:id', async(req, res) => {
    const result = await fournisseurModel.remove({_id: req.params.id})
    res.send(result)
});
router.put('/:id', async(req, res) => {
    const result = await fournisseurModel.update({_id: req.params.id}, {$set : req.body})
    res.send(result)
});

//CRUD todo
router.post('/:id', async(req, res)=> {
    const result= await fournisseurModel.update({_id:req.params.id}, {$push: {"todo" : req.body}})
    res.send(result)
});
router.get('/:id', async(req, res)=> {
    const result = await fournisseurModel.findOne({_id : req.params.id})
    res.send(result.todo)
});
router.put('/:id/:index', async(req, res) => {
    const result = await fournisseurModel.update({_id: req.params.id}, {$set: {["todo."+ req.params.index] : req.body}})
    res.send(result)
});
router.delete('/:id/:index', async(req, res) => {
    const result = await fournisseurModel.findOne({_id: req.params.id});
    const reslut2 = await fournisseurModel.update({_id: req.params.id}, {$pull: {todo: result.todo[req.params.index]}});
    res.send(reslut2)
});

module.exports = router;