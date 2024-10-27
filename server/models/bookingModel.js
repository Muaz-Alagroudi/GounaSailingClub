const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    bookedBy: {type: String},
    email: {type: String},
    number: {type: Number},
    boatId: {type: String},
    code: {type: Number},
    boatName: {type: String},
    destination: {type: String},
    date: {type: String},
    slot1: {type: Boolean},
    slot2: {type: Boolean},
    slot3: {type: Boolean},
    status: {type: String},
},{
    timestamps: true
});

const Bookings = mongoose.model('Booking', bookingSchema);
module.exports = Bookings;