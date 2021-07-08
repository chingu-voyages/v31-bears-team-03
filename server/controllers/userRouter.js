var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
const userRouter = require("express").Router()
const ColorPalette = require('../models/ColorPalette.model')
const User = require('../models/User.model')

//env
const SECRET = 'chingubears3';

userRouter.route('/register').post(function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0)
        return res.status(400).send('Empty body');

    var hashedPassword = bcrypt.hashSync(req.body.password, 8);

    let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    user.save()
        .then(user => {
            return res.status(200).send({ success: true });
        })
        .catch(err => {
            if(err.code && err.code == 11000) 
                return res.status(400).send('Email already in use');
            else
                return res.status(400).send('Server error');
        });
});

userRouter.route('/testget').get(function(req, res) {
    var token = req.headers['access_token'];
    if (!token) 
        return res.status(401).send("No token found");
    jwt.verify(token, SECRET, async function(err, decoded) {
        if (err) 
            return res.status(500).send('Failed to authenticate token');
        
        User.findById(decoded.id, function (err, user) {
            if (!user)
                return res.status(404).send("No user found");
            if (err)
                return res.status(500).send("Server error");
            
            res.status(200).send(user);
        });
    });
});

userRouter.route('/palettes/add').put(async function (req, res) {
    var token = req.headers['access_token'];
    if (!token) 
        return res.status(401).send("No token found");

    jwt.verify(token, SECRET, async function(err, decoded) {
        if (err) 
            return res.status(500).send('Failed to authenticate token');

        const body = req.body;
        const paletteToAdd = body.colorPaletteID
        const user = await User.findOne({ email: req.body.email });
        console.log(user)
        if (!user.likedPalettes.includes(paletteToAdd)) {
            user.likedPalettes = [...user.likedPalettes, paletteToAdd]
            
            // Increment the likes of the color palette
            const colorPalette = await ColorPalette.findOne({colorPaletteID: paletteToAdd});
            console.log(colorPalette)
            colorPalette.likes = colorPalette.likes + 1;
            await colorPalette.save();
            
        } else {
            return res.status(400).send('Color palette already in saved palettes');
        }
        
        await user.save();
        res.json(user);
    });
})

userRouter.route('/palettes/remove').put(async function (req, res) {
    var token = req.headers['access_token'];
    if (!token) 
        return res.status(401).send("No token found");

    jwt.verify(token, SECRET, async function(err, decoded) {
        if (err) 
            return res.status(500).send('Failed to authenticate token');

        const body = req.body;
        const paletteToAdd = body.colorPaletteID
        const user = await User.findOne({ email: req.body.email });
        console.log(user)
        if (user.likedPalettes.includes(paletteToAdd)) {
            user.likedPalettes = user.likedPalettes.filter(palette => palette != paletteToAdd)

            // Decrement color palette likes by 1
            const colorPalette = await ColorPalette.findOne({colorPaletteID: paletteToAdd});
            console.log(colorPalette)
            colorPalette.likes = colorPalette.likes - 1;
            await colorPalette.save();
            
        } else {
            return res.status(400).send('Color palette not in saved palettes');
        }
        
        await user.save();
        res.json(user);
    });
})

module.exports = userRouter;