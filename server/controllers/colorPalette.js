const colorPaletteRouter = require("express").Router()
const ColorPalette = require('../models/ColorPalette.model')

colorPaletteRouter.get("/", async(request, response) => {
    const colorPalettes = await ColorPalette.find({});
    response.json(colorPalettes.map((colorPalette) => colorPalette.toJSON()));
})

colorPaletteRouter.get("/:id", async(request, response) => {
    console.log('getting by id')
    const colorPalette = await ColorPalette.findById(request.params.id);

    if(colorPalette) {
        response.json(colorPalette.toJSON());
    } else {
        response.status(404).end();
    }
})

colorPaletteRouter.post("/generate", async(request, response) => {
    const body = request.body;

    const colorPalette = new ColorPalette({
        colors: body.colors,
        likes: body.likes || 0,
        colorPaletteID: body.colorPaletteID,
        tags: [] || body.tags
    });

    await colorPalette.save();

    console.log(colorPalette)
    response.json(colorPalette)
});

module.exports = colorPaletteRouter;
