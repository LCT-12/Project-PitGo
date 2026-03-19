import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="breadcrumb">
        <Link to="/home" className="breadcrumb-text1">Trang chủ</Link>
        <span className="breadcrumb-separator"> &gt; </span>
        <b className="breadcrumb-text2">Liên hệ</b>       
      </div>

      <h1 className="contact-title">LIÊN HỆ</h1>

      {/* Khung chính sử dụng Grid Layout */}
      <div className="contact-container-grid">
        
        {/* 1. Ô trống bên trái (Map) */}
        <div className="area-map">
          {/* Để trắng cho Map sau này */}
        </div>

        {/* 2. Phần Form bên phải phía trên */}
        <div className="area-form">
          <p className="intro-text">
            Nếu bạn có thắc mắc gì, có thể gửi yêu cầu cho chúng tôi, và chúng tôi sẽ liên lạc lại với bạn sớm nhất có thể.
          </p>
          <form className="form-wrapper" onSubmit={(e) => e.preventDefault()}>
            <input type="text" placeholder="Tên của bạn" />
            <input type="email" placeholder="Email của bạn" />
            <textarea placeholder="Nội dung tin nhắn" rows="4"></textarea>
            <button type="submit">GỬI LIÊN HỆ</button>
          </form>
        </div>

        {/* 3. Phần thông tin nằm dưới cùng */}
        <div className="area-info">
          <div className="info-text">
            <p>PitGo chuyên doanh các dòng xe đua và siêu xe hiệu năng cao, tập trung vào dòng "siêu lướt" với chỉ số ODO thấp, đời mới và bảo hành chính hãng. Mỗi chiến mã tại PitGo đều trải qua quy trình kiểm định Race-Ready nghiêm ngặt để đảm bảo hiệu năng tối đa và an toàn tuyệt đối cho khách hàng. Chúng tôi cam kết bằng văn bản về sự minh bạch và trung thực, giúp bạn hoàn toàn an tâm khi sở hữu những cỗ máy tốc độ đỉnh cao.</p>
            <p className="slogan">Tiêu chí PitGo: Chỉ Xe Chất – Giá Tốt Nhất!</p>
          </div>

          <div className="info-icons-bottom">
            <div className="icon-group">
              <img src="/images/address.png" alt="" />
              <p>
                - Cơ sở 1: 45 Nguyễn Khắc Nhu, P. Cầu Ông Lãnh, HCM<br/>
                - Cơ sở 2: 233A Phan Văn Trị, P. Bình Lợi Trung, HCM<br/>
                - Cơ sở 3: 69/68 Đặng Thùy Trâm, P. Bình Lợi Trung, HCM
              </p>
            </div>
            <div className="icon-group">
              <img src="/images/email.png" alt="" />
              <p>info@racingcar.com</p>
            </div>
            <div className="icon-group">
              <img src="/images/phone.svg" alt="" />
              <p className="phone-bold">0988 888 886</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;