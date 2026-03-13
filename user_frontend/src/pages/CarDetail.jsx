import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { carsData } from '../mockData/mockPL.js';
import '../index.css';

const CarDetail = () => {
  const { brand, model } = useParams();
  const currentLink = `/${brand}/${model}`;
  const car = carsData.find((item) => item.link === currentLink);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentLink]);

  if (!car) {
    return (
      <div className="not-found-container">
        <h2>Không tìm thấy mẫu xe này!</h2>
        <Link to="/all-cars" className="back-btn">Quay lại danh sách</Link>
      </div>
    );
  }

  return (
    <div className="car-detail-wrapper">
      <div className="breadcrumb">
        <i>Trang chủ | Sản phẩm &gt; Chi tiết</i>
      </div>

      <div className="car-detail-main-content">
        {/* CỘT TRÁI: Chỉ có ảnh to và cụm nút căn giữa */}
        <div className="image-column">
          <div className="main-image-frame">
            <img src={car.img} alt={car.name} />
          </div>
          
          <div className="action-button-group centered">
            <button className="btn-contact">LIÊN HỆ TƯ VẤN</button>
            <button className="btn-test-drive">ĐĂNG KÝ LÁI THỬ</button>
          </div>
        </div>

        {/* CỘT PHẢI: Thông tin và Khuyến mãi */}
        <div className="info-column">
          <h1 className="car-title-display">{car.name.toUpperCase()}</h1>
          <p className="car-price-display">{car.price}</p>

          <div className="specs-list">
            <div className="spec-line">
                <img src="/images/engine.png" alt="Engine" className="spec-icon-img" />
                {/* car.engine sẽ lấy dữ liệu tương ứng của mỗi xe từ mockData */}
                <span>{car.engine}</span> 
            </div>
            <div className="spec-line">
                <img src="/images/speed.png" alt="Speed" className="spec-icon-img" />
                <span>{car.speed}</span>
            </div>
            <div className="spec-line">
                <img src="/images/accel.svg" alt="Acceleration" className="spec-icon-img" />
                <span>{car.accel}</span>
            </div>
          </div>

          <div className="promotion-section">
            <div className="promotion-box">
              <h3 className="promo-title">KHUYẾN MÃI</h3>
              <p className="promo-note">* Quý khách liên hệ hotline, để nhận thông tin khuyến mãi và ưu đãi.</p>
              <ul className="promo-items">
                <li>- Tặng phụ kiện chính hãng theo xe trị giá 30.000.000đ</li>
                <li>- Cơ hội bốc thăm trúng iPhone 17, xe máy điện và nhiều quà tặng hấp dẫn khác</li>
              </ul>
            </div>
            {/* Nút thêm giỏ hàng nằm ở giữa phía dưới khung KM */}
            <div className="add-cart-container">
              <button className="btn-add-cart">THÊM GIỎ HÀNG</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;