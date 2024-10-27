const express = require("express");
const Booking = require("../models/bookingModel.js");
const Router = express.Router();

Router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find({});
    res.status(200).json(bookings);
  } catch (error) {
    console.log("[Error] booking GET : " + error.message);
  }
});

Router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id);
    res.status(200).json(booking);
  } catch (error) {
    console.log("[Error] booking GET : " + error.message);
  }
});

// GET available slots for a specific boat and date
Router.get("/available/:boatId/:date", async (req, res) => {
  try {
    const { boatId, date } = req.params;

    // Find any existing bookings for the boat on the given date
    const bookings = await Booking.find({ boatId, date });
    // console.log(bookings);

    if (bookings) {
      const availableSlots = {
        slot1: true,
        slot2: true,
        slot3: true,
      };
      bookings.forEach((booking) => {
        booking.slot1
          ? (availableSlots.slot1 = false)
          : (availableSlots.slot1 = availableSlots.slot1);
        booking.slot2
          ? (availableSlots.slot2 = false)
          : (availableSlots.slot2 = availableSlots.slot2);
        booking.slot3
          ? (availableSlots.slot3 = false)
          : (availableSlots.slot3 = availableSlots.slot3);
      });
      return res.status(200).json({ ...availableSlots });
    }

    // If no booking exists for this date, all slots are available
    res.status(200).json({ slot1: true, slot2: true, slot3: true });
  } catch (error) {
    console.error("[Error] Get available slots: " + error.message);
    res
      .status(500)
      .json({ message: "Failed to fetch availability", error: error.message });
  }
});

Router.post("/", async (req, res) => {
  try {
    const {
      bookedBy,
      email,
      number,
      boatId,
      code,
      boatName,
      destination,
      date,
      slot1,
      slot2,
      slot3,
      status,
    } = req.body;
    const booking = new Booking({
      bookedBy: bookedBy,
      email: email,
      number: number,
      boatId: boatId,
      code: code,
      boatName: boatName,
      destination: destination,
      date: date,
      slot1: slot1,
      slot2: slot2,
      slot3: slot3,
      status,
    });
    await booking.save();
    res
      .status(200)
      .json({ message: "booking added successfully", booking: booking });
  } catch (error) {
    console.log("[Error] booking POST : " + error.message);
  }
});

Router.patch("/accept/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { $set: { status: "accepted" } },
      { new: true }
    );
    res.status(200).json({
      message: "booking accepted successfully",
      booking: updatedBooking,
    });
  } catch (error) {
    console.log("[Error] booking POST : " + error.message);
  }
});

Router.patch("/reject/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { $set: { status: "rejected" } },
      { new: true }
    );
    res.status(200).json({
      message: "booking rejected successfully",
      booking: updatedBooking,
    });
  } catch (error) {
    console.log("[Error] booking POST : " + error.message);
  }
});

Router.delete("/", async (req, res) => {
  try {
    const bookings = await Booking.deleteMany({});
    res.status(200).json({ message: "all bookings deleted successfully" });
  } catch (error) {
    console.log("[Error] " + error.message);
  }
});

Router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: `booking ${booking} deleted successfully` });
  } catch (error) {
    console.log("[Error] booking DEL : " + error.message);
  }
});

module.exports = Router;
