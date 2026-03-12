const express = require('express');
const router = express.Router();
const upload = require("../middleware/upload");
const carController = require("../controllers/carController");

router.get('/', carController.getAllCars);
router.post("/", upload.single("image"), carController.createCar);
router.put("/:id", upload.single("image"), carController.updateCar);
router.delete("/:id", carController.deleteCar);

module.exports = router;