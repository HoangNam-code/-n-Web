        // --- ĐỊNH NGHĨA CHUNG ---
const LOGIN_STATUS_KEY = 'adminLoggedIn';
const ADMIN_USER = 'admin';
const ADMIN_PASS = '123456'; 

// --- 1. HÀM KIỂM TRA & HIỂN THỊ TRẠNG THÁI ---
function renderAdminState() {
    const loginScreen = document.getElementById('login-screen');
    const adminPanel = document.getElementById('admin-panel');

    // Kiểm tra Session Storage
    if (sessionStorage.getItem(LOGIN_STATUS_KEY) === 'true') {
        // Đã đăng nhập: Ẩn form, hiện panel
        loginScreen.style.display = 'none';
        adminPanel.style.display = 'block';
    } else {
        // Chưa đăng nhập: Hiện form, ẩn panel
        loginScreen.style.display = 'flex';
        adminPanel.style.display = 'none';
    }
}

// --- 2. XỬ LÝ ĐĂNG NHẬP ---
function handleLogin() {
    const loginForm = document.getElementById('login-form');
    if (!loginForm) return; // Đảm bảo form tồn tại

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        const errorMessage = document.getElementById('error-message');

        if (username === ADMIN_USER && password === ADMIN_PASS) {
            // Thành công: Lưu trạng thái và cập nhật giao diện
            sessionStorage.setItem(LOGIN_STATUS_KEY, 'true');
            renderAdminState();
        } else {
            // Thất bại
            errorMessage.textContent = 'Tài khoản hoặc mật khẩu không chính xác.';
            document.getElementById('password').value = '';
        }
    });
}

// --- 3. XỬ LÝ ĐĂNG XUẤT ---
function handleLogout() {
    sessionStorage.removeItem(LOGIN_STATUS_KEY);
    // renderAdminState();
    // // Sau khi đăng xuất, có thể chuyển người dùng về đầu trang
    // window.scrollTo(0, 0);
    window.location.href = '../index.html';
}

// --- KHỞI TẠO CHÍNH ---
document.addEventListener('DOMContentLoaded', () => {
    // Gọi hàm kiểm tra trạng thái ngay khi trang tải xong
    renderAdminState(); 
    
    // Gán sự kiện đăng nhập
    handleLogin(); 
    
    // Gắn sự kiện đăng xuất (thay thế cho link/nút thoát cũ)
    const logoutLink = document.getElementById('logout-link'); // Đảm bảo có ID này
    if (logoutLink) {
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            handleLogout();
        });
    }
    
    // ... Phần còn lại của code JS (quản lý menu, quản lý tồn kho,...) của bạn ...
});