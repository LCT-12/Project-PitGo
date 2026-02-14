const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

// 1. Lấy danh sách tin nhắn (GET)
// Tự động sắp xếp tin nhắn mới nhất lên đầu
router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 2. Cập nhật tin nhắn (PATCH)
// Dùng cho: Đổi trạng thái Read/Replied, Đánh dấu Important, hoặc Xóa mềm (isDeleted)
router.patch('/:id', async (req, res) => {
    try {
        const updatedContact = await Contact.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true } // Trả về bản ghi sau khi đã cập nhật
        );
        if (!updatedContact) {
            return res.status(404).json({ message: "Không tìm thấy tin nhắn" });
        }
        res.json(updatedContact);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 3. Tạo tin nhắn mới (POST) - Dùng khi khách hàng gửi form từ website
router.post('/', async (req, res) => {
    const contact = new Contact({
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message
    });

    try {
        const newContact = await contact.save();
        res.status(201).json(newContact);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// QUAN TRỌNG: Xuất router để server.js có thể sử dụng
module.exports = router;