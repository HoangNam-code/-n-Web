/**
 * admin_product_category.js
 * Xử lý CRUD đầy đủ cho #product-category
 */

// --- HÀM TẠO HTML ---
function createCategoryItemHTML(category) {
    return `
        <div class="item" id="category-${category.id}">
            <p>${category.id}</p>
            <p>${category.name}</p>
            <p>${category.description}</p>
            <div class="btn-list">
                <button class="btn adjust-btn blue" data-category-id="${category.id}">Sửa</button>
                <button class="btn delete-btn red" data-category-id="${category.id}">Xóa</button>
            </div>
        </div>
    `;
}

// --- HÀM RENDER DANH SÁCH ---
function renderCategoryList() {
    const categories = getAllCategories(); // Từ database.js
    const listContainer = document.querySelector('#product-category .list-items');
    if (!listContainer) return;

    listContainer.innerHTML = categories.map(createCategoryItemHTML).join('');
}

// --- HÀM XỬ LÝ CHÍNH ---
function handleProductCategory() {
    const categoryArea = document.getElementById('product-category');
    if (!categoryArea) return;

    // Biến cho Form
    const modal = document.getElementById('category-modal');
    const form = document.getElementById('category-form');
    const formTitle = document.getElementById('category-form-title');
    const submitBtn = document.getElementById('category-submit-btn');
    const errorMessage = document.getElementById('category-error-message');
    
    // Các nút điều khiển
    const addBtn = categoryArea.querySelector('.heading-wrap .add-btn');
    const closeBtn = modal.querySelector('.close-modal-btn');
    
    // Các trường input
    const idInput = document.getElementById('category-id');
    const nameInput = document.getElementById('category-name');
    const descInput = document.getElementById('category-description');

    // 1. RENDER DANH SÁCH KHI TẢI
    renderCategoryList();

    // 2. Mở form 'THÊM MỚI'
    addBtn.addEventListener('click', () => {
        form.reset();
        idInput.readOnly = false;
        formTitle.textContent = 'Thêm Loại Sản Phẩm';
        submitBtn.textContent = 'Thêm';
        errorMessage.textContent = '';
        form.removeAttribute('data-editing-id');
        modal.style.display = 'flex';
    });

    // 3. Đóng form
    function closeModal() {
        modal.style.display = 'none';
    }
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // 4. XỬ LÝ SUBMIT (Thêm hoặc Sửa)
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const editingId = form.getAttribute('data-editing-id');
        const categoryData = {
            id: parseInt(idInput.value),
            name: nameInput.value.trim(),
            description: descInput.value.trim()
        };

        if (!categoryData.id || !categoryData.name) {
            errorMessage.textContent = 'ID và Tên Loại không được để trống.';
            return;
        }

        let result;
        if (editingId) {
            // Chế độ Sửa
            result = updateCategory(editingId, categoryData);
        } else {
            // Chế độ Thêm
            result = addNewCategory(categoryData);
        }

        if (result.success) {
            renderCategoryList();
            closeModal();
            window.dispatchEvent(new Event('categoriesUpdated'));
        } else {
            errorMessage.textContent = result.message; // Hiển thị lỗi (ví dụ: Trùng ID)
        }
    });

    // 5. XỬ LÝ SỰ KIỆN CLICK TRÊN DANH SÁCH (Sửa / Xóa)
    categoryArea.querySelector('.list-items').addEventListener('click', (e) => {
        const target = e.target;
        
        if (target.classList.contains('adjust-btn')) {
            // --- SỬA ---
            const categoryId = target.getAttribute('data-category-id');
            const category = getCategoryById(categoryId);
            
            if (category) {
                form.reset();
                idInput.value = category.id;
                idInput.readOnly = true; // Không cho sửa ID
                nameInput.value = category.name;
                descInput.value = category.description;
                
                formTitle.textContent = 'Cập Nhật Loại Sản Phẩm';
                submitBtn.textContent = 'Cập nhật';
                errorMessage.textContent = '';
                form.setAttribute('data-editing-id', category.id);
                
                modal.style.display = 'flex';
            }
            
        } else if (target.classList.contains('delete-btn')) {
            // --- XÓA ---
            const categoryId = target.getAttribute('data-category-id');
            if (confirm(`Bạn có chắc chắn muốn XÓA loại sản phẩm ID: ${categoryId}?`)) {
                
                // (Nâng cao) Kiểm tra xem có sản phẩm nào đang dùng loại này không
                const products = getAllProducts();
                const category = getCategoryById(categoryId);
                if (products.some(p => p.category === category.name)) {
                    alert('Không thể xóa! Vẫn còn sản phẩm thuộc loại này.');
                    return;
                }

                // Nếu không, tiến hành xóa
                deleteCategory(categoryId);
                renderCategoryList();
                window.dispatchEvent(new Event('categoriesUpdated'));
            }
        }
    });

    console.log('Product Category Management Loaded');
}

document.addEventListener('DOMContentLoaded', handleProductCategory);