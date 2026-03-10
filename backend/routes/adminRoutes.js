const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Admin = require('../models/admin');

router.post('/change-password', async (req, res) => {
    const { old_pass, new_pass } = req.body;

    try {
        // 1. Tìm tài khoản admin (hiện tại giả định bạn chỉ có 1 admin duy nhất)
        const admin = await Admin.findOne({ admin_name: 'admin' });

        // 2. Kiểm tra mật khẩu cũ có đúng không
        const isMatch = await bcrypt.compare(old_pass, admin.admin_pass);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Current password is incorrect!" });
        }

        // 3. Mã hóa mật khẩu mới và lưu lại
        const salt = await bcrypt.genSalt(10);
        admin.admin_pass = await bcrypt.hash(new_pass, salt);
        await admin.save();

        res.json({ success: true, message: "Password changed successfully!" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error!" });
    }
});

module.exports = router;