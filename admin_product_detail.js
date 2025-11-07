/**
 * admin_product_detail.js
 * Xử lý CRUD đầy đủ cho Form sản phẩm chi tiết (20 thuộc tính)
 */

// Hàm đọc file (giữ nguyên từ trước)
function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
}

// --- HÀM TẠO HTML (CẬP NHẬT) ---
// Danh sách (list view) chỉ hiển thị các thông tin cơ bản
// ID, Category, Title, Author (thay cho Description)
function createProductItemHTML(product) {
    return `
        <div class="item" id="product-${product.id}">
            <p>${product.id}</p>
            <p>${product.category}</p>
            <p>${product.title}</p>
            <p>${product.author || 'N/A'}</p> <div class="btn-list">
                <button class="btn img-btn green" data-image-url="${product.mainImage}">Hiện ảnh</button>
                <button class="btn adjust-btn blue" data-product-id="${product.id}">Sửa</button>
                <button class="btn delete-btn red" data-product-id="${product.id}">Xóa</button>
            </div>
        </div>
    `;
}

// --- HÀM RENDER (Giữ nguyên) ---
function renderProductList() {
    const products = getAllProducts();
    const listContainer = document.querySelector('#product-detail .list-items');
    if (!listContainer) return;
    listContainer.innerHTML = products.map(createProductItemHTML).join('');
}

