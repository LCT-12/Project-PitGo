const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

// 1. Lấy danh sách (GET)
router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 2. Cập nhật "Tất cả trong một" (PATCH)
// Thay thế cho: important, undo, và update status
router.patch('/:id', async (req, res) => {
    try {
        const updatedContact = await Contact.findByIdAndUpdate(
            req.params.id, 
            req.body, // Frontend gửi {isImportant: true} hoặc {isDeleted: false},...
            { new: true }
        );
        if (!updatedContact) return res.status(404).json({ message: "Không tìm thấy" });
        res.json(updatedContact);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 3. Xóa vĩnh viễn (DELETE)
router.delete('/:id', async (req, res) => {
    try {
        await Contact.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted permanently" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 4. Tạo mới (POST)
router.post('/', async (req, res) => {
    const contact = new Contact(req.body);
    try {
        const newContact = await contact.save();
        res.status(201).json(newContact);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;