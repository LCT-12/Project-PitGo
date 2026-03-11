import React, { useEffect } from 'react';

const CustomAlert = ({ type, msg, onClose }) => {
  useEffect(() => {
    // Tự động đóng sau 2 giây giống hàm setTimeout(remAlert, 2000) của bạn
    const timer = setTimeout(onClose, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bsClass = type === 'success' ? 'alert-success' : 'alert-danger';

  return (
    <div className="custom-alert-container">
      <div className={`alert ${bsClass} alert-dismissible fade show shadow-sm`} role="alert">
        <strong className="me-3">{msg}</strong>
        <button 
          type="button" 
          className="btn-close" 
          onClick={onClose} 
          aria-label="Close"
        ></button>
      </div>
    </div>
  );
};

export default CustomAlert;