import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Header() {
  const navigate = useNavigate();
  const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState("Tất cả");
  const [isServiceMenuOpen, setIsServiceMenuOpen] = useState(false);

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- State quản lý số lượng sản phẩm trong giỏ ---
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Hàm cập nhật số lượng từ localStorage
    const updateCartCount = () => {
      const savedCart = localStorage.getItem('pitgo_cart');
      if (savedCart) {
        const cartItems = JSON.parse(savedCart);
        setCartCount(cartItems.length);
      } else {
        setCartCount(0);
      }
    };

    // Chạy lần đầu khi component mount
    updateCartCount();

    // Lắng nghe sự kiện storage (khi thay đổi ở tab khác hoặc trang khác)
    window.addEventListener('storage', updateCartCount);

    // Tạo một Custom Event để cập nhật ngay trong cùng một trang (Dùng cho CarDetail)
    window.addEventListener('cartUpdated', updateCartCount);

    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/car");
        setCars(response.data);
      } catch (error) {
        console.error("Lỗi lấy dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  const brands = ["Tất cả", "Ferrari", "Porsche", "Mercedes", "McLaren", "Lamborghini"];

  const filteredCars =
    selectedBrand === "Tất cả"
      ? cars
      : cars.filter((car) => car.brand === selectedBrand);

  const handleDoubleClick = (brand) => {
    setIsProductMenuOpen(false);
    if (brand === "Tất cả") {
      navigate("/all-cars");
    } else {
      navigate(`/${brand.toLowerCase()}`);
    }
  };

  return (
    <header className="public-header">
      <div className="header-top">
        <div className="header-logo">
          <Link to="/home">
            <img src="/images/logo.png" alt="PitGo Logo" style={{ height: "74px", display: "block" }} />
          </Link>
        </div>

        <div className="header-actions">
          <button className="action-btn" onClick={() => navigate("/login")}>
            <img src="/images/user.svg" alt="User Icon" className="action-icon" />
            Đăng nhập
          </button>

          {/* Nút Giỏ hàng đã được cập nhật số lượng */}
          <button className="action-btn" onClick={() => navigate("/cart")}>
            <img src="/images/schedule-calendar.svg" alt="Cart Icon" className="action-icon" />
            Đặt lịch {cartCount >= 0 && `(${cartCount})`}
          </button>
        </div>
      </div>

      <nav className="header-nav">
        <ul>
          <li className="nav-item-container">
            <div className="nav-title">
              <Link to="/home">Trang chủ</Link>
            </div>
          </li>

          <li
            className="nav-item-container"
            onMouseEnter={() => setIsProductMenuOpen(true)}
            onMouseLeave={() => setIsProductMenuOpen(false)}
          >
            <div className="nav-title">
              Sản phẩm
              <img src="/images/arr1.png" alt="Arrow" className={`nav-arrow ${isProductMenuOpen ? "open" : ""}`} />
            </div>

            {isProductMenuOpen && (
              <div className="mega-menu" onClick={(e) => e.stopPropagation()}>
                <ul className="brand-tabs">
                  {brands.map((brand) => (
                    <li
                      key={brand}
                      className={`brand-tab ${selectedBrand === brand ? "active" : ""}`}
                      onMouseEnter={() => setSelectedBrand(brand)}
                      onDoubleClick={() => handleDoubleClick(brand)}
                      style={{ userSelect: "none", cursor: "pointer" }}
                    >
                      {brand}
                    </li>
                  ))}
                </ul>

                <div className="car-grid">
                  {filteredCars.slice(0, 4).map((car) => (
                    <Link
                      to={`/car/${car._id}`}
                      key={car.id}
                      className="car-card"
                      onClick={() => setIsProductMenuOpen(false)}
                    >
                      <img src={car.image} alt={car.carName} />
                      <h4 className="car-name" title={car.carName}>{car.carName}</h4>
                      <p>{car.price.toLocaleString()}.000.000.000 VNĐ</p>
                    </Link>
                  ))}
                  {filteredCars.length === 0 && (
                    <p style={{ color: "#888", marginTop: "20px" }}>Đang cập nhật dòng xe này...</p>
                  )}
                </div>
              </div>
            )}
          </li>

         

          <li className="nav-item-container">
            <div className="nav-title">
              <Link to="/services">Dịch vụ</Link>
            </div>
          </li>

          <li className="nav-item-container">
            <div className="nav-title">
              <Link to="/contact">Liên hệ</Link>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;