import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";
import axios from "axios";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

import Dashboard from "./pages/Dashboard";
import Cars from "./pages/Cars";
import Customers from "./pages/Customers";
import Orders from "./pages/Orders";
import Contacts from "./pages/Contacts";
import Settings from "./pages/Settings";

function App() {
  useEffect(() => {
    const fetchGlobalSettings = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/setting/');
        if (response.data.general_settings) {
          // Áp dụng Site Title cho toàn bộ ứng dụng
          document.title = response.data.general_settings.site_title || "Project-SX";
        }
      } catch (error) {
        console.error("Failed to load system configuration:", error);
      }
    };

    fetchGlobalSettings();
  }, []);
  
  return (
    <BrowserRouter>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar />

        <div className="main">
          <Topbar />

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/cars" element={<Cars />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;