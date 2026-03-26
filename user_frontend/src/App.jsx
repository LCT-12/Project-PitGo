import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

// Components Public
import Header from "./components/Header";
import Footer from "./components/Footer";
import Maintenance from "./components/Maintenance";
import CustomAlert from "./components/CustomAlert";

// Pages
import Login from "./pages/Login";
import Home from "./pages/Home"; 
import AllCar from "./pages/allCar";
import CarDetail from "./pages/CarDetail";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import Cart from "./pages/Cart";

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

  const [alert, setAlert] = useState(null);

  const showAlert = (type, msg) => {
    setAlert({ type, msg });
  };

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
    <>
        {/* Alert hiển thị chung cho toàn bộ App */}
        {alert && (
          <CustomAlert 
            type={alert.type} 
            msg={alert.msg} 
            onClose={() => setAlert(null)} 
          />
        )}
    <Routes>
      {/* Route Login đứng riêng (không cần Header/Footer) */}

      <Route path="/login" element={<Login showAlert={showAlert} />} />
        <Route element={<PublicLayout />}>

        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />

        {/* Trang danh sách tất cả xe */}
        <Route path="/all-cars" element={<AllCar />} />

        {/* Trang Giỏ hàng */}
        <Route path="/cart" element={<Cart showAlert={showAlert} />} />

        {/* Trang Liên hệ */}
        <Route path="/contact" element={<Contact showAlert={showAlert} />} />

        {/* Trang Bảo dưỡng */}
        <Route path="/services" element={<Services />} />

        {/* Trang danh sách xe theo hãng (Ví dụ: /Ferrari) */}
        <Route path=":brandName" element={<AllCar />} />

        {/* Trang chi tiết xe */}
        <Route path="/car/:id" element={<CarDetail showAlert={showAlert} />} />
      </Route>
    </Routes>
    </>
  );
}

export default App;