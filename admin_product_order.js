/**
 * admin_product_order.js
 * [PHIÊN BẢN V3.1 - ĐÃ LOẠI BỎ CHỨC NĂNG XÓA]
 */

let tempOrderItems = [];
let originalOrderStatus = null; 

// --- HÀM TẠO HTML (Đã xóa nút Xóa) ---
function createOrderItemHTML(order) {
    const displayDate = new Date(order.orderDate).toLocaleDateString('vi-VN');
    const totalAmount = (order.items || []).reduce((sum, item) => sum + (item.quantity * item.sellPrice), 0);
    
    // --- ĐÃ XÓA --- Logic kiểm tra khóa và nút xóa
    // const isLocked = (order.status === 'Đã giao' || order.status === 'Hủy');
    // const deleteDisabled = isLocked ? 'disabled' : '';

    return `
        <div class="item" id="order-${order.id}">
            <p>${order.id}</p><p>${order.customerName}</p>
            <p>${displayDate}</p><p>${totalAmount.toLocaleString('vi-VN')} đ</p>
            <p>${order.status}</p>
            <div class="btn-list">
                <button class="btn adjust-btn blue" data-order-id="${order.id}">Sửa/Xem</button>
                </div>
        </div>
    `;
}

// --- HÀM RENDER ---
function renderOrderList(filters = {}) { 
    let orders = getAllOrders();
    const listContainer = document.querySelector('#product-order .list-items');
    if (!listContainer) return;
    if (filters.status) { orders = orders.filter(item => item.status === filters.status); }
    if (filters.dateFrom) { orders = orders.filter(item => item.orderDate >= filters.dateFrom); }
    if (filters.dateTo) { orders = orders.filter(item => item.orderDate <= filters.dateTo); }
    listContainer.innerHTML = orders.map(createOrderItemHTML).join('');
}

// --- HÀM NẠP DROPDOWN SẢN PHẨM ---
function populateOrderProductSelect() {
    const productSelect = document.getElementById('order-product-select');
    if (!productSelect) return;
    const products = getAllProducts();
    const currentSelectedId = productSelect.value;
    productSelect.innerHTML = '<option value="">-- Chọn Sản Phẩm --</option>';
    products.forEach(prod => {
        const profit = prod.profitMargin || 0;
        const sellPrice = Math.round(prod.currentPrice * (1 + (profit / 100)));
        productSelect.innerHTML += `<option value="${prod.id}" data-price="${sellPrice}">${prod.id} - ${prod.title}</option>`;
    });
    productSelect.value = currentSelectedId;
}

// --- HÀM RENDER SẢN PHẨM TẠM THỜI ---
function renderTempOrderItems(isLocked = false) {
    const listContainer = document.getElementById('order-temp-items');
    const totalAmountEl = document.getElementById('order-total-amount');
    let totalAmount = 0;
    listContainer.innerHTML = ''; 
    tempOrderItems.forEach((item, index) => {
        const product = getProductById(item.productId);
        const productName = product ? product.title : 'Sản phẩm không tồn tại';
        const itemTotal = (item.quantity * item.sellPrice);
        totalAmount += itemTotal;
        const deleteDisabled = isLocked ? 'disabled' : '';
        listContainer.innerHTML += `
            <div class="item" data-index="${index}">
                <p>${productName}</p><p>${item.quantity}</p>
                <p>${item.sellPrice.toLocaleString('vi-VN')} đ</p>
                <p>${itemTotal.toLocaleString('vi-VN')} đ</p>
                <div class="btn-list">
                    <button class="btn delete-temp-item-btn red" ${deleteDisabled}>Xóa</button>
                </div>
            </div>
        `;
    });
    totalAmountEl.textContent = `Tổng Tiền: ${totalAmount.toLocaleString('vi-VN')} đ`;
}


