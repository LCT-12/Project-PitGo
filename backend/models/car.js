const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    carName: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
    year: { type: Number },
    origin: { type: String },
    condition: { type: String, enum: ['New', 'Used'], default: 'New' },
    description: { type: String },
    status: { type: String, enum: ['In Stock', 'Out of Stock', 'Reserved'], default: 'In Stock' }
}, { timestamps: true });

module.exports = mongoose.model('Car', carSchema);