const express = require('express');
const router = express.Router();
const Car = require('../models/car');
const upload = require("../middleware/upload");


// ================= GET ALL =================
router.get('/', async (req, res) => {
  try {
    const cars = await Car.find().sort({ createdAt: -1 });
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ================= GET ONE =================
router.get('/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.json(car);
  } catch {
    res.status(500).json({ message: "Error retrieving car" });
  }
});


// ================= CREATE =================
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const carData = {
      ...req.body,
      image: req.file?.path || null
    };

    const newCar = await Car.create(carData);
    res.status(201).json(newCar);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// ================= UPDATE =================
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const updateData = {
      ...req.body
    };

    if (req.file) updateData.image = req.file.path;

    const updatedCar = await Car.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updatedCar);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ================= DELETE =================
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Car.findByIdAndDelete(req.params.id);

    if (!deleted)
      return res.status(404).json({ message: "Car not found" });

    res.json({ message: "Car deleted successfully" });
  } catch {
    res.status(500).json({ message: "Failed to delete car" });
  }
});


module.exports = router;