// --- HÀM XỬ LÝ CHÍNH ---
function handleProductOrder() {
    const orderArea = document.getElementById('product-order');
    if (!orderArea) return;

    // --- Biến cho Form 'THÊM/SỬA' ---
    const addModal = document.getElementById('order-modal');
    const masterForm = document.getElementById('order-form-master');
    const detailForm = document.getElementById('order-form-detail');
    const addBtn = orderArea.querySelector('.heading-wrap .add-btn'); 
    const closeBtn = addModal.querySelector('.close-modal-btn');
    const saveBtn = document.getElementById('save-order-btn');
    const errorMessage = document.getElementById('order-error-message');
    const idInput = document.getElementById('order-id');
    const dateInput = document.getElementById('order-date');
    const statusInput = document.getElementById('order-status');
    const customerInput = document.getElementById('order-customer');
    const productSelect = document.getElementById('order-product-select');
    const quantityInput = document.getElementById('order-quantity');
    const priceInput = document.getElementById('order-sell-price');
    
    // --- Biến cho Form 'TÌM KIẾM' ---
    const searchModal = document.getElementById('search-order-modal');
    const searchForm = document.getElementById('search-order-form');
    const searchBtn = orderArea.querySelector('.heading-wrap .search-btn');
    const searchCloseBtn = searchModal.querySelector('.close-modal-btn');
    const searchDateFrom = document.getElementById('search-order-date-from');
    const searchDateTo = document.getElementById('search-order-date-to');
    const searchStatus = document.getElementById('search-order-status');

    // 1. RENDER VÀ NẠP
    renderOrderList();
    populateOrderProductSelect();
    
    if(productSelect) {
        productSelect.addEventListener('change', () => {
            const selectedOption = productSelect.options[productSelect.selectedIndex];
            const sellPrice = selectedOption.getAttribute('data-price');
            document.getElementById('order-sell-price').value = sellPrice || 0;
        });
    }

    // 2. MỞ FORM THÊM MỚI
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            masterForm.reset();
            detailForm.reset();
            idInput.readOnly = false;
            errorMessage.textContent = '';
            tempOrderItems = []; 
            originalOrderStatus = 'Mới đặt'; 
            renderTempOrderItems(false); 
            detailForm.style.display = 'block';
            saveBtn.disabled = false;
            statusInput.disabled = false;
            idInput.disabled = false;
            dateInput.disabled = false;
            customerInput.disabled = false;
            masterForm.removeAttribute('data-editing-id');
            addModal.style.display = 'flex';
        });
    }

    // 3. ĐÓNG FORM
    function closeAddModal() { addModal.style.display = 'none'; tempOrderItems = []; }
    if(closeBtn) closeBtn.addEventListener('click', closeAddModal);
    if(addModal) addModal.addEventListener('click', (e) => { if (e.target === addModal) closeAddModal(); });

    // 4. THÊM SẢN PHẨM VÀO ĐƠN TẠM
    if(detailForm) {
        detailForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const selectedId = productSelect.value;
            const quantity = parseInt(quantityInput.value);
            const sellPrice = parseFloat(priceInput.value);
            if (!selectedId || isNaN(quantity) || quantity <= 0 || isNaN(sellPrice)) {
                errorMessage.textContent = 'Vui lòng chọn sản phẩm, nhập số lượng và giá bán hợp lệ.';
                return;
            }
            tempOrderItems.push({ productId: selectedId, quantity: quantity, sellPrice: sellPrice });
            renderTempOrderItems(false);
            detailForm.reset();
            productSelect.focus();
            errorMessage.textContent = '';
        });
    }

    // 5. XÓA SẢN PHẨM KHỎI ĐƠN TẠM
    const tempItemsContainer = document.getElementById('order-temp-items');
    if(tempItemsContainer) {
        tempItemsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('delete-temp-item-btn')) {
                const itemIndex = e.target.closest('.item').getAttribute('data-index');
                tempOrderItems.splice(itemIndex, 1);
                renderTempOrderItems(false); 
            }
        });
    }

    // 6. LƯU ĐƠN HÀNG
    if(saveBtn) {
        saveBtn.addEventListener('click', () => {
            const editingId = masterForm.getAttribute('data-editing-id');
            const orderData = {
                id: idInput.value.trim(),
                customerName: customerInput.value.trim(),
                orderDate: dateInput.value,
                status: statusInput.value,
                items: tempOrderItems 
            };
            if (!orderData.id || !orderData.customerName || !orderData.orderDate) {
                errorMessage.textContent = 'ID, Tên Khách Hàng và Ngày Đặt là bắt buộc.';
                return;
            }
            if (orderData.items.length === 0) {
                errorMessage.textContent = 'Đơn hàng phải có ít nhất 1 sản phẩm.';
                return;
            }
            orderData.totalAmount = orderData.items.reduce((sum, item) => sum + (item.quantity * item.sellPrice), 0);
            
            let result;
            if (editingId) {
                updateOrder(editingId, orderData);
            } else {
                result = addNewOrder(orderData);
                if (!result.success) {
                    errorMessage.textContent = result.message;
                    return;
                }
            }
            renderOrderList();
            closeAddModal();
            window.dispatchEvent(new Event('ordersUpdated')); // [PHÁT TÍN HIỆU]
        });
    }

    // 7. CLICK DANH SÁCH (Chỉ còn Sửa/Xem)
    const listItemsContainer = orderArea.querySelector('.list-items');
    if (listItemsContainer) {
        listItemsContainer.addEventListener('click', (e) => {
            const target = e.target;
            
            if (target.classList.contains('adjust-btn')) {
                const orderId = target.getAttribute('data-order-id');
                const order = getOrderById(orderId);
                if (order) {
                    idInput.value = order.id;
                    idInput.readOnly = true;
                    dateInput.value = order.orderDate;
                    statusInput.value = order.status;
                    customerInput.value = order.customerName;
                    tempOrderItems = [...(order.items || [])];
                    originalOrderStatus = order.status;
                    masterForm.setAttribute('data-editing-id', order.id);
                    errorMessage.textContent = '';
                    const isLocked = (order.status === 'Đã giao' || order.status === 'Hủy');
                    detailForm.style.display = isLocked ? 'none' : 'block';
                    renderTempOrderItems(isLocked); 
                    statusInput.disabled = isLocked;
                    saveBtn.disabled = isLocked;
                    addModal.style.display = 'flex';
                }
            } 
            
            // --- ĐÃ XÓA --- Toàn bộ khối 'else if (target.classList.contains('delete-btn'))' đã bị xóa
            
        });
    }

    // 8. LOGIC TÌM KIẾM
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            searchForm.reset();
            searchModal.style.display = 'flex';
        });
    }
    if(searchCloseBtn) searchCloseBtn.addEventListener('click', () => searchModal.style.display = 'none');
    if(searchModal) searchModal.addEventListener('click', (e) => { if (e.target === searchModal) searchModal.style.display = 'none'; });
    
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const filters = {
                dateFrom: searchDateFrom.value,
                dateTo: searchDateTo.value,
                status: searchStatus.value
            };
            renderOrderList(filters);
            searchModal.style.display = 'none';
        });
    }

    // 9. Lắng nghe
    window.addEventListener('productsUpdated', () => {
        populateOrderProductSelect();
    });

    console.log('Product Order Management (v3.1 - No Delete) Loaded');
}

document.addEventListener('DOMContentLoaded', handleProductOrder);  