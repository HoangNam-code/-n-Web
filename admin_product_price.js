/**
 * admin_product_price.js
 * Xử lý chức năng thiết lập lợi nhuận và tra cứu giá (với modal tìm kiếm).
 */

// --- HÀM TẠO HTML CHO BẢNG TRA CỨU GIÁ ---
function createPriceItemHTML(product) {
    const profitMargin = product.profitMargin || 0;
    const costPrice = product.currentPrice; 
    const sellPrice = costPrice * (1 + (profitMargin / 100));

    return `
        <div class="item">
            <p>${product.id}</p>
            <p>${product.title}</p>
            <p>${product.category}</p>
            <p>${costPrice.toLocaleString('vi-VN')} đ</p>
            <p>${profitMargin.toFixed(2)} %</p>
            <p>${Math.round(sellPrice).toLocaleString('vi-VN')} đ</p>
        </div>
    `;
}

// --- HÀM RENDER (CẬP NHẬT VỚI LOGIC LỌC) ---
function renderPriceList(filters = null) {
    let products = getAllProducts(); // Lấy tất cả
    const listContainer = document.querySelector('#product-price .list-items');
    if (!listContainer) return;

    // [LOGIC MỚI] Lọc sản phẩm nếu có bộ lọc
    if (filters) {
        products = products.filter(prod => {
            const costPrice = prod.currentPrice;
            const profitMargin = prod.profitMargin || 0;
            const sellPrice = Math.round(costPrice * (1 + (profitMargin / 100)));

            // Kiểm tra từng điều kiện
            // (Nếu giá trị filter là NaN, nó sẽ luôn đúng)
            if (costPrice < filters.minCost) return false;
            if (costPrice > filters.maxCost) return false;
            if (profitMargin < filters.minProfit) return false;
            if (profitMargin > filters.maxProfit) return false;
            if (sellPrice < filters.minSell) return false;
            if (sellPrice > filters.maxSell) return false;

            return true; // Vượt qua tất cả các bộ lọc
        });
    }

    listContainer.innerHTML = products.map(createPriceItemHTML).join('');
}

// --- HÀCi M NẠP DỮ LIỆU CHO DROPDOWN (Giữ nguyên) ---
function populatePriceDropdown(mode) {
    const targetSelect = document.getElementById('target-select');
    targetSelect.innerHTML = ''; 

    if (mode === 'category') {
        const categories = getAllCategories();
        targetSelect.innerHTML = '<option value="">-- Chọn Loại Sản Phẩm --</option>';
        categories.forEach(cat => {
            targetSelect.innerHTML += `<option value="${cat.name}">${cat.name}</option>`;
        });
    } else if (mode === 'product') {
        const products = getAllProducts();
        targetSelect.innerHTML = '<option value="">-- Chọn Sản Phẩm --</option>';
        products.forEach(prod => {
            targetSelect.innerHTML += `<option value="${prod.title}">${prod.title}</option>`;
        });
    }
}

