const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const colorPaletteSchema = new Schema({
    colors: {
        type: [Object],
        required: true,
        minlength: 1,
    },
    likes: {
        type: Number,
        required: true
    },
    colorPaletteID: {
        type: String,
        required: true,
    },
    tags: {
        type: [String]
    }
})

module.exports = mongoose.model("ColorPalette", colorPaletteSchema);

