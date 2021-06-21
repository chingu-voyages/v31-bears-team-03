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

colorPaletteSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model("ColorPalette", colorPaletteSchema);

