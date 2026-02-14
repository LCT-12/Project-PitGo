const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    dob: { type: String },
    nationalId: { type: String },
    country: { type: String },
    address: { type: String },
    role: { type: String, enum: ['Standard', 'VIP'], default: 'Standard' },
    accountStatus: { type: String, enum: ['Active', 'Locked'], default: 'Active' }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);