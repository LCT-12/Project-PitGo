const express = require('express');
const router = express.Router();
const Car = require('../models/car');
const upload = require("../middleware/upload");
const cloudinary = require("../config/cloudinary");


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
    let imageData = {};

    if (req.file) {
      const result = await cloudinary.uploader.upload_stream(
        { folder: "cars" },
        async (error, result) => {
          if (error) {
            return res.status(500).json({ message: "Upload failed" });
          }

          imageData = {
            image: result.secure_url,
            public_id: result.public_id,
          };

          const car = await Car.create({
            ...req.body,
            ...imageData,
          });

          res.status(201).json(car);
        }
      );

      result.end(req.file.buffer);
    } else {
      const car = await Car.create(req.body);
      res.status(201).json(car);
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});


// ================= UPDATE =================
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updated = await Car.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ================= DELETE =================
router.delete("/:id", async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    if (car.public_id) {
      await cloudinary.uploader.destroy(car.public_id);
    }

    await car.deleteOne();

    res.json({ message: "Car deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});

module.exports = router;