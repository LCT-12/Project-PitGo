import React from 'react';
import '../index.css'; 
import { Link } from 'react-router-dom';

const Service = () => {
  return (
    <div className="service-page-container">
      {/* 1. Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/home" className="breadcrumb-text1">Trang chủ</Link>
        <span className="breadcrumb-separator"> &gt; </span>
        <span className="breadcrumb-text4"> Dịch vụ </span>
        <span className="breadcrumb-separator"> &gt; </span>
        <b className="breadcrumb-text4">Bảo dưỡng</b>
      </div>

      {/* 2. Hero Section (Phần đầu trang) */}
      <section className="service-hero">
        <h1 className="service-main-title">BẢO DƯỠNG</h1>
        <p className="service-hero-desc">
          Dịch vụ PitGo được triển khai theo tiêu chuẩn toàn cầu bởi đội ngũ kỹ thuật viên chuyên môn cao. 
          Mỗi chiếc xe được chăm sóc toàn diện nhằm đảm bảo khả năng vận hành ổn định, bền bỉ và nâng cao trải nghiệm khách hàng.
        </p>
        <div className="service-hero-banner">
          {/* Thay đường dẫn ảnh thực tế của bạn */}
          <img src="/images/service1.png" alt="PitGo Service Banner" />
        </div>
      </section>

      {/* 3. Info Section (Cảnh báo việc không bảo dưỡng) */}
      <section className="service-info-section">
        <div className="service-info-text">
          <p>Việc không đưa xe đi bảo dưỡng định kỳ theo đúng thời gian quy định có thể gây ra nhiều ảnh hưởng như:</p>
          <ul>
            <li><strong>Giảm hiệu suất động cơ, tăng tiêu hao nhiên liệu.</strong></li>
            <li><strong>Xe vận hành không ổn định dẫn tới các hư hỏng.</strong></li>
            <li><strong>Giảm tuổi thọ của xe.</strong></li>
          </ul>
          <p>Để đảm bảo chiếc xe luôn hoạt động ổn định, bền bỉ và an toàn, hãy duy trì lịch bảo dưỡng định kỳ theo khuyến cáo từ nhà sản xuất.</p>
        </div>
        <div className="service-info-image">
          <img src="/images/service2.png" alt="Bảo dưỡng động cơ" />
        </div>
      </section>

      {/* 4. Benefits Section (Lợi ích cho khách hàng) */}
      <section className="service-benefits">
        <h2 className="service-benefits-title">
          BẢO DƯỠNG XE TẠI PITGO<br/>
          ĐEM LẠI LỢI ÍCH GÌ CHO KHÁCH HÀNG?
        </h2>
        
        <div className="benefits-grid">
          {/* Item 1 */}
          <div className="benefit-card">
            <div className="benefit-img">
              <img src="/images/service2.png" alt="An toàn tối đa" />
            </div>
            <div className="benefit-content">
              <h3>An toàn tối đa</h3>
              <p>Giảm thiểu rủi ro tai nạn khi hệ thống quan trọng như phanh, lốp, và đèn chiếu sáng luôn được đảm bảo đang hoạt động tốt.</p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="benefit-card">
            <div className="benefit-img">
              <img src="/images/service3.png" alt="Xe vận hành ổn định" />
            </div>
            <div className="benefit-content">
              <h3>Xe vận hành ổn định</h3>
              <p>Đảm bảo tất cả bộ phận của xe luôn ở trạng thái tốt nhất, ít xảy ra lỗi.</p>
            </div>
          </div>

          {/* Item 3 */}
          <div className="benefit-card">
            <div className="benefit-img">
              <img src="/images/service4.png" alt="Phát hiện và phòng ngừa" />
            </div>
            <div className="benefit-content">
              <h3>Phát hiện và phòng ngừa sớm hư hỏng</h3>
              <p>Kịp thời phát hiện các lỗi nhỏ, hạn chế hỏng hóc lớn và giảm chi phí sửa chữa lâu dài.</p>
            </div>
          </div>

          {/* Item 4 */}
          <div className="benefit-card">
            <div className="benefit-img">
              <img src="/images/service5.png" alt="Đảm bảo chất lượng" />
            </div>
            <div className="benefit-content">
              <h3>Đảm bảo chất lượng và độ bền</h3>
              <p>Kiểm tra và thay thế cho các phụ tùng cũ đã hao mòn, từ đó kéo dài tuổi thọ động cơ và các hệ thống khác.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Service;