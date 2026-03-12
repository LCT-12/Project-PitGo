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
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isAdminLoggedIn") === "true");
  const [alert, setAlert] = useState(null);

  // PHẢI ĐỊNH NGHĨA showAlert Ở ĐÂY (TRƯỚC KHI SỬ DỤNG)
  const showAlert = (type, msg) => {
    setAlert({ type, msg });
  };

  useEffect(() => {
    const fetchGlobalSettings = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/setting/');
        if (response.data.general_settings) {
          document.title = response.data.general_settings.site_title || "Project-SX";
        }
      } catch (error) {
        console.error("Failed to load system configuration:", error);
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

  // NẾU ĐÃ ĐĂNG NHẬP
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