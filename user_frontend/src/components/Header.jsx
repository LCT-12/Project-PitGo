import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { carsData } from "../mockData/mockHome.js";

import axios from "axios";

function Header() {
  const navigate = useNavigate();
  // State quản lý việc đóng mở menu Sản phẩm
  const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);
  // State quản lý Tab hãng xe đang được chọn (Mặc định là "Tất cả")
  const [selectedBrand, setSelectedBrand] = useState("Tất cả");
  // State quản lý việc đóng mở menu Dịch vụ
  const [isServiceMenuOpen, setIsServiceMenuOpen] = useState(false);

  // State lưu trữ danh sách xe
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true); // Bắt đầu tải
        const response = await axios.get("http://localhost:5000/api/car");
        setCars(response.data);
      } catch (error) {
        console.error("Lỗi lấy dữ liệu:", error);
      } finally {
        setLoading(false); // Kết thúc tải (dù thành công hay lỗi)
      }
    };
    fetchCars();
  }, []);

  // Danh sách các hãng xe
  const brands = [
    "Tất cả",
    "Ferrari",
    "Porsche",
    "Mercedes",
    "McLaren",
    "Lamborghini",
  ];

  // Lọc xe theo hãng đang được chọn
  const filteredCars =
    selectedBrand === "Tất cả"
      ? cars // Nếu là "Tất cả" -> Trả về toàn bộ xe
      : cars.filter((car) => car.brand === selectedBrand); // Nếu là hãng khác -> Chạy bộ lọc

  /**
   * XỬ LÝ NHẤN ĐÚP (DOUBLE CLICK)
   * Chuyển hướng theo đúng yêu cầu: /all-cars hoặc /[tên-hãng]
   */
  const handleDoubleClick = (brand) => {
    setIsProductMenuOpen(false); // Đóng menu

    if (brand === "Tất cả") {
      // Vào link http://localhost:5174/all-cars
      navigate("/all-cars");
    } else {
      // Vào link tương ứng, ví dụ: http://localhost:5174/ferrari
      // Sử dụng .toLowerCase() để đường dẫn trông chuyên nghiệp hơn (ferrari thay vì Ferrari)
      navigate(`/${brand.toLowerCase()}`);
    }
  };

  return (
    <header className="public-header">
      {/* Top section: Logo, Search, Actions */}
      <div className="header-top">
        <div className="header-logo">
          {/* File logo */}
          <Link to="/home">
            <img
              src="/images/logo.png"
              alt="PitGo Logo"
              style={{ height: "74px", display: "block" }}
            />
          </Link>
        </div>

        <div className="header-search">
          <input type="text" placeholder="Nhập từ khóa để tìm kiếm" />
          <button className="search-icon">
            {/* File SVG Search */}
            <img src="/images/search.svg" alt="Search Icon" />
          </button>
        </div>

        <div className="header-actions">
          {/* Nút Đăng nhập */}
          <button className="action-btn" onClick={() => navigate("/")}>
            <img
              src="/images/user.svg"
              alt="User Icon"
              className="action-icon"
            />
            Đăng nhập
          </button>

          {/* Nút Giỏ hàng */}
          <button className="action-btn" onClick={() => navigate("/cart")}>
            <img
              src="/images/cart.svg"
              alt="Cart Icon"
              className="action-icon"
            />
            Giỏ hàng
          </button>
        </div>
      </div>

      {/* Bottom section: Navigation Nav */}
      <nav className="header-nav">
        <ul>
          {/* Mục Sản phẩm */}
          <li
            className="nav-item-container"
            // ĐƯA SỰ KIỆN LÊN THẺ LI NÀY
            onMouseEnter={() => setIsProductMenuOpen(true)}
            onMouseLeave={() => setIsProductMenuOpen(false)}
            
          >
            <div className="nav-title">
              Sản phẩm
              <img
                src="/images/arr1.png"
                alt="Arrow"
                className={`nav-arrow ${isProductMenuOpen ? "open" : ""}`}
              />
            </div>

            {/* MEGA MENU XỔ XUỐNG */}
            {isProductMenuOpen && (
              <div className="mega-menu" onClick={(e) => e.stopPropagation()}>
                {/* 1. Dãy Tab chọn hãng xe */}
                <ul className="brand-tabs">
                  {brands.map((brand) => (
                    <li
                      key={brand}
                      className={`brand-tab ${selectedBrand === brand ? "active" : ""}`}
                      onMouseEnter={() => setSelectedBrand(brand)}
                      /** onDoubleClick để chuyển trang
                          userSelect: "none" để không bị bôi xanh chữ khi nhấn nhanh
                       */
                      onDoubleClick={() => handleDoubleClick(brand)}
                      style={{ userSelect: "none", cursor: "pointer" }}
                    >
                      {brand}
                    </li>
                  ))}
                </ul>

                {/* 2. Lưới hiển thị các xe đã được lọc */}
                <div className="car-grid">
                  {filteredCars.slice(0, 4).map((car) => (
                    <Link
                      to={`/car/${car._id}`}
                      key={car.id}
                      className="car-card"
                      onClick={() => setIsProductMenuOpen(false)} // Đóng menu khi click vào xe
                    >
                      <img src={car.image} alt={car.carName} />
                      <h4 className="car-name" title={car.carName}>
                        {car.carName}
                      </h4>
                      <p>{car.price.toLocaleString()}.000.000.000 VNĐ</p>
                    </Link>
                  ))}

                  {/* Nếu không có xe nào thuộc hãng đó thì hiện dòng này */}
                  {filteredCars.length === 0 && (
                    <p style={{ color: "#888", marginTop: "20px" }}>
                      Đang cập nhật dòng xe này...
                    </p>
                  )}
                </div>
              </div>
            )}
          </li>

          {/* Mục Dịch vụ */}
          <li 
            className="nav-item-container"
            onMouseEnter={() => setIsServiceMenuOpen(true)}
            onMouseLeave={() => setIsServiceMenuOpen(false)}
          >
            <div className="nav-title">
              Dịch vụ
              <img 
                src="/images/arr2.png" 
                alt="Arrow" 
                className={`nav-arrow ${isServiceMenuOpen ? "open" : ""}`} 
              />
            </div>

            {/* MENU XỔ XUỐNG DỊCH VỤ (Dùng chung class mega-menu để thừa hưởng hiệu ứng) */}
            {isServiceMenuOpen && (
              <div className="mega-menu service-menu" onClick={(e) => e.stopPropagation()}>
                <ul className="service-dropdown-list">
                   {/* <li>
                    <Link 
                      to="/contact" 
                      className="service-item"
                      onClick={() => setIsServiceMenuOpen(false)}
                    >
                      Liên hệ
                    </Link>
                  </li> */}
                  <li>
                    <Link 
                      to="/service" 
                      className="service-item"
                      onClick={() => setIsServiceMenuOpen(false)} // Đóng menu khi click
                    >
                      Bảo dưỡng
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </li>

             {/* Mục Liên hệ */}
          <li className="nav-item-container">
            <div className="nav-title">
              <Link to="/contact" className="contact-link">
                 Liên hệ
              </Link>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
