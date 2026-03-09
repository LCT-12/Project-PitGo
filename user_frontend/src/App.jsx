import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

// Components Public
import Header from "./components/Header";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home"; 

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
  return (
    <BrowserRouter>
      <Routes>
        {/* --- ROUTES TRANG KHÁCH HÀNG --- */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          
          {/* Nơi bạn sẽ thêm các trang khác của User sau này */}
          {/* Ví dụ: <Route path="/:brand/:carId" element={<CarDetail />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;