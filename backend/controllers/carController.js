const Car = require("../models/car");
const cloudinary = require("../config/cloudinary");

// ================= CREATE =================
exports.createCar = async (req, res) => {
  try {
    let imageData = {};
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "cars" },
          (error, result) => {
            if (error) reject(error);
            resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });
      imageData = { image: result.secure_url, public_id: result.public_id };
    }

    const car = await Car.create({
      ...req.body,
      ...imageData,
      // Chuyển đổi dữ liệu từ FormData (luôn là string) sang đúng kiểu của Schema
      price: Number(req.body.price),
      year: Number(req.body.year),
      horsePower: Number(req.body.horsePower),
      isTrackOnly: req.body.isTrackOnly === 'true'
    });
    res.status(201).json(car);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ================= UPDATE =================
exports.updateCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: "Không tìm thấy xe" });

    let updateData = { ...req.body };

    if (req.file) {
      // 1. Xóa ảnh cũ trên Cloudinary nếu có
      if (car.public_id) {
        await cloudinary.uploader.destroy(car.public_id);
      }
      // 2. Upload ảnh mới
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "cars" },
          (error, result) => {
            if (error) reject(error);
            resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });
      updateData.image = result.secure_url;
      updateData.public_id = result.public_id;
    }

    // Đảm bảo kiểu dữ liệu đúng cho MongoDB
    if (req.body.price) updateData.price = Number(req.body.price);
    if (req.body.isTrackOnly !== undefined) updateData.isTrackOnly = req.body.isTrackOnly === 'true';

    const updated = await Car.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ================= CÁC HÀM KHÁC =================
exports.getAllCars = async (req, res) => {
  try {
    const cars = await Car.find().sort({ createdAt: -1 });
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (car?.public_id) await cloudinary.uploader.destroy(car.public_id);
    await Car.findByIdAndDelete(req.params.id);
    res.json({ message: "Xóa thành công" });
  } catch (err) {
    res.status(500).json({ message: "Xóa thất bại" });
  }
};