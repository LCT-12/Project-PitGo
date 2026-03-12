import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { carsData } from '../mockData/mockHome.js'; 

function Header() {
  const navigate = useNavigate();
  // State quản lý việc đóng mở menu Sản phẩm
  const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);
  // State quản lý Tab hãng xe đang được chọn (Mặc định là 'Tất cả')
  const [selectedBrand, setSelectedBrand] = useState('Tất cả');

  // Danh sách các hãng xe
  const brands = ['Tất cả', 'Ferrari', 'Porsche', 'Mercedes', 'Mclaren', 'Lamborghini'];
  
  // Lọc xe theo hãng đang được chọn
  const filteredCars = selectedBrand === 'Tất cả' 
  ? carsData                                            // Nếu là 'Tất cả' -> Trả về toàn bộ xe
  : carsData.filter(car => car.brand === selectedBrand); // Nếu là hãng khác -> Chạy bộ lọc

  /**
   * XỬ LÝ NHẤN ĐÚP (DOUBLE CLICK)
   * Chuyển hướng theo đúng yêu cầu: /all-cars hoặc /[tên-hãng]
   */
  const handleDoubleClick = (brand) => {
    setIsProductMenuOpen(false); // Đóng menu
    
    if (brand === 'Tất cả') {
      // Vào link http://localhost:5174/all-cars
      navigate('/all-cars');
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
          <Link to="/">
            <img src="/images/logo.png" alt="PitGo Logo" style={{ height: '74px', display: 'block' }} />
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
          <button className="action-btn" onClick={() => navigate('/login')}>
            <img src="/images/user.svg" alt="User Icon" className="action-icon" />
            Đăng nhập
          </button>
          
          {/* Nút Giỏ hàng */}
          <button className="action-btn" onClick={() => navigate('/cart')}>
            <img src="/images/cart.svg" alt="Cart Icon" className="action-icon" />
            Giỏ hàng
          </button>
        </div>
      </div>
      

      {/* Bottom section: Navigation Nav */}
      <nav className="header-nav">
        <ul>
          {/* Mục Sản phẩm */}
          <li className="nav-item-container">
            <div 
              className="nav-title" 
              onClick={() => setIsProductMenuOpen(!isProductMenuOpen)}
            >
              Sản phẩm 
              <img 
                src="/images/arr1.png" 
                alt="Arrow" 
                className={`nav-arrow ${isProductMenuOpen ? 'open' : ''}`} 
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
                      className={`brand-tab ${selectedBrand === brand ? 'active' : ''}`}
                      onClick={() => setSelectedBrand(brand)}
                      /** onDoubleClick để chuyển trang
                          userSelect: 'none' để không bị bôi xanh chữ khi nhấn nhanh
                       */
                      onDoubleClick={() => handleDoubleClick(brand)}
                      style={{ userSelect: 'none', cursor: 'pointer' }}
                    >
                      {brand}
                    </li>
                  ))}
                </ul>

                {/* 2. Lưới hiển thị các xe đã được lọc */}
                <div className="car-grid">
                  {filteredCars.slice(0, 4).map((car) => (
                    <Link 
                      to={car.link} 
                      key={car.id} 
                      className="car-card" 
                      onClick={() => setIsProductMenuOpen(false)} // Đóng menu khi click vào xe
                    >
                      <img src={car.img} alt={car.name} />
                      <h4>{car.name}</h4>
                      <p>{car.price}</p>
                    </Link>
                  ))}
                  
                  {/* Nếu không có xe nào thuộc hãng đó thì hiện dòng này */}
                  {filteredCars.length === 0 && (
                    <p style={{ color: '#888', marginTop: '20px' }}>Đang cập nhật dòng xe này...</p>
                  )}
                </div>

              </div>
            )}
          </li>

          {/* Mục Dịch vụ */}
          <li className="nav-item-container">
            <div className="nav-title">
              Dịch vụ 
              <img src="/images/arr2.png" alt="Arrow" className="nav-arrow" />
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;