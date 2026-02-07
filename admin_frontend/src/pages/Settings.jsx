import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Settings = () => {
    // 1. Khai báo state để giữ dữ liệu từ MongoDB
    const [generalData, setGeneralData] = useState({
        site_title: '',
        site_about: '',
        shutdown: false
    });
    const [loading, setLoading] = useState(true);

    // 2. Hàm gọi API từ Backend (Cổng 5000)
    const fetchSettings = async () => {
        try {
            // Lưu ý: Dùng đúng route /api/setting đã đăng ký ở server.js
            const response = await axios.get('http://localhost:5000/api/setting/');
            
            // Nếu có dữ liệu key "general_settings" trong MongoDB
            if (response.data.general_settings) {
                setGeneralData(response.data.general_settings);
            }
            setLoading(false);
        } catch (error) {
            console.error("Lỗi lấy dữ liệu từ server:", error);
            setLoading(false);
        }
    };

    // 3. Chạy hàm lấy dữ liệu ngay khi trang web vừa load
    useEffect(() => {
        fetchSettings();
    }, []);

    if (loading) return <div className="p-4">Đang tải dữ liệu từ server...</div>;

    return (
        <div className="container-fluid p-4">
            <h3 className="mb-4">SETTINGS</h3>

            {/* General Settings Card */}
            <div className="card shadow-sm mb-4">
                <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                        <h5 className="card-title m-0">General Settings</h5>
                        <button className="btn btn-dark btn-sm shadow-none">
                            <i className="bi bi-pencil-square"></i> EDIT
                        </button>
                    </div>
                    <h6 className="card-subtitle mb-1 fw-bold">Site Title</h6>
                    <p className="card-text">{generalData.site_title || "Chưa có tiêu đề"}</p>
                    
                    <h6 className="card-subtitle mb-1 fw-bold">About us</h6>
                    <p className="card-text">{generalData.site_about || "Chưa có nội dung giới thiệu"}</p>
                </div>
            </div>

            {/* Shutdown Card */}
            <div className="card shadow-sm mb-4">
                <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                        <h5 className="card-title m-0">Shutdown Website</h5>
                        <div className="form-check form-switch">
                            <input 
                                className="form-check-input" 
                                type="checkbox" 
                                checked={generalData.shutdown}
                                readOnly
                            />
                        </div>
                    </div>
                    <p className="card-text text-muted">
                        Khi bật chế độ shutdown, khách hàng sẽ không thể truy cập website.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Settings;