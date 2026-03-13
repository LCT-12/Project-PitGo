import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import CustomAlert from "./components/CustomAlert";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Cars from "./pages/Cars";
import Customers from "./pages/Customers";
import Orders from "./pages/Orders";
import Contacts from "./pages/Contacts";
import Settings from "./pages/Settings";

function App() {
  // Trạng thái kiểm tra đăng nhập
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isAdminLoggedIn") === "true");

  // State for managing alerts
  const [alert, setAlert] = useState(null);

  const showAlert = (type, msg) => {
    setAlert({ type, msg });
  };

  useEffect(() => {
    const fetchGlobalSettings = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/setting/');
        if (response.data.general_settings) {
          // Áp dụng Site Title cho toàn bộ ứng dụng
          document.title = response.data.general_settings.site_title || "Project-SX";
        }
      } catch (error) {
        console.error("Không thể lấy cấu hình hệ thống:", error);
      }
    };

    fetchGlobalSettings();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    setIsLoggedIn(false);
  };

  // NẾU CHƯA ĐĂNG NHẬP
  if (!isLoggedIn) {
    return (
      <BrowserRouter>
        {alert && (
          <CustomAlert 
            type={alert.type} 
            msg={alert.msg} 
            onClose={() => setAlert(null)} 
          />
        )}
        <Routes>
          {/* Truyền showAlert vào đây */}
          <Route path="*" element={<Login onLoginSuccess={() => setIsLoggedIn(true)} showAlert={showAlert} />} />
        </Routes>
      </BrowserRouter>
    );
  }

  // Nếu ĐÃ đăng nhập - GIAO DIỆN ADMIN CHUẨN
  return (
    <BrowserRouter>
      {alert && (
        <CustomAlert 
          type={alert.type} 
          msg={alert.msg} 
          onClose={() => setAlert(null)}
        />
      )}
      <div className="admin-layout"> 
        <Sidebar />

        <div className="main"> {/* Đổi từ main-content thành main để khớp CSS */}
          <Topbar onLogout={handleLogout} />

          <div className="page-content"> {/* Đổi từ page-container thành page-content để khớp CSS */}
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login onLoginSuccess={() => setIsLoggedIn(true)} showAlert={showAlert} />} />
              <Route path="/dashboard" element={<Dashboard showAlert={showAlert} />} />
              <Route path="/cars" element={<Cars showAlert={showAlert} />} />
              <Route path="/customers" element={<Customers showAlert={showAlert} />} />
              <Route path="/orders" element={<Orders showAlert={showAlert} />} />
              <Route path="/contacts" element={<Contacts showAlert={showAlert} />} />
              <Route path="/settings" element={<Settings showAlert={showAlert} />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;