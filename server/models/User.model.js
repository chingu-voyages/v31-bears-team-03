const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String,
    },
    password: {
        type: String
    },
    likedPalettes: {
        type: Array
    },
    googleid: {
        type: String
    },
    githubid: {
        type: String
    },
    facebookid: {
        type: String
    },
    provider: { 
        type: String
    }
});

module.exports = mongoose.model('User', UserSchema);