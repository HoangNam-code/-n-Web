// Begin render

const numberOfProductDatabase = Object.keys(productDatabase).length;
const productDetailArea = document.getElementById('product-detail')
const ListItem = productDetailArea.querySelector('.list-items')
const FormProductDetail = productDetailArea.querySelector('#product-detail-form')
const wrapForm = productDetailArea.querySelector('#form-product-detail-wrap')

function DataTransfer(data) {
    var result = ''
    result += `<p>${data.id}</p>`
    result += `<p>${data.category}</p>`
    result += `<p>${data.title}</p>`
    result += `<p>${data.binding}</p>`
    return `<div class="item" id="${data.id}">${result}<div class="btn-list">
                                        <button class="btn img-btn green">Hiện ảnh</button>
                                        <button class="btn adjust-btn blue" data-target="${data.id}">Sửa</button>
                                        <button class="btn delete-btn red" data-target="${data.id}">Xóa</button>
                                    </div></div>`
}

function DataSetInItem(datalist) {
    ListItem.innerHTML = datalist.join("")
}

function renderProductDetail () {
    ListItem.innerHTML = '';

    var DataList = []

    var productValues = Object.values(productDatabase);
    productValues.sort((a, b) => {
        return parseInt(a.id) - parseInt(b.id);
    })
    
    DataList = productValues.map((product) => {
        return DataTransfer(product);
    })
    
    DataSetInItem(DataList);

    attachDeleteEventListeners();
    attachImageEventListeners();
    attachAdjustListeners();
}

// End render


// Begin Thêm Sản Phẩm
// Lấy các phần tử
const addProductBtn = document.querySelector('#product-detail .add-btn');
const closeFormBtn = document.querySelector('#product-detail .close-btn');
const backgroundOverlay = document.querySelector('#product-detail .background');
const productDetailForm = document.getElementById('product-detail-form');

// 1. Mở Form khi nhấn nút "Thêm Sản phẩm"
if (addProductBtn) {
    addProductBtn.addEventListener('click', () => {
        backgroundOverlay.classList.add('open');
    });
}

// 2. Đóng Form khi nhấn nút "Đóng"
if (closeFormBtn) {
    closeFormBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Ngăn form submit mặc định
        backgroundOverlay.classList.remove('open');
    });
}

// (Tùy chọn) Đóng Form khi click ra ngoài form
if (backgroundOverlay) {
    backgroundOverlay.addEventListener('click', (e) => {
        // Chỉ đóng nếu click chính xác vào lớp nền (không phải form bên trong)
        if (e.target === backgroundOverlay) {
            backgroundOverlay.classList.remove('open');
        }
    });
}



// Hàm tạo ID mới (giả định)
// Trong môi trường thực tế, ID nên được tạo bởi backend hoặc cơ chế database
function generateNewProductId(db) {
    const keys = Object.keys(db).map(k => parseInt(k, 10)).filter(k => !isNaN(k));
    const maxId = keys.length > 0 ? Math.max(...keys) : 0;
    // Format ID mới thành chuỗi 2 chữ số (ví dụ: 01, 02, 10, 11, ...)
    const newId = (maxId + 1).toString().padStart(2, '0');
    return newId;
}

// Hàm xử lý submit form
productDetailForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Ngăn form submit và reload trang


    // KHAI BÁO BIẾN KIỂM TRA CHẾ ĐỘ
    const submitButton = productDetailForm.querySelector('button[type="submit"]'); 
    const isUpdateMode = submitButton.classList.contains('update-mode');
    const editingId = productDetailForm.getAttribute('data-editing-id');
    
    // 1. Lấy giá trị từ Form
    const idValue = document.getElementById('id-product').value || generateNewProductId(productDatabase); // Dùng ID nhập vào hoặc tự tạo
    const categoryValue = document.getElementById('category').value;
    const titleValue = document.getElementById('title-product').value;
    const descriptionValue = document.getElementById('des-product').value;
    const imageFile = document.getElementById('picture-product').files[0];

