const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

const settingRoutes = require('./routes/settingRoutes');
const Setting = require('./models/setting');
const contactRoutes = require('./routes/contactRoutes');
const carRoutes = require('./routes/carRoutes');
// const userRoutes = require('./routes/userRoutes');
// const orderRoutes = require('./routes/orderRoutes'); 

dotenv.config();
connectDB();
require("dotenv").config();

const app = express();
connectDB();
app.use(cors());
app.use(express.json());

// Đăng ký route
app.use('/api/setting', settingRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/car', carRoutes); 
// app.use('/api/user', userRoutes);
// app.use('/api/order', orderRoutes);

// ================= CarImgUpload =================
app.use("/uploads", express.static("uploads"));
app.use("/api/car", require("./routes/carRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

// Middleware kiểm tra trạng thái Shutdown
const checkShutdown = async (req, res, next) => {
    try {
        const setting = await Setting.findOne({ key: 'general_settings' });
        // Nếu bật shutdown và KHÔNG PHẢI là request vào trang Admin (tùy chọn)
        if (setting && setting.value.shutdown) {
            return res.status(503).json({ 
                // Mã lỗi 503 Service Unavailable là cách chuẩn nhất để báo với trình duyệt 
                // và các công cụ tìm kiếm (như Google) rằng website chỉ tạm dừng hoạt động 
                // để bảo trì, tránh ảnh hưởng đến SEO của bạn.
                message: "The website is currently under maintenance. Please check back later!",
                isShutdown: true 
            });
        }
        next();
    } catch (err) {
        next(); // Nếu lỗi database thì cho qua để website không sập hoàn toàn
    }
};
// Mã lỗi 503 Service Unavailable là cách chuẩn nhất để báo với trình duyệt 
// và các công cụ tìm kiếm (như Google) rằng website chỉ tạm dừng hoạt động 
// để bảo trì, tránh ảnh hưởng đến SEO của bạn.