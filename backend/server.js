const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

const settingRoutes = require('./routes/settingRoutes');
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