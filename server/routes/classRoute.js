const express = require("express");
const ClassBooking = require("../models/classModel.js");
const Router = express.Router();

Router.get("/", async (req, res) => {
  try {
    const bookings = await ClassBooking.find({});
    res.status(200).json(bookings);
  } catch (error) {
    console.log("[Error] booking GET : " + error.message);
  }
});

Router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await ClassBooking.findById(id);
    res.status(200).json(booking);
  } catch (error) {
    console.log("[Error] class booking GET : " + error.message);
  }
});

Router.post("/", async (req, res) => {
  try {
    const {
      bookedBy,
      email,
      date,
      age,
    } = req.body;
    const booking = new ClassBooking({
      bookedBy: bookedBy,
      email: email,
      date: date,
      age: age,
    });
    await booking.save();
    res
      .status(200)
      .json({ message: "class booking added successfully", booking: booking });
  } catch (error) {
    console.log("[Error] class booking POST : " + error.message);
  }
});

Router.patch("/accept/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBooking = await ClassBooking.findByIdAndUpdate(
      id,
      { $set: { status: "accepted" } },
      { new: true }
    );
    res.status(200).json({
      message: "class booking accepted successfully",
      booking: updatedBooking,
    });
  } catch (error) {
    console.log("[Error] class booking POST : " + error.message);
  }
});

Router.patch("/reject/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBooking = await ClassBooking.findByIdAndUpdate(
      id,
      { $set: { status: "rejected" } },
      { new: true }
    );
    res.status(200).json({
      message: "class booking rejected successfully",
      booking: updatedBooking,
    });
  } catch (error) {
    console.log("[Error] booking POST : " + error.message);
  }
});

Router.delete("/", async (req, res) => {
  try {
    const bookings = await ClassBooking.deleteMany({});
    res.status(200).json({ message: "all class bookings deleted successfully" });
  } catch (error) {
    console.log("[Error] " + error.message);
  }
});

Router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await ClassBooking.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: `class booking ${booking} deleted successfully` });
  } catch (error) {
    console.log("[Error] booking DEL : " + error.message);
  }
});

module.exports = Router;
