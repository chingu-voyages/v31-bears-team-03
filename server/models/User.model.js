const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    likedPalettes: {
        type: Array
    }
});

module.exports = mongoose.model('User', UserSchema);