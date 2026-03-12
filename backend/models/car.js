const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    // Thông tin cơ bản
    carName: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true }, // Lưu số (ví dụ: 128) để tiện sort
    image: { type: String }, // URL ảnh (từ Cloudinary hoặc Server)
    public_id: { type: String }, // Dùng nếu bạn xài Cloudinary để xóa ảnh
    
    // Thông số kỹ thuật
    year: { type: Number },
    top_speed: { type: String }, // e.g. "340 km/h"
    acceleration: { type: String }, // e.g. "2.5s"
    engine: { type: String }, // e.g. "V8"
    horsePower: { type: Number }, // e.g. 670
    fuel_type: { type: String }, // Xăng, Điện, Hybrid
    origin: { type: String },
    
    // Phân loại và trạng thái
    isTrackOnly: { type: Boolean, default: true }, // Khớp với setisTrackOnly(true/false)
    description: { type: String },
    status: { 
        type: String, 
        enum: ['Có sẵn', 'Hết Hàng'], 
        default: 'Có sẵn' 
    } // Khớp với handleStatusChange và badge trong table
}, { 
    timestamps: true // Tự động tạo createdAt và updatedAt
});

const Car = mongoose.model('Car', carSchema);
module.exports = Car;