import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css'; 

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="breadcrumb">
        <Link to="/home" className="breadcrumb-text1">Trang chủ</Link>
        <span className="breadcrumb-separator"> &gt; </span>
        <b className="breadcrumb-text4">Liên hệ</b>       
      </div>

      <h1 className="contact-title">LIÊN HỆ VỚI CHÚNG TÔI</h1>

      {/* Ô THỨ 1: LIÊN HỆ (FORM) */}
      <div className="area-form">
        <p className="intro-text">
          Nếu bạn có thắc mắc gì, có thể gửi yêu cầu cho chúng tôi, và chúng tôi sẽ liên lạc lại với bạn sớm nhất có thể.
        </p>
        <div className="form-wrapper">
          <div className="form-row">
            <input type="text" placeholder="Tên của bạn" />
            <input type="email" placeholder="Email của bạn" />
          </div>
          <textarea placeholder="Nội dung" rows="5"></textarea>
        </div>
      </div>

      {/* NÚT GỬI NẰM NGOÀI Ô */}
      <div className="button-container">
        <button type="submit" className="submit-btn">Gửi tin nhắn</button>
      </div>

      {/* Ô THỨ 2: THÔNG TIN CHI TIẾT (MAP & INFO) */}
      <div className="contact-container-grid">
        <div className="area-map">
          {/* Để trống cho Map sau này */}
          <div className="map-placeholder">Bản đồ sẽ hiển thị ở đây</div>
        </div>

        <div className="area-info">
          <h2 className="section-title">THÔNG TIN CHI TIẾT</h2>
          <div className="info-text">
            <p>PitGo chuyên doanh các dòng xe đua và siêu xe hiệu năng cao, tập trung vào dòng "siêu lướt" với chỉ số ODO thấp, đời mới và bảo hành chính hãng. Mỗi chiến mã tại PitGo đều trải qua quy trình kiểm định Race-Ready nghiêm ngặt để đảm bảo hiệu năng tối đa và an toàn tuyệt đối cho khách hàng. Chúng tôi cam kết bằng văn bản về sự minh bạch và trung thực, giúp bạn hoàn toàn an tâm khi sở hữu những cỗ máy tốc độ đỉnh cao.</p>
            <p className="slogan">Tiêu chí PitGo: Chỉ Xe Chất – Giá Tốt Nhất!</p>
          </div>

          <div className="info-icons-bottom">
            <div className="icon-group">
              <img src="/images/address.png" alt="Address" />
              <p>69/68 Đặng Thùy Trâm, P. Bình Lợi Trung, HCM</p>
            </div>

            <div className="icon-group">
              <img src="/images/email.png" alt="Email" />
              <p>info@pitgo.com</p>
            </div>

            <div className="icon-group">
              <img src="/images/phone.svg" alt="Phone" />
              <p className="phone-bold">0988 888 886 <br/> 0988 888 888</p>
            </div>

            <div className="icon-group">
              <img src="/images/fb2.svg" alt="Facebook" />
              <p>facebook.com/pitgo</p>
            </div>

            <div className="icon-group">
              <img src="/images/ig2.svg" alt="Instagram" />
              <p>instagram.com/pitgo</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;