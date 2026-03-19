import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Loading from "../components/Loading";
import Error from "../components/Error";

import axios from "axios";

function Home(){

const [cars, setCars] = useState([]);

const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  const fetchCars = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/car");
      setCars(response.data);
    } catch (error) {
      setError("Lỗi tải dữ liệu - Trang chủ. Vui lòng thử lại sau!");
    } finally {
      setLoading(false);
    }
  };
      fetchCars();
    }, []);

  /* ================= STATES ================= */  
  if (loading) return <Loading message="LOADING..." />;
  if (error) return <Error message={error} />;

  return (
    <div className="home-container">
      {/* Hero Banner */}
      <section className="hero-banner">
        {/* Đặt ảnh dashboard xe vào thư mục public/images và gọi vào đây */}
        <img src="/images/dashboard-banner.png" alt="Racing Car" className="banner-img" />
        
      </section>

      {/* Car Grid Section */}
      <section className="cars-section">
        <div className="section-pill-btn">
          <span>Siêu xe mới về</span>
        </div>
        
        <div className="cars-grid">
          {cars.slice(0, 8).map((car) => (
              <Link 
                to={`/car/${car._id}`} 
                className="car-card" 
                key={car._id}
              >
              <div className="car-image-box">
                <img src={car.image} alt={car.carName} className="img-fill" />
              </div>

              <div className="car-info">
                <p>{car.price.toLocaleString()}.000.000.000 VNĐ</p>
                <h3 className="car-name">{car.carName}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* About & Contact Section */}
      <section className="about-section">
        <div className="section-pill-btn">
          <span>Vì sao chọn chúng tôi</span>
        </div>

        <div className="about-box text-box">
          <p>PitGo là đơn vị chuyên hoạt động trong lĩnh vực kinh doanh và phân phối các dòng siêu xe cao cấp, hướng đến việc mang lại những sản phẩm chất lượng cùng trải nghiệm dịch vụ tốt nhất cho khách hàng. Chúng tôi không chỉ cung cấp xe, mà còn chú trọng xây dựng uy tín và sự tin cậy lâu dài trong từng giao dịch.</p>
          <br/>
          <p>PitGo tập trung lựa chọn những mẫu xe có tình trạng kỹ thuật tốt nhất, lịch sử sử dụng rõ ràng, ODO thấp, còn giá trị sử dụng cao và đáp ứng đầy đủ các tiêu chuẩn về chất lượng. Bên cạnh đó, chúng tôi luôn xây dựng và áp dụng các chính sách hỗ trợ hợp lý, nhằm tối ưu quyền lợi và mang lại sự an tâm tối đa cho khách hàng trong quá trình mua bán.</p>
          <br/>
          <p>Toàn bộ các xe được phân phối đều phải trải qua quy trình kiểm tra nghiêm ngặt, từ ngoại thất, nội thất cho đến hệ thống vận hành và an toàn, nhằm đảm bảo mỗi sản phẩm đến tay khách hàng đều đạt chất lượng cao và sẵn sàng sử dụng.</p>
          <br/>
          <p>Ngoài ra, công ty sẽ ký văn bản cam kết để bảo đảm sự minh bạch, trung thực với khách hàng, giúp khách hàng tăng thêm sự yên tâm và tin tưởng vào sản phẩm dịch vụ của chúng tôi.</p>
        </div>

        <div className="about-box contact-box">
          <div className="contact-logo">
            <img src="/images/logo2.png" alt="PitGo Logo" style={{ maxWidth: '250px', height: 'auto' }} />
          </div>
          <div className="contact-info">
            <h3>THÔNG TIN LIÊN HỆ</h3>
            <div className="info-row">
              <span className="label">Địa chỉ:</span>
              <div className="address-lines">
                <p>- Cơ sở 1<br/>45 Nguyễn Khắc Nhu, P. Cầu Ông Lãnh, HCM</p>
                <p>- Cơ sở 2<br/>233A Phan Văn Trị, P. Bình Lợi Trung, HCM</p>
                <p>- Cơ sở 3<br/>69/68 Đặng Thùy Trâm, P. Bình Lợi Trung, HCM</p>
              </div>
            </div>
            <div className="info-row">
              <span className="label">Hotline:</span>
              <p>0988 888 886</p>
            </div>
            <div className="info-row">
              <span className="label">Email:</span>
              <p>info@racingcar.com</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;