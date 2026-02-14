// backend/routes/settingRoutes.js
const express = require('express');
const router = express.Router();
const Setting = require('../models/setting');

router.get('', async (req, res) => { 
    try {
        const setting = await Setting.find();
        const config = setting.reduce((acc, curr) => {
            acc[curr.key] = curr.value;
            return acc;
        }, {});
        res.json(config);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// Cập nhật hoặc thêm mới cấu hình
router.post('/update', async (req, res) => {
    try {
        const { key, value } = req.body;
        // upsert: true giúp tự động tạo mới nếu key chưa tồn tại
        const updatedSetting = await Setting.findOneAndUpdate(
            { key }, 
            { value }, 
            { upsert: true, new: true }
        );
        res.json(updatedSetting);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;