import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

// Components Public
import Header from "./components/Header";
import Footer from "./components/Footer";
import Maintenance from "./components/Maintenance";

// Pages
import Home from "./pages/Home"; 
import AllCar from "./pages/allCar";
import CarDetail from "./pages/CarDetail";
import Login from "./pages/Login";

// --- LAYOUT CHO KHU VỰC TRANG CHỦ (PUBLIC) ---
const PublicLayout = () => {
  return (
    <div className="public-layout">
      <Header />
      <main className="public-content">
        <Outlet /> {/* Nơi hiển thị Home và các trang khách hàng khác */}
      </main>
      <Footer />
    </div>
  );
};

function App() {
  const [isShutdown, setIsShutdown] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const checkStatus = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/setting/');
        if (response.data.general_settings) {
            const shutdownStatus = response.data.general_settings.shutdown;
            setIsShutdown(shutdownStatus);
            
            // Cập nhật tiêu đề trang luôn cho đồng bộ
            document.title = response.data.general_settings.site_title || "Project-SX";
        }
    } catch (error) {
        console.error("Error checking system status:", error);
    }
  };
  
  useEffect(() => {
    const checkStatus = async () => {
        try {
            // Gọi tới API của Backend (đảm bảo URL này đúng với server của bạn)
            const response = await axios.get('http://localhost:5000/api/setting/');
            if (response.data.general_settings) {
                setIsShutdown(response.data.general_settings.shutdown);
                // Tiện thể cập nhật Title cho trang User luôn
                document.title = response.data.general_settings.site_title || "My Project";
            }
        } catch (error) {
            console.error("Error fetching status:", error);
        } finally {
            setLoading(false);
        }
    };
    checkStatus();
  }, [location]);

  if (loading) return null; // Hoặc hiệu ứng loading nhẹ

  // Nếu Shutdown được bật, chặn đứng và chỉ hiện trang Maintenance
  if (isShutdown) {
      return <Maintenance />;
  }
  return (
    <Routes>

        <Route path="/" element={<Login />} />
      
        <Route path="/home" element={<Home />} />
        
        {/* Trang danh sách tất cả xe */}
        <Route path="all-cars" element={<AllCar />} />

        {/* Trang danh sách xe theo hãng (Ví dụ: /Ferrari) */}
        <Route path=":brandName" element={<AllCar />} />

        {/* Trang chi tiết xe */}
        {/* Lưu ý: Bỏ dấu / ở đầu để nó hiểu là nối tiếp từ Route cha */}
        <Route path="/car/:id" element={<CarDetail />} />
      
    </Routes>
  );
}

export default App;