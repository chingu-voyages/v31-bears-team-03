const colorPaletteRouter = require("express").Router()
const ColorPalette = require('../models/ColorPalette.model')
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

//env
const SECRET = 'chingubears3';

colorPaletteRouter.get("/", async(request, response) => {
    var token = request.headers['access_token'];
    if (!token) 
        return response.status(401).send("No token found");
    jwt.verify(token, SECRET, async function(err, decoded) {
        if (err) 
            return res.status(500).send('Failed to authenticate token');

        const colorPalettes = await ColorPalette.find({});
        response.json(colorPalettes.map((colorPalette) => colorPalette.toJSON()));
    });
})

colorPaletteRouter.get("/:id", async(request, response) => {
    var token = request.headers['access_token'];
    if (!token) 
        return response.status(401).send("No token found");
    jwt.verify(token, SECRET, async function(err, decoded) {
        if (err) 
            return response.status(500).send('Failed to authenticate token');

        console.log('getting by id')
        const colorPalette = await ColorPalette.findOne({colorPaletteID: request.params.id});

        if(colorPalette) {
            response.json(colorPalette.toJSON());
        } else {
            response.status(404).end();
        }
    });
})

colorPaletteRouter.post("/generate", async(request, response) => {
    var token = request.headers['access_token'];
    if (!token) 
        return response.status(401).send("No token found");
    jwt.verify(token, SECRET, async function(err, decoded) {
        if (err) 
            return response.status(500).send('Failed to authenticate token');

        const body = request.body;

        const existingPalette = await ColorPalette.findOne({colorPaletteID: request.body.colorPaletteID});

        if (existingPalette) {
            response.json({error: "color palette already generated"})
        } else {

            const colorPalette = new ColorPalette({
                colors: body.colors,
                likes: body.likes || 0,
                colorPaletteID: body.colorPaletteID,
                tags: [] || body.tags
            });
        
            await colorPalette.save();
        
            console.log(colorPalette);
            response.json(colorPalette);
        }
    });
});

colorPaletteRouter.put("/:id/update", async(request, response) => {
    var token = request.headers['access_token'];
    if (!token) 
        return response.status(401).send("No token found");
    jwt.verify(token, SECRET, async function(err, decoded) {
        if (err) 
            return response.status(500).send('Failed to authenticate token');

        const body = request.body;
        const colorPalette = await ColorPalette.findOne({colorPaletteID: request.body.colorPaletteID});
        console.log(colorPalette);
        
        colorPalette.colors = body.colors;
        colorPalette.likes = body.likes;
        colorPalette.colorPaletteID = body.colorPaletteID;
        colorPalette.tags = body.tags;

        console.log(colorPalette);

        await colorPalette.save();
        response.json(colorPalette);
    });
})

module.exports = colorPaletteRouter;
