const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    about: String
});

module.exports = mongoose.model('users',UserSchema);