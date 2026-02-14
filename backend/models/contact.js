const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String },
    message: { type: String, required: true },
    status: { type: String, enum: ['Unread', 'Read', 'Replied'], default: 'Unread' },
    isImportant: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false } // Phục vụ tính năng Soft Delete
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);