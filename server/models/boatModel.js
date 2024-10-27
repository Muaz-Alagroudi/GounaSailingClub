const mongoose = require('mongoose');

const boatSchema = new mongoose.Schema({
    name: {type: String},
    type: {type: String},
    capacity: {type: Number},
    images: [{type: String}],
    status: {type: String },
})

const Boats = mongoose.model('Boat', boatSchema);
module.exports = Boats;