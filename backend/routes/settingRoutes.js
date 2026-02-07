// backend/routes/settingRoutes.js
const express = require('express');
const router = express.Router();
const Setting = require('../models/setting');

// Thay vì '/' bạn để rỗng hoặc viết rõ ra
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

module.exports = router;