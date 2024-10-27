const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    bookedBy: {type: String},
    email: {type: String},
    number: {type: Number},
    date: {type: String},
    status: {type: String, default: 'pending'},
    age: {type: Number}
},{
    timestamps: true
});

const ClassBookings = mongoose.model('ClassBooking', bookingSchema);
module.exports = ClassBookings;