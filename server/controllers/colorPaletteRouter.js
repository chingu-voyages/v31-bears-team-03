const colorPaletteRouter = require("express").Router()
const ColorPalette = require('../models/ColorPalette.model')

colorPaletteRouter.get("/", async(request, response) => {
    const colorPalettes = await ColorPalette.find({});
    response.json(colorPalettes.map((colorPalette) => colorPalette.toJSON()));
})

colorPaletteRouter.get("/:id", async(request, response) => {
    console.log('getting by id')
    const colorPalette = await ColorPalette.findOne({colorPaletteID: request.params.id});

    if(colorPalette) {
        response.json(colorPalette.toJSON());
    } else {
        response.status(404).end();
    }
})

colorPaletteRouter.post("/generate", async(request, response) => {
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

colorPaletteRouter.put("/:id/update", async(request, response) => {
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
})

module.exports = colorPaletteRouter;
