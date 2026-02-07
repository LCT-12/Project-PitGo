import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

import Dashboard from "./pages/Dashboard";
import Cars from "./pages/Cars";
import Customers from "./pages/Customers";
import Orders from "./pages/Orders";
import Contacts from "./pages/Contacts";
import Settings from "./pages/Settings";

function App() {
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