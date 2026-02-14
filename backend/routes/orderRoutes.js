const express = require('express');
const router = express.Router();
const Order = require('../models/order');

// Lấy danh sách đơn hàng (kèm thông tin khách và xe)
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('customer', 'userName email phone') // Chỉ lấy các trường cần thiết
            .populate('car', 'carName brand price')
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Tạo đơn hàng mới với mã tự động (ORD-YYYYMMDD-Random)
router.post('/', async (req, res) => {
    try {
        const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
        const randomStr = Math.random().toString(36).substring(2, 7).toUpperCase();
        const autoOrderId = `ORD-${dateStr}-${randomStr}`;

        const newOrder = new Order({
            ...req.body,
            orderId: autoOrderId
        });

        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;