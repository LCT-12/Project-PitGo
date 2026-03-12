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
<<<<<<< HEAD
=======
  // Trạng thái kiểm tra đăng nhập
>>>>>>> 25c79718c567023a851c129a93445b9c5868d89c
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isAdminLoggedIn") === "true");
  const [alert, setAlert] = useState(null);

  // PHẢI ĐỊNH NGHĨA showAlert Ở ĐÂY (TRƯỚC KHI SỬ DỤNG)
  const showAlert = (type, msg) => {
    setAlert({ type, msg });
  };

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

<<<<<<< HEAD
  // NẾU ĐÃ ĐĂNG NHẬP
=======
  const [alert, setAlert] = useState(null);

  // Hàm này tương đương với function alert(type, msg) của bạn
  const showAlert = (type, msg) => {
    setAlert({ type, msg });
  };

  // Nếu ĐÃ đăng nhập - GIAO DIỆN ADMIN CHUẨN
>>>>>>> 546bb341f862ed6dee4fbf320cd427d7f3610b01
>>>>>>> 25c79718c567023a851c129a93445b9c5868d89c
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
        <div className="main">
          <Topbar onLogout={handleLogout} />
          <div className="page-content">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
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