/**
 * admin-main.js (ĐÃ SỬA LỖI)
 * Xử lý điều hướng sidebar
 */

function renderMainContent() {
    var nav_btns = document.querySelectorAll('.function-nav-btn');
    
    // Tìm khu vực đang active
    var curActiveArea = document.querySelector('.function-area.active-function-area');
    var curActiveBtn = document.querySelector('.function-nav-btn.active-nav'); // Giả sử thêm class này để đổi màu nút

    nav_btns.forEach((nav_btn) => {
        nav_btn.onclick = function() {
            // Xóa active cũ (nếu có)
            if (curActiveArea) {
                curActiveArea.classList.remove('active-function-area');
            }
            if (curActiveBtn) {
                curActiveBtn.classList.remove('active-nav'); // Tùy chọn: xóa màu nút
            }

            // Lấy target mới
            var targetID = this.getAttribute('data-target');
            var newActiveArea = document.getElementById(targetID);

            // Thêm active mới
            if (newActiveArea) {
                newActiveArea.classList.add('active-function-area');
                this.classList.add('active-nav'); // Tùy chọn: đổi màu nút
                
                // Cập nhật lại biến "current"
                curActiveArea = newActiveArea;
                curActiveBtn = this;
            }
        }
    })
}

// CHỈ CHẠY KHI HTML ĐÃ TẢI XONG
document.addEventListener('DOMContentLoaded', () => {
    renderMainContent();
    console.log("Admin Main Nav Loaded.");
});

/**
 * ======================================================
 * LOGIC CẬP NHẬT BẢNG ĐIỀU KHIỂN (TỔNG QUAN)
 * ======================================================
 */

function updateDashboardStats() {
    
    // 1. Lấy dữ liệu từ các hàm database.js của bạn
    // (Giả định các hàm này có sẵn từ database.js hoặc các tệp khác)
    const allUsers = getAllUsers();
    const allProducts = getAllProducts();
    const allOrders = getAllOrders();

    // 2. Tính toán số liệu
    
    // Đếm Khách Hàng (từ admin_user_function.js)
    const customerCount = allUsers.length;

    // Đếm Sản Phẩm (từ admin_product_detail.js)
    const productCount = allProducts.length;

    // Đếm Đơn Hàng Mới (từ admin_product_order.js)
    const newOrderCount = allOrders.filter(order => order.status === 'Mới đặt').length;

    // Đếm Sắp Hết Hàng (từ admin_product_manage.js)
    // Chúng ta sẽ dùng "bộ não" tính toán của bạn để có kết quả chính xác
    const LOW_STOCK_THRESHOLD = 10; // Đặt ngưỡng cảnh báo là 10 (hoặc số bạn muốn)
    
    // Gọi hàm tính toán tổng thể (không có bộ lọc)
    const inventoryReport = calculateInventory(); 
    
    // Đếm số sản phẩm có tồn kho từ 0 đến 10
    const lowStockCount = inventoryReport.filter(item => item.stock >= 0 && item.stock <= LOW_STOCK_THRESHOLD).length;

    
    // 3. Cập nhật các con số lên HTML
    // (Hãy chắc chắn bạn đã thêm các ID này vào admin.html như hướng dẫn trước)
    const statCustomers = document.getElementById('stat-customers');
    const statProducts = document.getElementById('stat-products');
    const statNewOrders = document.getElementById('stat-new-orders');
    const statLowStock = document.getElementById('stat-low-stock');

    if (statCustomers) statCustomers.textContent = customerCount;
    if (statProducts) statProducts.textContent = productCount;
    if (statNewOrders) statNewOrders.textContent = newOrderCount;
    if (statLowStock) statLowStock.textContent = lowStockCount;
}

// ---- GỌI HÀM VÀ TỰ ĐỘNG CẬP NHẬT ----
document.addEventListener('DOMContentLoaded', function() {
    
    // ... (Mã DOMContentLoaded khác của bạn có thể ở đây) ...

    // 1. Gọi hàm ngay khi tải trang (sau khi đăng nhập)
    // Đảm bảo hàm này được gọi sau khi 'admin-panel' hiển thị
    // (Bạn có thể cần gọi nó từ admin-login.js sau khi đăng nhập thành công)
    if (document.getElementById('admin-panel').style.display === 'block') {
         updateDashboardStats();
    }

    // 2. [QUAN TRỌNG] Tự động cập nhật khi dữ liệu thay đổi
    // Các tệp của bạn đã gửi các tín hiệu (event) này, chúng ta chỉ cần lắng nghe!
    
    // Khi đơn hàng thay đổi (ảnh hưởng "Đơn Hàng Mới" và "Sắp Hết Hàng")
    window.addEventListener('ordersUpdated', updateDashboardStats);
    
    // Khi nhập hàng (ảnh hưởng "Sắp Hết Hàng")
    window.addEventListener('importsUpdated', updateDashboardStats);

    // Khi sản phẩm thay đổi (ảnh hưởng "Sản Phẩm" và "Sắp Hết Hàng")
    window.addEventListener('productsUpdated', updateDashboardStats);
    
    // (Tùy chọn) Lắng nghe khi người dùng thay đổi (xem Bước 2)
    window.addEventListener('usersUpdated', updateDashboardStats);


    // 3. Tùy chọn: Cập nhật khi click lại vào tab "Tổng Quan"
    const dashboardButton = document.querySelector('.function-nav-btn[data-target="page-dashboard"]');
    if (dashboardButton) {
        dashboardButton.addEventListener('click', () => {
            updateDashboardStats();
        });
    }
});