// Lấy bản sao dữ liệu sản phẩm cũ để cập nhật (đảm bảo giữ lại các trường không chỉnh sửa)
    const baseProduct = isUpdateMode ? productDatabase[editingId] : {};
    let mainImagePath = imageFile ? `../img/${imageFile.name}` : (baseProduct.mainImage || "");

    const productToSave = Object.assign({}, baseProduct, {
        id: idValue,
        title: titleValue,
        category: categoryValue,
        description: `<h1>Mô tả sản phẩm</h1><h2>${titleValue}</h2><p>${descriptionValue}</p>`, 
        mainImage: mainImagePath, 
        // Các trường khác được giữ lại từ baseProduct nếu là Update
    });
    
    // 2. Tạo đối tượng sản phẩm theo format yêu cầu
    const newProduct = {
        id: idValue,
        title: titleValue,
        
        // Các trường từ form
        category: categoryValue,
        description: `<h1>Mô tả sản phẩm</h1><h2>${titleValue}</h2><p>${descriptionValue}</p>`, // Gói mô tả vào HTML
        
        // Các trường mặc định (vì không có trong form hiện tại)
        supplier: "Chưa xác định",
        author: "Đang cập nhật",
        publisher: "Đang cập nhật", 
        binding: "Bìa Mềm", // Giá trị mặc định
        reviewCount: 0,
        soldCount: 0, 
        currentPrice: 0, 
        oldPrice: 0, 
        discount: 0, 
        mainImage: mainImagePath, // Đường dẫn hình ảnh giả định
        thumbnails: [],
        sku: "Đang cập nhật",
        releaseDate: new Date().toLocaleDateString('vi-VN'),
        year: new Date().getFullYear(),
        pages: 0,
    };
    
    // 3. Ghi dữ liệu vào database (trong trường hợp này là object JS)
    // Lưu ý: Trong môi trường thực tế (server), bạn sẽ dùng fetch/axios để gửi dữ liệu này lên API.

    if (isUpdateMode) {
        productDatabase[editingId] = productToSave;
        alert(`Đã cập nhật sản phẩm: ${newProduct.title} (ID: ${newProduct.id})`);
    }
    else {
        if (productDatabase[idValue]) {
        alert(`Lỗi: ID sản phẩm ${idValue} đã tồn tại!`);
        return;
        }
        productDatabase[editingId] = newProduct;
        alert(`Đã thêm sản phẩm: ${newProduct.title} (ID: ${newProduct.id})`);
    }


    // console.log("Trước khi ghi:", Object.keys(productDatabase).length);
    // console.log("Sau khi ghi:", Object.keys(productDatabase).length);
    
    // 4. Thông báo và đóng form

    renderProductDetail();
    
    // Reset form và đóng modal
    productDetailForm.reset();
    backgroundOverlay.classList.remove('open');
    
    // console.log("Database hiện tại:", productDatabase);
});
// Xử lý nút Đóng (để ngăn form submit nếu nút Đóng là type="submit" hoặc nằm trong form)
// if (closeFormBtn) {
//     closeFormBtn.addEventListener('click', function(e) {
//         e.preventDefault();
//         backgroundOverlay.classList.remove('open');
//     });
// }

// End Thêm Sản Phẩm





// Begin Xóa Sản Phẩm
function handleDeleteProduct(productId) {
    // 1. Kiểm tra ID và xác nhận xóa
    if (!productDatabase[productId]) {
        alert(`Lỗi: Không tìm thấy sản phẩm với ID: ${productId}`);
        return;
    }
    
    const confirmation = confirm(`Bạn có chắc chắn muốn xóa sản phẩm ID ${productId} không?`);
    
    if (confirmation) {
        // 2. Xóa dữ liệu khỏi database
        delete productDatabase[productId];
        
        // 3. Thông báo và RENDER LẠI GIAO DIỆN
        alert(`Sản phẩm ID ${productId} đã được xóa.`);
        
        // GỌI HÀM RENDER LẠI LIST SẢN PHẨM Ở ĐÂY
        // Thay thế 'renderProductDetails()' bằng tên hàm render thực tế của bạn
        renderProductDetail(); 
    }
}

function attachDeleteEventListeners() {
    // Lấy tất cả các nút Xóa trong khu vực product-detail
    const deleteButtons = document.querySelectorAll('#product-detail .delete-btn');
    
    deleteButtons.forEach(button => {
        // Đảm bảo không gắn sự kiện nhiều lần nếu bạn gọi hàm này trong render
        button.removeEventListener('click', handleButtonClick);
        button.addEventListener('click', handleButtonClick);
    });
}

function handleButtonClick(e) {
    const productIdToDelete = e.currentTarget.getAttribute('data-target');
    if (productIdToDelete) {
        handleDeleteProduct(productIdToDelete);
    }
}
// End Xóa Sản Phẩm




// Begin Hiện Ảnh
// Thêm các biến DOM cho modal ảnh
const imageModalOverlay = document.getElementById('image-modal-overlay');
const productDisplayImage = document.getElementById('product-display-image');
const closeImageBtn = document.getElementById('close-image-btn');

function handleShowImage(productId) {
    const product = productDatabase[productId];

    if (!product || !product.mainImage) {
        alert("Không tìm thấy sản phẩm hoặc ảnh chính.");
        return;
    }

    
    productDisplayImage.onload = function() {
        productDisplayImage.classList.remove('big-picture', 'small-picture');
        if (productDisplayImage.naturalWidth > 1200) {
            // console.log(productDisplayImage.naturalWidth);
            productDisplayImage.classList.remove('big-picture')
            productDisplayImage.classList.add('small-picture')
            // console.log('HI');
        }
        else {
            productDisplayImage.classList.add('big-picture')
            productDisplayImage.classList.remove('small-picture')
        }
        imageModalOverlay.classList.add('open');
    }
    // 1. Chèn đường dẫn ảnh vào thẻ <img>
    productDisplayImage.src = product.mainImage;
    productDisplayImage.alt = `Ảnh sản phẩm: ${product.title}`;
    // 2. Hiển thị modal ảnh
    // productDisplayImage.classList.add('small-picture')

    if(productDisplayImage.complete) {
        productDisplayImage.onload();
    }

}

