const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {type: String},
    email: {type: String, unique: true},
    number: {type: Number},
    role: {type: String},
    password: {type: String}
},{
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;