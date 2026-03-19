import React, { useState } from "react"; // Thêm useState
import { Link } from "react-router-dom";
import axios from "axios"; // Thêm axios
import "../index.css"; 

function Contact({ showAlert }) {
  // 1. Khởi tạo state để lưu dữ liệu form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "", // Mặc định hoặc để trống
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // 2. Hàm xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 3. Hàm gửi tin nhắn
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Kiểm tra nhanh
    if (!formData.name || !formData.email || !formData.message) {
      showAlert("danger", "Vui lòng điền đầy đủ các trường bắt buộc!");
      return;
    }

    setIsSubmitting(true);
    try {
      // Gọi đến API Backend đã tạo ở các bước trước
      const response = await axios.post("http://localhost:5000/api/contact", formData);
      
      if (response.status === 201) {
        showAlert("success", "Gửi tin nhắn thành công! Chúng tôi sẽ liên hệ lại sớm.");
        // Reset form sau khi gửi thành công
        setFormData({ name: "", email: "", subject: "", message: "" });
      }
    } catch (error) {
      console.error("Lỗi khi gửi tin nhắn:", error);
      showAlert("danger", "Có lỗi xảy ra, vui lòng thử lại sau.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-container">
      <div className="breadcrumb">
        <Link to="/home" className="breadcrumb-text1">Trang chủ</Link>
        <span className="breadcrumb-separator"> &gt; </span>
        <b className="breadcrumb-text4">Liên hệ</b>       
      </div>

      <h1 className="contact-title">LIÊN HỆ VỚI CHÚNG TÔI</h1>

      <form onSubmit={handleSubmit}> {/* Bọc form để xử lý Submit */}
        <div className="area-form">
          <p className="intro-text">
            Nếu bạn có thắc mắc gì, có thể gửi yêu cầu cho chúng tôi, và chúng tôi sẽ liên lạc lại với bạn sớm nhất có thể.
          </p>
          <div className="form-wrapper">
            <div className="form-row">
              <input 
                type="text" 
                name="name"
                placeholder="Tên của bạn" 
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input 
                type="email" 
                name="email"
                placeholder="Email của bạn" 
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            {/* Thêm input cho Subject nếu muốn User tự nhập, hoặc ẩn đi */}
            <input 
              type="text" 
              name="subject"
              placeholder="Chủ đề (tùy chọn)" 
              className="subject-input"
              value={formData.subject}
              onChange={handleChange}
              style={{ width: "100%", marginTop: "15px", padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
            />
            <textarea 
              name="message"
              placeholder="Nội dung" 
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
        </div>

        <div className="button-container">
          <button 
            type="submit" 
            className="submit-btn" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Đang gửi..." : "Gửi tin nhắn"}
          </button>
        </div>
      </form>

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