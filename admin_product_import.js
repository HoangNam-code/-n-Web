/**
 * admin_product_import.js
 * [LOGIC KHO V3.5 - BẢN KIỂM TRA DEBUG]
 * Thêm console.log để kiểm tra cache.
 */

let tempImportItems = [];
let originalImportStatus = null; 

// --- HÀM TẠO HTML ---
function createImportItemHTML(importItem) {
    const displayDate = new Date(importItem.date).toLocaleDateString('vi-VN');
    const totalCost = (importItem.items || []).reduce((sum, item) => sum + (item.quantity * item.costPrice), 0);
    const isCompleted = importItem.status === 'Hoàn thành';
    const deleteDisabled = isCompleted ? 'disabled' : '';

    return `
        <div class="item" id="import-${importItem.id}">
            <p>${importItem.id}</p><p>${displayDate}</p>
            <p>${totalCost.toLocaleString('vi-VN')} đ</p>
            <p>${importItem.status}</p><p>${importItem.notes}</p>
            <div class="btn-list">
                <button class="btn adjust-btn blue" data-import-id="${importItem.id}">Sửa/Xem</button>
                <button class="btn delete-btn red" data-import-id="${importItem.id}" ${deleteDisabled}>Xóa</button>
            </div>
        </div>
    `;
}

// --- HÀM RENDER ---
function renderImportList(searchTerm = '') { 
    let imports = getAllImports();
    const listContainer = document.querySelector('#product-import .list-items');
    if (!listContainer) return;
    if (searchTerm && searchTerm.trim() !== '') {
        const lowerTerm = searchTerm.toLowerCase().trim();
        imports = imports.filter(item => 
            item.id.toString().includes(lowerTerm) || 
            item.status.toLowerCase().includes(lowerTerm) ||
            (item.notes && item.notes.toLowerCase().includes(lowerTerm))
        );
    }
    listContainer.innerHTML = imports.map(createImportItemHTML).join('');
}

// --- HÀM NẠP DROPDOWN SẢN PHẨM ---
function populateImportProductSelect() {
    const productSelect = document.getElementById('import-product-select');
    if (!productSelect) return;
    
    const currentSelectedId = productSelect.value;
    
    const products = getAllProducts();
    productSelect.innerHTML = '<option value="">-- Chọn Sản Phẩm --</option>';
    products.forEach(prod => {
        productSelect.innerHTML += `<option value="${prod.id}" data-cost="${prod.currentPrice}">${prod.id} - ${prod.title}</option>`;
    });
    
    productSelect.value = currentSelectedId;
}

// --- HÀM RENDER SẢN PHẨM TẠM THỜI ---
function renderTempItems(isLocked = false) {
    const listContainer = document.getElementById('import-temp-items');
    const totalCostEl = document.getElementById('import-total-cost');
    if (!listContainer || !totalCostEl) return;

    let totalCost = 0;
    listContainer.innerHTML = ''; 
    tempImportItems.forEach((item, index) => {
        const product = getProductById(item.productId);
        const productName = product ? product.title : 'Sản phẩm không tồn tại';
        const itemTotal = (item.quantity * item.costPrice);
        totalCost += itemTotal;
        const deleteDisabled = isLocked ? 'disabled' : '';
        listContainer.innerHTML += `
            <div class="item" data-index="${index}">
                <p>${productName}</p><p>${item.quantity}</p>
                <p>${item.costPrice.toLocaleString('vi-VN')} đ</p>
                <p>${itemTotal.toLocaleString('vi-VN')} đ</p>
                <div class="btn-list">
                    <button class="btn delete-temp-item-btn red" ${deleteDisabled}>Xóa</button>
                </div>
            </div>
        `;
    });
    totalCostEl.textContent = `Tổng Tiền: ${totalCost.toLocaleString('vi-VN')} đ`;
}

