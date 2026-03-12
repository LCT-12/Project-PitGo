<<<<<<< HEAD
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";
=======
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
>>>>>>> 546bb341f862ed6dee4fbf320cd427d7f3610b01
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
<<<<<<< HEAD
=======
  // Trạng thái kiểm tra đăng nhập
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isAdminLoggedIn") === "true");

>>>>>>> 546bb341f862ed6dee4fbf320cd427d7f3610b01
  useEffect(() => {
    const fetchGlobalSettings = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/setting/');
        if (response.data.general_settings) {
<<<<<<< HEAD
          // Áp dụng Site Title cho toàn bộ ứng dụng
=======
>>>>>>> 546bb341f862ed6dee4fbf320cd427d7f3610b01
          document.title = response.data.general_settings.site_title || "Project-SX";
        }
      } catch (error) {
        console.error("Failed to load system configuration:", error);
      }
    };
<<<<<<< HEAD

    fetchGlobalSettings();
  }, []);
  
=======
    fetchGlobalSettings();
  }, []);

  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    setIsLoggedIn(false);
  };

  // Nếu CHƯA đăng nhập
  if (!isLoggedIn) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Login onLoginSuccess={() => setIsLoggedIn(true)} />} />
        </Routes>
      </BrowserRouter>
    );
  }

  const [alert, setAlert] = useState(null);

  // Hàm này tương đương với function alert(type, msg) của bạn
  const showAlert = (type, msg) => {
    setAlert({ type, msg });
  };

  // Nếu ĐÃ đăng nhập - GIAO DIỆN ADMIN CHUẨN
>>>>>>> 546bb341f862ed6dee4fbf320cd427d7f3610b01
  return (
    <BrowserRouter>
      {/* Hiển thị Alert toàn cục */}
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
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/cars" element={<Cars showAlert={showAlert} />} />
              <Route path="/customers" element={<Customers showAlert={showAlert} />} />
              <Route path="/orders" element={<Orders showAlert={showAlert} />} />
              <Route path="/contacts" element={<Contacts showAlert={showAlert} />} />
              <Route path="/settings" element={<Settings showAlert={showAlert} />} />
              {/* Thêm Route dự phòng nếu gõ sai đường dẫn */}
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;