import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

// Components Public
import Header from "./components/Header";
import Footer from "./components/Footer";
import Maintenance from "./components/Maintenance";

// Pages
<<<<<<< HEAD
import Login from "./pages/Login";
import Home from "./pages/Home"; 
import AllCar from "./pages/allCar";
import CarDetail from "./pages/CarDetail";
import Contact from "./pages/Contact";
import Service from "./pages/Service";
=======
import Home from "./pages/Home";
import AllCar from "./pages/allCar";
import CarDetail from "./pages/CarDetail";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
>>>>>>> f4beb15f63b5ad657b3fa774840a7f42c9957005

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
      const response = await axios.get("http://localhost:5000/api/setting/");
      if (response.data.general_settings) {
        const shutdownStatus = response.data.general_settings.shutdown;
        setIsShutdown(shutdownStatus);

        // Cập nhật tiêu đề trang luôn cho đồng bộ
        document.title =
          response.data.general_settings.site_title || "Project-SX";
      }
    } catch (error) {
      console.error("Error checking system status:", error);
    }
  };

  useEffect(() => {
    const checkStatus = async () => {
      try {
        // Gọi tới API của Backend (đảm bảo URL này đúng với server của bạn)
        const response = await axios.get("http://localhost:5000/api/setting/");
        if (response.data.general_settings) {
          setIsShutdown(response.data.general_settings.shutdown);
          // Tiện thể cập nhật Title cho trang User luôn
          document.title =
            response.data.general_settings.site_title || "My Project";
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
      {/* Route Login đứng riêng (không cần Header/Footer) */}
      <Route path="/" element={<Login />} />

<<<<<<< HEAD
      <Route path="/" element={<Login />} />
        <Route element={<PublicLayout />}>

=======
      {/* BAO BỌC TẤT CẢ TRANG PUBLIC VÀO TRONG LAYOUT CHUNG */}
      <Route element={<PublicLayout />}>
>>>>>>> f4beb15f63b5ad657b3fa774840a7f42c9957005
        <Route path="/home" element={<Home />} />

        {/* Trang danh sách tất cả xe */}
        <Route path="/all-cars" element={<AllCar />} />

        {/* Trang Liên hệ */}
        <Route path="/contact" element={<Contact />} />

<<<<<<< HEAD
        {/* Trang Bảo dưỡng */}
        <Route path="service" element={<Service />} />

        {/* Trang danh sách xe theo hãng (Ví dụ: /Ferrari) */}
        <Route path=":brandName" element={<AllCar />} />
=======
        {/* Trang danh sách xe theo hãng */}
        <Route path="/:brandName" element={<AllCar />} />
>>>>>>> f4beb15f63b5ad657b3fa774840a7f42c9957005

        {/* Trang chi tiết xe */}
        <Route path="/car/:id" element={<CarDetail />} />
      </Route>
    </Routes>
  );
}

export default App;