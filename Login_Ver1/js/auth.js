// --- 1. Khai báo các biến ---
const switchBtn = document.getElementById('switch-mode-btn');
const pageTitle = document.getElementById('page-title');
const pageDesc = document.getElementById('page-desc');
const submitBtn = document.getElementById('submit-btn');
const btnText = document.getElementById('btn-text');
const btnIcon = document.getElementById('btn-icon');
const loadingSpinner = document.getElementById('loading-spinner');
const footerText = document.getElementById('footer-text');
const heroTitle = document.getElementById('hero-title');

// Các trường input cần ẩn/hiện
const fullnameContainer = document.getElementById('fullname-container');
const loginOptions = document.getElementById('login-options');

// Form & Alert
const authForm = document.getElementById('auth-form');
const alertBox = document.getElementById('alert-box');
const alertText = document.getElementById('alert-text');
const alertIcon = document.getElementById('alert-icon');

// Mật khẩu
const togglePasswordBtn = document.getElementById('toggle-password');
const passwordInput = document.getElementById('password');
const eyeIcon = document.getElementById('eye-icon');

// Trạng thái hiện tại (Mặc định là Login = true)
let isLoginMode = true;

// --- 2. Hàm chuyển đổi chế độ Login <-> Register ---
switchBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Chặn reload trang
    isLoginMode = !isLoginMode; // Đảo ngược trạng thái
    updateUI();
});

function updateUI() {
    // Reset thông báo lỗi
    alertBox.classList.add('hidden');

    if (isLoginMode) {
        // Chế độ ĐĂNG NHẬP
        pageTitle.innerText = "Chào mừng trở lại!";
        pageDesc.innerText = "Nhập thông tin để quản lý bộ sưu tập xe của bạn.";
        
        // Ẩn tên, Hiện ghi nhớ mật khẩu
        fullnameContainer.classList.remove('visible-field');
        fullnameContainer.classList.add('hidden-field');
        
        loginOptions.classList.remove('hidden-field');
        loginOptions.classList.add('visible-field');
        
        // Nút & Footer
        btnText.innerText = "Đăng nhập";
        footerText.innerText = "Chưa là thành viên?";
        switchBtn.innerText = "Đăng ký ngay";
        
        // Hero Text bên phải
        heroTitle.innerHTML = `Làm chủ <span class="text-red-500">tốc độ</span>,<br>chinh phục đam mê.`;
    } else {
        // Chế độ ĐĂNG KÝ
        pageTitle.innerText = "Tạo tài khoản mới";
        pageDesc.innerText = "Đăng ký ngay để nhận báo giá xe độc quyền.";
        
        // Hiện tên, Ẩn ghi nhớ mật khẩu
        fullnameContainer.classList.remove('hidden-field');
        fullnameContainer.classList.add('visible-field');
        
        loginOptions.classList.remove('visible-field');
        loginOptions.classList.add('hidden-field');
        
        // Nút & Footer
        btnText.innerText = "Tạo tài khoản";
        footerText.innerText = "Đã có tài khoản?";
        switchBtn.innerText = "Đăng nhập ngay";

        // Hero Text bên phải
        heroTitle.innerHTML = `Khởi đầu <span class="text-red-500">hành trình</span><br>của riêng bạn.`;
    }
}

// --- 3. Hàm xử lý Ẩn/Hiện mật khẩu ---
togglePasswordBtn.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    // Đổi icon mắt
    if (type === 'text') {
        eyeIcon.classList.remove('ph-eye');
        eyeIcon.classList.add('ph-eye-slash');
    } else {
        eyeIcon.classList.remove('ph-eye-slash');
        eyeIcon.classList.add('ph-eye');
    }
});

// --- 4. Hàm xử lý khi bấm nút Submit (Giả lập) ---
authForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;

    // Bật trạng thái Loading
    submitBtn.disabled = true;
    submitBtn.classList.add('bg-red-400', 'cursor-not-allowed');
    submitBtn.classList.remove('bg-red-600', 'hover:bg-red-700');
    
    btnText.innerText = "Đang xử lý...";
    btnIcon.classList.add('hidden');
    loadingSpinner.classList.remove('hidden');
    alertBox.classList.add('hidden'); // Ẩn thông báo cũ

    // Giả lập chờ 1.5 giây gọi API
    setTimeout(() => {
        // Kiểm tra email đơn giản
        if (!email.includes('@')) {
            showAlert('Vui lòng nhập email hợp lệ!', 'error');
        } else {
            showAlert(isLoginMode ? 'Đăng nhập thành công!' : 'Tạo tài khoản thành công!', 'success');
        }

        // Tắt trạng thái Loading
        submitBtn.disabled = false;
        submitBtn.classList.remove('bg-red-400', 'cursor-not-allowed');
        submitBtn.classList.add('bg-red-600', 'hover:bg-red-700');
        
        btnText.innerText = isLoginMode ? "Đăng nhập" : "Tạo tài khoản";
        btnIcon.classList.remove('hidden');
        loadingSpinner.classList.add('hidden');

    }, 1500);
});

// Hàm hiển thị thông báo
function showAlert(message, type) {
    alertBox.classList.remove('hidden');
    alertText.innerText = message;
    
    if (type === 'error') {
        alertBox.className = "mb-6 flex items-center gap-2 rounded-lg p-3 text-sm border bg-red-50 text-red-600 border-red-100 animate-pulse";
        alertIcon.className = "ph-fill ph-warning-circle text-lg";
    } else {
        alertBox.className = "mb-6 flex items-center gap-2 rounded-lg p-3 text-sm border bg-green-50 text-green-700 border-green-100";
        alertIcon.className = "ph-fill ph-check-circle text-lg";
    }
}