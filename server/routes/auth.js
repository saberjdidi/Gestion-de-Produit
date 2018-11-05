const router = require('express').Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');

mongoose.connect('mongodb://localhost:27017/GestionProduit', {
    useNewUrlParser : true,
    useCreateIndex : true,
});

clientSchema = require('../models/client');
clientModel = mongoose.model('client', clientSchema);

router.post('/register', async(req, res) => {
    req.body.password = await bcrypt.hashSync(req.body.password);
    const result = await clientModel.create(req.body).then().catch(err => {
        res.send(err)
        return
    });
    res.send(result)
});

router.post('/login', async(req, res) => {
    const resultLogin = await clientModel.findOne({email:req.body.email});
    if(!resultLogin){
        res.send({message : 'user not found'});
    }
    if(!bcrypt.compareSync(req.body.password, resultLogin.password)){
        res.send({message : 'is not password'})
    }
    if(!resultLogin.access){
        res.send({message : 'access denied'})
    }
    const token = jwt.sign({data:resultLogin}, 'secret_code');
    res.send({message : 'ok', usertoken:token})
});

router.get('/client', async(req, res) => {
    const result = await clientModel.find();
    res.send(result);
});
router.delete('/client/:id', async(req, res) => {
    const result = await clientModel.remove({_id: req.params.id})
    res.send(result)
});
router.put('/client/:id', async(req, res) => {
    const result = await clientModel.update({_id: req.params.id}, {$set : req.body});
    res.send(result)
});

module.exports = router;