// --- HÀM XỬ LÝ CHÍNH (VIẾT LẠI AN TOÀN) ---
function handleProductImport() {
    const importArea = document.getElementById('product-import');
    if (!importArea) return;

    // Các biến form...
    const addModal = document.getElementById('import-modal');
    if (!addModal) {
        console.error("Không tìm thấy #import-modal. Chức năng Nhập kho sẽ không hoạt động.");
        return;
    }
    const masterForm = document.getElementById('import-form-master');
    const detailForm = document.getElementById('import-form-detail');
    const addBtn = importArea.querySelector('.heading-wrap .add-btn');
    const closeBtn = addModal.querySelector('.close-modal-btn');
    const saveBtn = document.getElementById('save-import-btn');
    const errorMessage = document.getElementById('import-error-message');
    const idInput = document.getElementById('import-id');
    const dateInput = document.getElementById('import-date');
    const statusInput = document.getElementById('import-status');
    const notesInput = document.getElementById('import-notes');
    const productSelect = document.getElementById('import-product-select');
    const quantityInput = document.getElementById('import-quantity');
    const costPriceInput = document.getElementById('import-cost-price');
    
    // Các biến tìm kiếm...
    const searchModal = document.getElementById('search-import-modal');
    const searchForm = document.getElementById('search-import-form');
    const searchBtn = importArea.querySelector('.heading-wrap .search-btn');
    const searchCloseBtn = searchModal.querySelector('.close-modal-btn');
    const searchInput = document.getElementById('search-import-input');

    // 1. RENDER & NẠP
    renderImportList();
    populateImportProductSelect();

    if (productSelect) {
        productSelect.addEventListener('change', () => {
            const selectedOption = productSelect.options[productSelect.selectedIndex];
            const costPrice = selectedOption.getAttribute('data-cost');
            if (costPriceInput) costPriceInput.value = costPrice || 0;
        });
    }

    // 2. MỞ FORM THÊM MỚI (Reset về trạng thái sửa được)
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            if (masterForm) masterForm.reset();
            if (detailForm) detailForm.reset();
            if (idInput) { idInput.readOnly = false; idInput.disabled = false; }
            if (dateInput) dateInput.disabled = false;
            if (statusInput) statusInput.disabled = false;
            if (notesInput) notesInput.disabled = false;
            if (errorMessage) errorMessage.textContent = '';
            tempImportItems = [];
            originalImportStatus = 'Chưa hoàn thành';
            renderTempItems(false);
            if (detailForm) detailForm.style.display = 'block';
            if (saveBtn) saveBtn.disabled = false;
            if (masterForm) masterForm.removeAttribute('data-editing-id');
            addModal.style.display = 'flex';
        });
    }

    // 3. ĐÓNG FORM
    function closeAddModal() { addModal.style.display = 'none'; tempImportItems = []; }
    if (closeBtn) closeBtn.addEventListener('click', closeAddModal);
    addModal.addEventListener('click', (e) => { if (e.target === addModal) closeAddModal(); });

    // 4. THÊM SẢN PHẨM VÀO PHIẾU TẠM
    if (detailForm) {
        detailForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const selectedId = productSelect.value;
            const quantity = parseInt(quantityInput.value);
            const costPrice = parseFloat(costPriceInput.value);
            if (!selectedId || isNaN(quantity) || quantity <= 0 || isNaN(costPrice)) {
                if (errorMessage) errorMessage.textContent = 'Vui lòng chọn sản phẩm, nhập số lượng và giá vốn hợp lệ.';
                return;
            }
            tempImportItems.push({ productId: selectedId, quantity: quantity, costPrice: costPrice });
            renderTempItems(false);
            detailForm.reset();
            productSelect.focus();
            if (errorMessage) errorMessage.textContent = '';
        });
    }

    // 5. XÓA SẢN PHẨM KHỎI PHIẾU TẠM
    const tempItemsContainer = document.getElementById('import-temp-items');
    if (tempItemsContainer) {
        tempItemsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('delete-temp-item-btn')) {
                const itemIndex = e.target.closest('.item').getAttribute('data-index');
                tempImportItems.splice(itemIndex, 1);
                renderTempItems(false);
            }
        });
    }

    // 6. LƯU PHIẾU NHẬP
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            const editingId = masterForm ? masterForm.getAttribute('data-editing-id') : null;
            
            const importData = {
                id: parseInt(idInput.value),
                date: dateInput.value,
                status: statusInput.value,
                notes: notesInput.value.trim(),
                items: tempImportItems
            };

            if (isNaN(importData.id) || !importData.date) {
                if (errorMessage) errorMessage.textContent = 'ID Phiếu và Ngày Nhập là bắt buộc.';
                return;
            }
            if (importData.items.length === 0) {
                if (errorMessage) errorMessage.textContent = 'Phiếu nhập phải có ít nhất 1 sản phẩm.';
                return;
            }
            
            if (editingId) {
                updateImport(parseInt(editingId), importData);
            } else {
                const result = addNewImport(importData);
                if (!result.success) {
                    if (errorMessage) errorMessage.textContent = result.message;
                    return;
                }
            }
            
            renderImportList();
            closeAddModal();
            window.dispatchEvent(new Event('importsUpdated'));
        });
    }

    // 7. CLICK DANH SÁCH (Sửa/Xóa)
    const listItemsContainer = importArea.querySelector('.list-items');
    if (listItemsContainer) {
        listItemsContainer.addEventListener('click', (e) => {
            const target = e.target;
            
            if (target.classList.contains('adjust-btn')) {
                // --- SỬA / XEM ---
                const importId = target.getAttribute('data-import-id');
                const importItem = getImportById(importId);
                
                if (importItem) {
                    if (idInput) { idInput.value = importItem.id; }
                    if (dateInput) dateInput.value = importItem.date;
                    if (statusInput) statusInput.value = importItem.status;
                    if (notesInput) notesInput.value = importItem.notes;
                    tempImportItems = [...(importItem.items || [])];
                    originalImportStatus = importItem.status;
                    if (masterForm) masterForm.setAttribute('data-editing-id', importItem.id); 
                    if (errorMessage) errorMessage.textContent = '';
                    
                    const isCompleted = (importItem.status === 'Hoàn thành');
                    
                    if (idInput) idInput.readOnly = true;
                    if (dateInput) dateInput.disabled = isCompleted;
                    if (statusInput) statusInput.disabled = isCompleted;
                    if (notesInput) notesInput.disabled = isCompleted;
                    if (detailForm) detailForm.style.display = isCompleted ? 'none' : 'block'; 
                    renderTempItems(isCompleted); 
                    if (saveBtn) saveBtn.disabled = isCompleted;
                    
                    addModal.style.display = 'flex';
                }
            } else if (target.classList.contains('delete-btn')) {
                // --- XÓA (CÓ KIỂM TRA DEBUG) ---
                
                const importId = parseInt(target.getAttribute('data-import-id'));
                
                // [THÊM KIỂM TRA]
                console.log(`V3.5 XÓA: Đang xóa ID dạng SỐ (Number): ${importId}`);
                
                if (target.hasAttribute('disabled')) {
                    alert('Không thể xóa phiếu đã Hoàn thành.');
                    return;
                }
                if (confirm(`Bạn có chắc chắn muốn XÓA phiếu nhập ID: ${importId}?`)) {
                    deleteImport(importId); 
                    renderImportList();
                    window.dispatchEvent(new Event('importsUpdated'));
                }
            }
        });
    }

    // 8. LOGIC TÌM KIẾM
    if (searchBtn && searchModal) {
        searchBtn.addEventListener('click', () => {
            if (searchForm) searchForm.reset();
            searchModal.style.display = 'flex';
        });
        function closeSearchModal() { searchModal.style.display = 'none'; }
        if (searchCloseBtn) searchCloseBtn.addEventListener('click', closeSearchModal);
        searchModal.addEventListener('click', (e) => { if (e.target === searchModal) closeSearchModal(); });
        if (searchForm) {
            searchForm.addEventListener('submit', (e) => {
                e.preventDefault();
                renderImportList(searchInput.value);
                closeSearchModal();
            });
        }
    }

    // 9. Lắng nghe sự kiện
    window.addEventListener('productsUpdated', () => {
        console.log('IMPORT: Phát hiện sản phẩm thay đổi, nạp lại dropdown...');
        populateImportProductSelect();
    });

    console.log('Product Import Management (v3.5 - Debug Mode) Loaded');
}

document.addEventListener('DOMContentLoaded', handleProductImport);