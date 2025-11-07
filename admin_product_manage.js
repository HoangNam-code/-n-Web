/**
 * admin_product_manage.js
 * [LOGIC KHO V3.0 - BỘ NÃO TÍNH TOÁN]
 * Tính toán Nhập-Xuất-Tồn từ lịch sử (Imports/Orders).
 */

// [HÀM NÃO] Tính toán Nhập/Xuất/Tồn
// filters = { dateFrom, dateTo, category, productId }
function calculateInventory(filters = {}) {
    let products = getAllProducts();
    const imports = getAllImports();
    const orders = getAllOrders();

    // 1. Lọc sản phẩm (nếu cần)
    if (filters.productId) {
        products = products.filter(p => p.id == filters.productId);
    } else if (filters.category) { // Chỉ lọc theo loại nếu không lọc theo SP
        products = products.filter(p => p.category === filters.category);
    }

    // 2. Tính toán Nhập/Xuất cho từng sản phẩm
    const inventoryReport = products.map(prod => {
        let totalImported = 0;
        let soldCount = 0;

        // Tính Tổng Nhập (chỉ phiếu "Hoàn thành")
        imports.forEach(imp => {
            if (imp.status === 'Hoàn thành') {
                // Lọc theo ngày
                if (filters.dateFrom && imp.date < filters.dateFrom) return;
                if (filters.dateTo && imp.date > filters.dateTo) return;
                
                (imp.items || []).forEach(item => {
                    if (item.productId === prod.id) {
                        totalImported += item.quantity;
                    }
                });
            }
        });
        
        // Tính Tổng Xuất (chỉ đơn "Đã giao")
        orders.forEach(ord => {
            if (ord.status === 'Đã giao') { // Chỉ "Đã giao" mới tính là Xuất
                // Lọc theo ngày
                if (filters.dateFrom && ord.orderDate < filters.dateFrom) return;
                if (filters.dateTo && ord.orderDate > filters.dateTo) return;

                (ord.items || []).forEach(item => {
                    if (item.productId === prod.id) {
                        soldCount += item.quantity;
                    }
                });
            }
        });

        // Trả về object báo cáo
        return {
            ...prod, // Lấy thông tin (id, title)
            totalImported: totalImported,
            soldCount: soldCount,
            stock: totalImported - soldCount // Tồn = Nhập - Xuất
        };
    });

    return inventoryReport;
}


// --- HÀM TẠO HTML (Đã sửa lỗi 'filters not defined') ---
function createInventoryItemHTML(reportItem, filters = {}) {
    // [SỬA LỖI] Đặt mức cảnh báo là 100
    const lowStockLevel = 100;
    
    // Cảnh báo nếu tồn kho > 0 VÀ < 100
    const warningClass = (reportItem.stock >= 0 && reportItem.stock <= lowStockLevel) ? 'warn-low-product' : '';

    return `
        <div class="item ${warningClass}" id="inventory-${reportItem.id}">
            <p>${reportItem.id}</p>
            <p>${reportItem.title}</p>
            <p>${reportItem.totalImported}</p>
            <p>${reportItem.soldCount}</p>
            <p>${reportItem.stock}</p>
            <p>${filters.dateFrom || 'N/A'}</p>
            <p>${filters.dateTo || 'N/A'}</p>
        </div>
    `;
}

// Biến toàn cục lưu bộ lọc hiện tại
let currentInventoryFilters = {};

// --- HÀM RENDER (Cập nhật) ---
function renderInventoryList(filters = {}) { 
    currentInventoryFilters = filters; // Lưu bộ lọc
    
    const listContainer = document.querySelector('#product-manage .list-items');
    if (!listContainer) return;
    
    // Gọi "bộ não" để lấy dữ liệu
    const reportData = calculateInventory(filters);

    // [SỬA LỖI] Truyền "filters" vào createInventoryItemHTML
    listContainer.innerHTML = reportData.map(item => 
        createInventoryItemHTML(item, filters)
    ).join('');
}