// --- HÀM XỬ LÝ CHÍNH (VIẾT LẠI HOÀN TOÀN) ---
function handleProductDetail() {
    const detailArea = document.getElementById('product-detail');
    if (!detailArea) return;

    // Biến cho Modal
    const formWrap = document.getElementById('product-detail-modal');
    const productForm = document.getElementById('product-detail-form');
    const addProductBtn = detailArea.querySelector('.heading-wrap .add-btn');
    const closeFormBtn = formWrap.querySelector('.close-btn');
    const formTitle = document.getElementById('product-form-title');
    const submitBtn = document.getElementById('product-submit-btn');
    const errorMessage = document.getElementById('product-error-message');
    
    // Biến Modal Ảnh
    const imageModal = document.getElementById('image-modal-overlay');
    const displayImg = document.getElementById('product-display-image');
    
    // Tất cả các trường input trong form
    const inputs = {
        id: document.getElementById('id-product'),
        title: document.getElementById('title-product'),
        category: document.getElementById('category'),
        author: document.getElementById('author'),
        currentPrice: document.getElementById('current-price'),
        oldPrice: document.getElementById('old-price'),
        discount: document.getElementById('discount'),
        supplier: document.getElementById('supplier'),
        publisher: document.getElementById('publisher'),
        binding: document.getElementById('binding'),
        sku: document.getElementById('sku'),
        year: document.getElementById('year'),
        pages: document.getElementById('pages'),
        picture: document.getElementById('picture-product'),
        description: document.getElementById('des-product')
    };

    // 1. RENDER DANH SÁCH KHI TẢI
    renderProductList();

    // 2. Mở form cho 'THÊM MỚI'
    addProductBtn.addEventListener('click', () => {
        productForm.reset();
        inputs.id.readOnly = false;
        formTitle.textContent = 'Thêm Sản Phẩm Mới';
        submitBtn.textContent = 'Thêm sản phẩm';
        errorMessage.textContent = '';
        productForm.removeAttribute('data-editing-id');
        formWrap.style.display = 'flex';
    });
    
    // 3. Đóng form
    function closeModal() {
        formWrap.style.display = 'none';
    }
    closeFormBtn.addEventListener('click', closeModal);
    formWrap.addEventListener('click', (e) => {
        if (e.target === formWrap) closeModal();
    });

    // 4. Xử lý SUBMIT FORM (Thêm hoặc Sửa)
    productForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        errorMessage.textContent = '';
        
        const editingId = productForm.getAttribute('data-editing-id');
        const file = inputs.picture.files[0];
        
        // Tạo object productData từ form
        let productData = {
            id: inputs.id.value,
            title: inputs.title.value,
            category: inputs.category.value,
            author: inputs.author.value,
            currentPrice: parseFloat(inputs.currentPrice.value),
            oldPrice: parseFloat(inputs.oldPrice.value),
            discount: parseFloat(inputs.discount.value),
            supplier: inputs.supplier.value,
            publisher: inputs.publisher.value,
            binding: inputs.binding.value,
            sku: inputs.sku.value,
            year: parseInt(inputs.year.value),
            pages: parseInt(inputs.pages.value),
            description: inputs.description.value,
            mainImage: null, // Sẽ xử lý ngay sau đây
            // Các trường còn thiếu (reviewCount, soldCount, thumbnails, releaseDate)
            // sẽ được gán giá trị mặc định nếu cần
            reviewCount: 0,
            soldCount: 0,
            thumbnails: [],
            releaseDate: new Date().toLocaleDateString('vi-VN')
        };
        
        if (!productData.id || !productData.title || !productData.category) {
            errorMessage.textContent = 'ID, Tên Sản Phẩm và Loại là bắt buộc.';
            return;
        }

        let result;
        if (editingId) {
            // --- Chế độ SỬA ---
            const oldProduct = getProductById(editingId);
            // Ghi đè ID để đảm bảo không bị thay đổi
            productData.id = editingId; 
            // Xử lý ảnh
            if (file) {
                // Nếu có ảnh mới
                productData.mainImage = await readFileAsDataURL(file);
            } else {
                // Giữ ảnh cũ
                productData.mainImage = oldProduct.mainImage;
            }
            // Giữ lại thumbnails cũ (nếu có)
            productData.thumbnails = oldProduct.thumbnails || [];
            
            result = updateProduct(editingId, productData);

        } else {
            // --- Chế độ THÊM ---
            if (file) {
                productData.mainImage = await readFileAsDataURL(file);
            } else {
                productData.mainImage = '../img/product/placeholder.jpg'; // Ảnh mặc định
            }
            // Ảnh thumbnail đầu tiên là ảnh chính
            if (productData.mainImage) {
                productData.thumbnails.push(productData.mainImage);
            }
            
            result = addNewProduct(productData);
        }
        
        if (result.success) {
            renderProductList();
            closeModal();
            window.dispatchEvent(new Event('productsUpdated'));
        } else {
            errorMessage.textContent = result.message; // Hiển thị lỗi (ví dụ: Trùng ID)
        }
    });

    // 5. Xử lý các nút trên danh sách (SỬA, XÓA, HIỆN ẢNH)
    detailArea.querySelector('.list-items').addEventListener('click', (e) => {
        const target = e.target;
        
        if (target.classList.contains('img-btn')) {
            // --- HIỆN ẢNH ---
            const imageUrl = target.getAttribute('data-image-url');
            if (imageUrl) {
                displayImg.src = imageUrl; 
                imageModal.style.display = 'flex';
            } else {
                alert('Không tìm thấy ảnh.');
            }

        } else if (target.classList.contains('adjust-btn')) {
            // --- Mở form SỬA ---
            const productId = target.getAttribute('data-product-id');
            const product = getProductById(productId);
            
            if (product) {
                // Điền dữ liệu cũ vào form
                inputs.id.value = product.id;
                inputs.id.readOnly = true; // Không cho sửa ID
                inputs.title.value = product.title;
                inputs.category.value = product.category;
                inputs.author.value = product.author;
                inputs.currentPrice.value = product.currentPrice;
                inputs.oldPrice.value = product.oldPrice;
                inputs.discount.value = product.discount;
                inputs.supplier.value = product.supplier;
                inputs.publisher.value = product.publisher;
                inputs.binding.value = product.binding;
                inputs.sku.value = product.sku;
                inputs.year.value = product.year;
                inputs.pages.value = product.pages;
                inputs.description.value = product.description;
                
                // Đặt trạng thái edit
                formTitle.textContent = 'Cập Nhật Sản Phẩm';
                submitBtn.textContent = 'Cập nhật';
                productForm.setAttribute('data-editing-id', product.id);
                errorMessage.textContent = '';

                formWrap.style.display = 'flex';
            }
            
        } else if (target.classList.contains('delete-btn')) {
            // --- XÓA SẢN PHẨM ---
            const productId = target.getAttribute('data-product-id');
            if (confirm(`Bạn có chắc chắn muốn XÓA sản phẩm ID: ${productId}?`)) {
                deleteProduct(productId);
                renderProductList();
                window.dispatchEvent(new Event('productsUpdated'));
            }
        }
    });

    // 6. Đóng modal ảnh
    
    const imageModalCloseBtn = document.getElementById('image-modal-close-btn');

    if (imageModal) {
        imageModal.addEventListener('click', (e) => {
            if (e.target === imageModal || e.target === imageModalCloseBtn) { // Thêm điều kiện click vào nút đóng
                imageModal.style.display = 'none';
            }
        });
    }
    // Nếu bạn muốn nút X hoạt động riêng, bạn có thể thêm listener riêng:
    if (imageModalCloseBtn) {
        imageModalCloseBtn.addEventListener('click', () => {
            imageModal.style.display = 'none';
        });
    }

    console.log('Product Detail Management (Full Form) Loaded');
}

document.addEventListener('DOMContentLoaded', handleProductDetail);