import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../index.css'; 

// Import dữ liệu từ file tách rời
import { mockCartData } from '../mockData/mockCart'; 
import { Appointment } from '../mockData/mockAptm';

const Cart = () => {
  // Quản lý bước hiện tại (1, 2, hoặc 3)
  const [step, setStep] = useState(1);

  // Khởi tạo state bằng dữ liệu import
  const [cartItems, setCartItems] = useState(mockCartData);
  const [formData, setFormData] = useState(Appointment);

  // Xử lý thay đổi form
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Xử lý xóa xe khỏi danh sách
  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Chuyển bước
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  // ==========================================
  // Giao diện Bước 1: Danh sách xe
  // ==========================================
  const renderStep1 = () => (
    <div className="cart-step-content">
      <h2 className="step-title">DANH SÁCH XE BẠN QUAN TÂM</h2>
      {cartItems.length === 0 ? (
        <p>Giỏ hàng của bạn đang trống.</p>
      ) : (
        cartItems.map(item => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-img" />
            <div className="cart-item-info">
              <h3>{item.name}</h3>
              <p>Hãng: {item.brand}</p>
              <p>Năm: {item.year}</p>
              <p>Xuất xứ: {item.origin}</p>
              <p>Loại: {item.type}</p>
            </div>
            <button className="remove-btn" onClick={() => handleRemoveItem(item.id)}>-</button>
          </div>
        ))
      )}
      <div className="cart-actions">
        <Link to="/products" className="btn-secondary">QUAY LẠI TÌM XE</Link>
        <button className="btn-primary" onClick={nextStep} disabled={cartItems.length === 0}>TIẾP TỤC</button>
      </div>
    </div>
  );

  // ==========================================
  // Giao diện Bước 2: Điền thông tin
  // ==========================================
  const renderStep2 = () => (
    <div className="cart-step-content">
      <h2 className="step-title">VUI LÒNG ĐIỀN ĐẦY ĐỦ THÔNG TIN ĐỂ ĐẶT LỊCH HẸN</h2>
      <div className="booking-form">
        <div className="form-row">
          <select name="location" value={formData.location} onChange={handleInputChange}>
            <option value="Cơ sở 1">Cơ sở 1: 45 Nguyễn Khắc Nhu, HCM</option>
            <option value="Cơ sở 2">Cơ sở 2: 233A Phan Văn Trị, HCM</option>
            <option value="Cơ sở 3">Cơ sở 3: 69/68 Đặng Thùy Trâm, HCM</option>
          </select>
          <input type="date" name="date" value={formData.date} onChange={handleInputChange} required />
        </div>
        
        <div className="form-row">
          <input type="text" name="fullName" placeholder="Nhập họ tên *" value={formData.fullName} onChange={handleInputChange} required />
          <input type="tel" name="phone" placeholder="Nhập số điện thoại *" value={formData.phone} onChange={handleInputChange} required />
          <input type="email" name="email" placeholder="Nhập email *" value={formData.email} onChange={handleInputChange} required />
        </div>

        <div className="checkbox-group">
          <label><input type="checkbox" name="privateRoom" checked={formData.privateRoom} onChange={handleInputChange} /> Private room</label>
          <label><input type="checkbox" name="technicalAdvice" checked={formData.technicalAdvice} onChange={handleInputChange} /> Tư vấn kỹ thuật</label>
          <label><input type="checkbox" name="testDrive" checked={formData.testDrive} onChange={handleInputChange} /> Lái thử</label>
        </div>

        <textarea name="notes" rows="4" placeholder="Ghi chú bổ sung" value={formData.notes} onChange={handleInputChange}></textarea>
      </div>

      <div className="cart-actions">
        <button className="btn-secondary" onClick={prevStep}>QUAY LẠI</button>
        <button className="btn-primary" onClick={nextStep}>XÁC NHẬN</button>
      </div>
    </div>
  );

  // ==========================================
  // Giao diện Bước 3: Thành công
  // ==========================================
  const renderStep3 = () => (
    <div className="cart-step-content success-step">
      <h2 className="success-title">CHÚC MỪNG QUÝ KHÁCH ĐÃ ĐẶT LỊCH HẸN THÀNH CÔNG</h2>
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
        <Link to="/">Trang chủ</Link>
        <span className="separator"> | </span>
        <span className="current">Giỏ hàng - Đặt lịch</span>
      </div>

      <h1 className="page-main-title">ĐẶT LỊCH HẸN XEM XE</h1>

      {/* Thanh tiến trình (Stepper) */}
      <div className="stepper-container">
        <div className={`step ${step >= 1 ? 'active' : ''}`}>[1] Danh sách xe</div>
        <div className="step-line">--------</div>
        <div className={`step ${step >= 2 ? 'active' : ''}`}>[2] Thông tin lịch hẹn</div>
        <div className="step-line">--------</div>
        <div className={`step ${step >= 3 ? 'active' : ''}`}>[3] Hoàn tất</div>
      </div>

      {/* Render nội dung dựa vào biến step */}
      <div className="step-wrapper">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
      </div>
    </div>
  );
};

export default Cart;