// --- HÀM NẠP DROPDOWN (Cho cả 2) ---
function populateInventoryDropdowns() {
    const products = getAllProducts();
    const categories = getAllCategories();

    // 1. Nạp Dropdown Tra cứu nhanh (ở trên)
    const productSelectTop = document.getElementById('product-select');
    if (productSelectTop) {
        const currentSelectedId = productSelectTop.value; 
        productSelectTop.innerHTML = '<option value="">-- Chọn Sản Phẩm --</option>';
        products.forEach(prod => {
            productSelectTop.innerHTML += `<option value="${prod.id}">${prod.id} - ${prod.title}</option>`;
        });
        productSelectTop.value = currentSelectedId;
    }

    // 2. Nạp Dropdown Modal Tìm Kiếm (ở dưới)
    const categorySelectModal = document.getElementById('search-inv-category');
    const productSelectModal = document.getElementById('search-inv-product');
    
    if (categorySelectModal) {
        categorySelectModal.innerHTML = '<option value="">Tất cả Loại</option>';
        categories.forEach(cat => {
            // Lấy tên loại, không phải ID (dựa theo logic tính toán)
            categorySelectModal.innerHTML += `<option value="${cat.name}">${cat.name}</option>`;
        });
    }
    if (productSelectModal) {
        productSelectModal.innerHTML = '<option value="">Tất cả Sản Phẩm</option>';
        products.forEach(prod => {
            productSelectModal.innerHTML += `<option value="${prod.id}">${prod.title}</option>`;
        });
    }
}

// --- HÀM XỬ LÝ CHÍNH ---
function handleProductInventory() {
    const inventoryArea = document.getElementById('product-manage');
    if (!inventoryArea) return;

    // --- Biến cho Tra cứu nhanh (Phần 1) ---
    const productSelectTop = document.getElementById('product-select');
    const currentStockInput = document.getElementById('current-stock');
    
    // --- Biến cho Tra cứu Báo cáo (Phần 2) ---
    const searchModal = document.getElementById('search-inventory-modal');
    const searchForm = document.getElementById('search-inventory-form');
    const searchBtn = inventoryArea.querySelector('.heading-wrap .search-btn');
    const searchCloseBtn = searchModal.querySelector('.close-modal-btn');
    // (Inputs)
    const searchCategory = document.getElementById('search-inv-category');
    const searchProduct = document.getElementById('search-inv-product');
    const searchDateFrom = document.getElementById('search-inv-date-from');
    const searchDateTo = document.getElementById('search-inv-date-to');

    // 1. RENDER BẢNG KÊ VÀ NẠP DROPDOWN KHI TẢI
    renderInventoryList(); // Hiển thị tổng thể
    populateInventoryDropdowns();

    // 2. XỬ LÝ DROPDOWN TRA CỨU NHANH (Req 8.1 - Tồn kho hiện tại)
    if (productSelectTop) {
        productSelectTop.addEventListener('change', () => {
            const selectedId = productSelectTop.value;
            if (!selectedId) {
                currentStockInput.value = '0';
                return;
            }
            // Tính toán kho TỔNG THỂ (không lọc ngày) cho 1 SP
            const report = calculateInventory({ productId: selectedId });
            if (report.length > 0) {
                currentStockInput.value = report[0].stock; // Hiển thị tồn kho
            } else {
                currentStockInput.value = '0';
            }
        });
    }

    // 3. LOGIC Mở/Đóng Form TÌM KIẾM (Req 8.3)
    searchBtn.addEventListener('click', () => {
        searchForm.reset();
        searchModal.style.display = 'flex';
    });
    function closeSearchModal() {
        searchModal.style.display = 'none';
    }
    searchCloseBtn.addEventListener('click', closeSearchModal);
    searchModal.addEventListener('click', (e) => {
        if (e.target === searchModal) closeSearchModal();
    });

    // 4. Xử lý SUBMIT Form TÌM KIẾM (Req 8.3)
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Lấy bộ lọc từ form
        const filters = {
            category: searchCategory.value,
            productId: searchProduct.value,
            dateFrom: searchDateFrom.value,
            dateTo: searchDateTo.value
        };
        
        renderInventoryList(filters); // Chạy báo cáo
        closeSearchModal();
    });
    
    // 5. [QUAN TRỌNG] Lắng nghe sự kiện để TỰ ĐỘNG CẬP NHẬT
    function refreshData() {
        console.log('TỒN KHO: Phát hiện thay đổi (Import/Order), tự động cập nhật báo cáo...');
        
        // Tải lại Bảng kê (theo bộ lọc hiện tại)
        renderInventoryList(currentInventoryFilters); 
        
        // Tải lại Dropdown
        populateInventoryDropdowns();
        
        // Tải lại ô input "Tồn Kho Hiện Tại" (nếu đang chọn)
        const selectedId = productSelectTop.value;
        if (selectedId) {
            const report = calculateInventory({ productId: selectedId });
            currentStockInput.value = (report.length > 0) ? report[0].stock : '0';
        }
    }
    
    window.addEventListener('importsUpdated', refreshData);
    window.addEventListener('ordersUpdated', refreshData);
    window.addEventListener('productsUpdated', refreshData); // Khi thêm/xóa SP

    console.log('Product Inventory Management (v3.0 Log-based) Loaded');
}

document.addEventListener('DOMContentLoaded', handleProductInventory);