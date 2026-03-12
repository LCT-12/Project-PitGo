import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ showAlert, onLoginSuccess }) => {
    const [formData, setFormData] = useState({ admin_name: '', admin_pass: '' });

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/admin/login', formData);
            if (res.data.success) {
                // Lưu trạng thái đăng nhập đơn giản
                localStorage.setItem('isAdminLoggedIn', 'true');
                showAlert('success', "Chào mừng Admin quay trở lại!");
                onLoginSuccess(); // Gọi hàm này để App.jsx render lại giao diện Admin
            }
        } catch (err) {
            showAlert('danger', err.response?.data?.message || "Đăng nhập thất bại!");
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <h3 style={{ marginBottom: "20px" }}>ADMIN LOGIN</h3>
                <input 
                    style={{ marginBottom: "20px" }}
                    type="text" 
                    placeholder="Username" 
                    onChange={(e) => setFormData({...formData, admin_name: e.target.value})} 
                />
                <input 
                    style={{ marginBottom: "20px" }}
                    type="password" 
                    placeholder="Password" 
                    onChange={(e) => setFormData({...formData, admin_pass: e.target.value})} 
                />
                <button className='submit-btn' type="submit">LOGIN</button>
            </form>
        </div>
    );
};

export default Login;