function attachImageEventListeners() {
    // Lấy tất cả các nút Hiện ảnh trong khu vực product-detail
    const imageButtons = document.querySelectorAll('#product-detail .img-btn');
    
    imageButtons.forEach(button => {
        // Lấy ID sản phẩm từ phần tử cha (hoặc có thể dùng data-target nếu bạn sửa lại DataTransfer)
        // Hiện tại, ta sẽ lấy ID từ thẻ cha .item
        const itemId = button.closest('.item').id; 

        // Đảm bảo không gắn sự kiện nhiều lần
        button.removeEventListener('click', () => handleShowImage(itemId));
        button.addEventListener('click', () => handleShowImage(itemId));
    });
}

// Logic Đóng modal ảnh
if (closeImageBtn) {
    closeImageBtn.addEventListener('click', () => {
        imageModalOverlay.classList.remove('open');
    });
}

if (imageModalOverlay) {
    imageModalOverlay.addEventListener('click', (e) => {
        if (e.target === imageModalOverlay) {
            imageModalOverlay.classList.remove('open');
        }
    });
}


// End Hiện Ảnh

// ==========================================================
// A. HÀM PHỤ TRỢ: ĐẶT LẠI FORM VỀ CHẾ ĐỘ THÊM MỚI (Cần thiết trước khi chỉnh sửa)
// ==========================================================
function resetFormToCreateMode() {
    // Lấy các phần tử cần thiết
    const submitButton = productDetailForm.querySelector('button[type="submit"]'); 
    const formTitle = document.querySelector('#form-product-detail-wrap h3');
    
    productDetailForm.reset();
    
    // Đặt lại tiêu đề và nút về chế độ Thêm mới
    if (formTitle) formTitle.textContent = 'Danh mục Sản phẩm';
    submitButton.textContent = 'Thêm sản phẩm';
    submitButton.classList.remove('update-mode');
    
    // Xóa cờ trạng thái chỉnh sửa
    productDetailForm.removeAttribute('data-editing-id');
    
    // Mở khóa trường ID
    document.getElementById('id-product').readOnly = false; 
}


// ==========================================================
// B. HÀM CHÍNH: XỬ LÝ KHI NHẤN NÚT CHỈNH SỬA (.adjust-btn)
// ==========================================================
/**
 * Tải dữ liệu sản phẩm hiện tại vào form và thiết lập chế độ Cập nhật.
 * @param {string} productId - ID của sản phẩm cần chỉnh sửa.
 */
function handleEditProduct(productId) {
    const product = productDatabase[productId];

    if (!product) {
        alert(`Lỗi: Không tìm thấy sản phẩm với ID: ${productId}`);
        return;
    }

    // Đảm bảo form sạch sẽ và sẵn sàng cho chế độ Cập nhật
    resetFormToCreateMode(); 

    // Lấy các phần tử DOM cần thiết
    const submitButton = productDetailForm.querySelector('button[type="submit"]');
    const formTitle = document.querySelector('#form-product-detail-wrap h3');
    
    // 1. Thiết lập form cho chế độ Cập nhật
    if (formTitle) formTitle.textContent = 'Chỉnh sửa Sản phẩm';
    submitButton.textContent = 'Cập nhật Sản phẩm';
    submitButton.classList.add('update-mode');
    
    // Lưu ID sản phẩm đang chỉnh sửa
    productDetailForm.setAttribute('data-editing-id', productId);
    
    // 2. Điền dữ liệu hiện tại vào form
    
    // Khóa trường ID và điền giá trị
    document.getElementById('id-product').value = product.id;
    document.getElementById('id-product').readOnly = true; 
    
    // Điền các trường khác
    document.getElementById('category').value = product.category;
    document.getElementById('title-product').value = product.title;

    // Tách phần mô tả đơn giản khỏi chuỗi HTML phức tạp (Giả định lấy nội dung <p> cuối cùng)
    const simpleDescriptionMatch = product.description.match(/<p>(.*?)<\/p>/g);
    const simpleDescription = simpleDescriptionMatch 
        ? simpleDescriptionMatch[simpleDescriptionMatch.length - 1].replace(/<\/?p>/g, '').trim() 
        : '';
    document.getElementById('des-product').value = simpleDescription;
    
    // 3. Hiển thị form
    backgroundOverlay.classList.add('open');
}


// (Đặt lại tên để tránh nhầm lẫn)
function attachAdjustListeners() { 
    const adjustButtons = document.querySelectorAll('#product-detail .adjust-btn');

    adjustButtons.forEach(button => {
        // Gỡ bỏ listeners cũ (tuyệt đối cần thiết khi render lại)
        button.onclick = null; 
        
    const productId = button.getAttribute('data-target');

    button.addEventListener('click', () => {
            // Đảm bảo reset form về trạng thái "Thêm mới" trước khi điền dữ liệu
            resetFormToCreateMode(); 
            handleEditProduct(productId);
        });
    });
}






renderProductDetail();
attachDeleteEventListeners();
attachImageEventListeners();
attachAdjustListeners();


