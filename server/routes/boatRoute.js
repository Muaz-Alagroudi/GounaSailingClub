const express = require("express");
const Boat = require("../models/boatModel.js");
const Router = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/boats"); // Save to "uploads" folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Use timestamp as filename
  },
});

const upload = multer({ storage: storage });

Router.get("/", async (req, res) => {
  try {
    const boats = await Boat.find({});
    res.status(200).json(boats);
  } catch (error) {
    console.log("[ERROR] boat route : " + error.message);
  }
});

Router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const boat = await Boat.findById(id);
    res.status(200).json(boat);
  } catch (error) {
    console.log("[ERROR] boat route : " + error.message);
  }
});

Router.post("/", upload.array("images", 5), async (req, res) => {
  try {
    console.log(req.body);
    const { name, type, description, capacity } = req.body;
    const imagePaths = req.files.map((file) => file.filename);
    const boat = new Boat({
      name,
      type,
      description,
      capacity,
      images: imagePaths,
    });
    await boat.save();
    res.status(201).json({
      message: "New boat added successfully!",
      boat: boat,
    });
  } catch (error) {
    console.log("[ERROR] boat route : " + error.message);
  }
});

Router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const boat = await Boat.findByIdAndDelete(id);
    res.status(200).json(boat);
  } catch (error) {
    console.log("[ERROR] boat route : " + error.message);
  }
});

Router.put("/:id", upload.array("images", 5), async (req, res) => {
    try {
        const { id } = req.params;
      const { name, type, description, capacity } = req.body;
      const imagePaths = req.files.map((file) => file.filename);
      const boat = {
        name,
        type,
        description,
        capacity,
        images: imagePaths,
      };
      await Boat.findByIdAndUpdate(id, boat);
      res.status(201).json({
        message: "Boat updated successfully!",
        boat: boat,
      });
    } catch (error) {
      console.log("[ERROR] boat route : " + error.message);
    }
  });

  Router.patch("/available/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updatedBooking = await Boat.findByIdAndUpdate(
        id,
        { $set: { status: "available" } },
        { new: true }
      );
      res.status(200).json({
        message: "boat made available",
        booking: updatedBooking,
      });
    } catch (error) {
      console.log("[Error] boat patch av : " + error.message);
    }
  });

  Router.patch("/unavailable/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updatedBooking = await Boat.findByIdAndUpdate(
        id,
        { $set: { status: "unavailable" } },
        { new: true }
      );
      res.status(200).json({
        message: "boat made unavailable",
        booking: updatedBooking,
      });
    } catch (error) {
      console.log("[Error] boat patch unav : " + error.message);
    }
  });
module.exports = Router;