// --- HÀM XỬ LÝ CHÍNH (CẬP NHẬT) ---
function handleProductPrice() {
    const priceArea = document.getElementById('product-price');
    if (!priceArea) return;

    // --- Biến Form Lợi Nhuận ---
    const profitForm = document.getElementById('profit-setting-form');
    const targetLabel = document.getElementById('target-label');
    const targetSelect = document.getElementById('target-select');
    const profitValueInput = document.getElementById('profit-value');
    const modeRadios = document.querySelectorAll('input[name="profit_mode"]');

    // --- [MỚI] Biến Form Tìm Kiếm ---
    const searchModal = document.getElementById('search-price-modal');
    const searchForm = document.getElementById('search-price-form');
    const searchBtn = priceArea.querySelector('.heading-wrap .search-btn');
    const searchCloseBtn = searchModal.querySelector('.close-modal-btn');

    // [THÊM MỚI] Lắng nghe sự kiện khi LOẠI SẢN PHẨM thay đổi
    // window.addEventListener('categoriesUpdated', () => {
    //     console.log('Phát hiện Loại thay đổi, nạp lại dropdown Giá bán...');
    //     // Nạp lại dropdown "Theo Loại" và giữ nguyên lựa chọn "Theo Loại"
    //     populatePriceDropdown('category'); 
    //     renderPriceList();
    // });

    // [THÊM MỚI] Lắng nghe sự kiện khi SẢN PHẨM thay đổi
    // window.addEventListener('productsUpdated', () => {
    //     console.log('Phát hiện Sản phẩm thay đổi, nạp lại dropdown Giá bán...');
    //     // Nạp lại dropdown "Theo Sản Phẩm"
    //     // (Chúng ta không tự chuyển, chỉ nạp lại nếu người dùng đang ở tab đó)
        
    //     // Kiểm tra xem người dùng đang chọn mode nào
    //     const currentMode = document.querySelector('input[name="profit_mode"]:checked').value;
    //     if (currentMode === 'product') {
    //         populatePriceDropdown('product');
    //     }

    //     renderPriceList();
    // });

    // 1. RENDER BẢNG TRA CỨU KHI TẢI
    renderPriceList(); // Hiển thị tất cả

    // 2. NẠP DROPDOWN LỢI NHUẬN LẦN ĐẦU
    populatePriceDropdown('category'); 

    // 3. XỬ LÝ THAY ĐỔI RADIO (Giữ nguyên)
    modeRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            const mode = radio.value;
            if (mode === 'category') {
                targetLabel.textContent = 'Chọn Loại Sản Phẩm:';
            } else {
                targetLabel.textContent = 'Chọn Sản Phẩm:';
            }
            populatePriceDropdown(mode); 
        });
    });

    // 4. XỬ LÝ SUBMIT FORM LỢI NHUẬN (Giữ nguyên)
    profitForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const mode = document.querySelector('input[name="profit_mode"]:checked').value;
        const targetValue = targetSelect.value;
        const profitValue = parseFloat(profitValueInput.value);

        if (targetValue === '' || isNaN(profitValue)) {
            alert('Vui lòng chọn đối tượng và nhập tỉ lệ lợi nhuận hợp lệ.');
            return;
        }
        
        if (!confirm(`Bạn có chắc chắn muốn áp dụng ${profitValue}% lợi nhuận cho ${mode}: "${targetValue}"?`)) {
            return;
        }

        let products = getAllProducts();
        let updatedCount = 0;

        if (mode === 'category') {
            products.forEach(prod => {
                if (prod.category === targetValue) {
                    prod.profitMargin = profitValue;
                    updatedCount++;
                }
            });
        } else if (mode === 'product') {
            products.forEach(prod => {
                if (prod.title === targetValue) {
                    prod.profitMargin = profitValue;
                    updatedCount++;
                }
            });
        }

        saveAllProducts(products); 
        alert(`Đã cập nhật lợi nhuận cho ${updatedCount} sản phẩm.`);
        renderPriceList(); // Cập nhật lại bảng tra cứu
        profitForm.reset();
        populatePriceDropdown('category');
    });

    // --- 5. [MỚI] XỬ LÝ LOGIC TÌM KIẾM ---
    
    // Mở modal tìm kiếm
    searchBtn.addEventListener('click', () => {
        searchForm.reset();
        searchModal.style.display = 'flex';
    });

    // Đóng modal tìm kiếm
    function closeSearchModal() {
        searchModal.style.display = 'none';
    }
    searchCloseBtn.addEventListener('click', closeSearchModal);
    searchModal.addEventListener('click', (e) => {
        if (e.target === searchModal) closeSearchModal();
    });

    // Xử lý submit form tìm kiếm
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Lấy giá trị, nếu trống thì gán giá trị mặc định (0 hoặc Infinity)
        const filters = {
            minCost: parseFloat(document.getElementById('min-cost').value) || 0,
            maxCost: parseFloat(document.getElementById('max-cost').value) || Infinity,
            minProfit: parseFloat(document.getElementById('min-profit').value) || 0,
            maxProfit: parseFloat(document.getElementById('max-profit').value) || Infinity,
            minSell: parseFloat(document.getElementById('min-sell').value) || 0,
            maxSell: parseFloat(document.getElementById('max-sell').value) || Infinity,
        };
        
        // Gọi hàm render với bộ lọc
        renderPriceList(filters);
        closeSearchModal();
    });

    console.log('Product Price Management Loaded (with Modal Search)');
}

document.addEventListener('DOMContentLoaded', handleProductPrice);