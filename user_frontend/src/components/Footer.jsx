import React from "react";
import { Link } from 'react-router-dom'; 
function Footer() {
  return (
    <footer className="public-footer">
      <div className="footer-container">
        <div className="footer-links-container">
          {/* Cột 1: Thương hiệu siêu xe */}
          <div className="footer-column">
            <h4>Các dòng xe</h4>
            <Link to="/ferrari" className="footer-link-item">Ferrari</Link>
            <Link to="/porsche" className="footer-link-item">Porsche</Link>
            <Link to="/mercedes" className="footer-link-item">Mercedes</Link>
            <Link to="/mclaren" className="footer-link-item">Mclaren</Link>
            <Link to="/lamborghini" className="footer-link-item">Lamborghini</Link>
          </div>

          {/* Cột 2: Hướng dẫn & Bộ sưu tập */}
          <div className="footer-column">
            <h4>Dịch vụ</h4>
            <Link to="/contact" className="footer-link-item">Liên hệ</Link>
            <Link to="/collection" className="footer-link-item">Bộ sưu tập</Link>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>Copyright © 2026 PitGo</p>
        <div className="social-icons">
          <a href="#fb"><img src="/images/fb.svg" alt="Facebook" /></a>
          <a href="#yt"><img src="/images/yt.svg" alt="YouTube" /></a>
          <a href="#ig"><img src="/images/ig.svg" alt="Instagram" /></a>
          <a href="#in"><img src="/images/in.svg" alt="LinkedIn" /></a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;