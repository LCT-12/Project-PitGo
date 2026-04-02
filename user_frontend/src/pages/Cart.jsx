import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../index.css'; 

// Import dữ liệu mặc định
import { mockCartData } from '../mockData/mockCart'; 
import { Appointment } from '../mockData/mockAptm';

function Cart() {
  const [step, setStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");

  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('pitgo_cart');
    return savedCart ? JSON.parse(savedCart) : mockCartData;
  });
  
  const [apt, setApt] = useState(Appointment);

  useEffect(() => {
    localStorage.setItem('pitgo_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setApt({
      ...apt,
      [name]: type === 'checkbox' ? checked : value
    });
    // Xóa lỗi ngay khi người dùng bắt đầu sửa lại thông tin
    if (errorMessage) setErrorMessage("");
  };

  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('pitgo_cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  // --- LOGIC XỬ LÝ KHI NHẤN XÁC NHẬN ---
  const handleConfirm = () => {
    // 1. Kiểm tra các thông tin nhập liệu bắt buộc
    if (!apt.date) {
      setErrorMessage("Vui lòng chọn ngày hẹn xem xe!");
      return;
    }
    if (!apt.fullName || apt.fullName.trim() === "") {
      setErrorMessage("Vui lòng nhập họ tên của bạn!");
      return;
    }
    if (!apt.phone || apt.phone.trim() === "") {
      setErrorMessage("Vui lòng nhập số điện thoại để chúng tôi liên hệ!");
      return;
    }
    if (!apt.email || apt.email.trim() === "") {
      setErrorMessage("Vui lòng nhập địa chỉ email!");
      return;
    }

    // 2. KIỂM TRA PHẢI CHỌN ÍT NHẤT 1 DỊCH VỤ
    // Kiểm tra xem có ô nào trong 3 ô checkbox được tích hay không
    const hasSelectedService = apt.technicalAdvice || apt.testDrive || apt.carMaintenance || apt.carWash || apt.carRepair || apt.carCare || apt.carPerformance || apt.carInterior || apt.carExterior || apt.carManagement || apt.financialSupport;    
    if (!hasSelectedService) {
      setErrorMessage("Vui lòng chọn ít nhất một dịch vụ");
      return;
    }

    // Nếu tất cả thông tin đã đầy đủ
    setErrorMessage("");
    setStep(3);
  };
  
  const nextStep = () => setStep(step + 1); 
  const prevStep = () => setStep(step - 1);

  // ==========================================
  // Giao diện Bước 1: Danh sách xe
  // ==========================================
  const renderStep1 = () => (
    <div className="cart-step-content">
      <h2 className="step-title">DANH SÁCH XE BẠN QUAN TÂM</h2>
      {cartItems.length === 0 ? (
        <p style={{ textAlign: 'center', padding: '20px' }}>Giỏ hàng của bạn đang trống.</p>
      ) : (
        <div className="cart-items-wrapper">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-img" />
              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p>Hãng: {item.brand}</p>
                <p>Năm: {item.year}</p>
                <p>Xuất xứ: {item.origin}</p>
                <p>Loại: {item.type}</p>
              </div>
              <div className="cart-item-actions">
                <button className="remove-btn" onClick={() => handleRemoveItem(item.id)}>-</button>
                <Link to={`/car/${item.id}`} className="view-detail-btn">
                  <img src="/images/eye-icon.svg" alt="Xem" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="cart-actions">
        <Link to="/all-cars" className="btn-secondary">QUAY LẠI TÌM XE</Link>
        <button className="btn-primary" onClick={nextStep} disabled={cartItems.length === 0}>TIẾP TỤC</button>
      </div>
    </div>
  );

  // ==========================================
  // Giao diện Bước 2: Điền thông tin
  // ==========================================
  const renderStep2 = () => (
    <div className="cart-step-content">
      <h2 className="step-title">THÔNG TIN LỊCH HẸN</h2>
      <div className="booking-form">
        <div className="form-row">
          <select name="location" value={apt.location} onChange={handleInputChange}>
            <option value="Cơ sở 1">Cơ sở 1: 45 Nguyễn Khắc Nhu, HCM</option>
            <option value="Cơ sở 2">Cơ sở 2: 233A Phan Văn Trị, HCM</option>
            <option value="Cơ sở 3">Cơ sở 3: 69/68 Đặng Thùy Trâm, HCM</option>
          </select>
          <input type="date" name="date" value={apt.date} onChange={handleInputChange} />
        </div>
        
        <div className="form-row">
          <input type="text" name="fullName" placeholder="Nhập họ tên *" value={apt.fullName} onChange={handleInputChange} />
          <input type="tel" name="phone" placeholder="Nhập số điện thoại *" value={apt.phone} onChange={handleInputChange} />
          <input type="email" name="email" placeholder="Nhập email *" value={apt.email} onChange={handleInputChange} />
        </div>

        <div className="services-container">
          <span className="services-title">Dịch vụ:</span>
          <div className="checkbox-group">      
            <label><input type="checkbox" name="technicalAdvice" checked={apt.technicalAdvice} onChange={handleInputChange} /> Tư vấn</label>
            <label><input type="checkbox" name="testDrive" checked={apt.testDrive} onChange={handleInputChange} /> Lái thử</label>
            <label><input type="checkbox" name="carMaintenance" checked={apt.carMaintenance} onChange={handleInputChange} />Bảo dưỡng</label>
            <label><input type="checkbox" name="carWash" checked={apt.carWash} onChange={handleInputChange} />Rửa xe</label>
            <label><input type="checkbox" name="carRepair" checked={apt.carRepair} onChange={handleInputChange} />Sửa chữa</label>
            <label><input type="checkbox" name="carCare" checked={apt.carCare} onChange={handleInputChange} />Chăm sóc xe</label>
            <label><input type="checkbox" name="carPerformance" checked={apt.carPerformance} onChange={handleInputChange} />Kiểm tra hiệu năng</label>
            <label><input type="checkbox" name="carInterior" checked={apt.carInterior} onChange={handleInputChange} />Trang trí ngoại thất</label>
            <label><input type="checkbox" name="carExterior" checked={apt.carExterior} onChange={handleInputChange} />Nâng cấp nội thất</label>
            <label><input type="checkbox" name="carManagement" checked={apt.carManagement} onChange={handleInputChange} />Quản lý & Kí gửi xe</label>
            <label><input type="checkbox" name="financialSupport" checked={apt.financialSupport} onChange={handleInputChange} />Hỗ trợ tài chính</label>
          </div>
        </div>
        <textarea name="notes" rows="4" placeholder="Ghi chú" value={apt.notes} onChange={handleInputChange}></textarea>
        
        {/* HIỂN THỊ LỖI NGAY DƯỚI TEXTAREA */}
        {errorMessage && (
          <div style={{ 
            color: '#d93025', 
            backgroundColor: '#fce8e6', 
            padding: '10px', 
            borderRadius: '4px', 
            marginTop: '10px', 
            fontSize: '14px',
            border: '1px solid #f5c2c7',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span>⚠️</span> {errorMessage}
          </div>
        )}
      </div>

      <div className="cart-actions">
        <button className="btn-secondary" onClick={prevStep}>QUAY LẠI</button>
        {/* Nút XÁC NHẬN bây giờ luôn bấm được, không bị mờ */}
        <button className="btn-primary" onClick={handleConfirm}>
          XÁC NHẬN
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="cart-step-content success-step">
      <h2 className="success-title">BẠN ĐÃ ĐẶT LỊCH HẸN THÀNH CÔNG</h2>
      <p className="booking-code">Mã lịch hẹn: <strong>LHKH-001</strong></p>
      <div className="cart-actions center-actions">
        <Link to="/" className="btn-secondary">VỀ TRANG CHỦ</Link>
        <Link to="/contact" className="btn-primary">LIÊN HỆ HỖ TRỢ</Link>
      </div>
    </div>
  );

  return (
    <div className="cart-page-container">
      <div className="breadcrumb">
        <Link to="/home" className="breadcrumb-text1">Trang chủ</Link>
        <span className="breadcrumb-separator"> &gt; </span>
        <b className="breadcrumb-text4">Đặt lịch</b>      
      </div>
      <h1 className="page-main-title">ĐẶT LỊCH HẸN XEM XE</h1>
      <div className="stepper-container">
        <div className={`step ${step >= 1 ? 'active' : ''}`}>[1] Danh sách xe</div>
        <div className="step-line">--------</div>
        <div className={`step ${step >= 2 ? 'active' : ''}`}>[2] Thông tin lịch hẹn</div>
        <div className="step-line">--------</div>
        <div className={`step ${step >= 3 ? 'active' : ''}`}>[3] Hoàn tất</div>
      </div>
      <div className="step-wrapper">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
      </div>
    </div>
  );
};

export default Cart;