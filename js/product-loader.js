// Chờ cho toàn bộ nội dung HTML được tải xong
document.addEventListener("DOMContentLoaded", () => {

    // Kiểm tra xem biến 'productDatabase' từ file 'database.js' đã tồn tại chưa
    if (typeof productDatabase === 'undefined') {
        console.error("Lỗi: database.js chưa được tải hoặc biến 'productDatabase' không tồn tại.");
        return;
    }

    // --- TIỆN ÍCH ---
    const formatPrice = (price) => {
        if (typeof price !== 'number') {
            price = Number(price) || 0;
        }
        return price.toLocaleString('vi-VN') + ' đ';
    };

    /**
     * CHỨC NĂNG 1: TẢI TRANG CHI TIẾT SẢN PHẨM (product-detail.html)
     */
    const productDetailLayout = document.querySelector(".product-detail-layout");
    if (productDetailLayout) {
        loadProductDetail();
    }

    // --- ĐỊNH NGHĨA HÀM ---

    /**
     * Hàm chạy trên 'product-detail.html'
     * (Hàm này đã đúng từ lần trước, dùng để hiển thị thumbnail)
     */
    function loadProductDetail() {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');

        if (!productId) {
            productDetailLayout.innerHTML = "<h1>Không tìm thấy sản phẩm</h1>";
            return;
        }

        const product = productDatabase[productId];

        if (!product) {
            productDetailLayout.innerHTML = "<h1>Sản phẩm không tồn tại</h1>";
            return;
        }
        
        document.title = `${product.title} - Hiệu Sách SGU`;

        const mainImage = document.getElementById("main-product-image");
        if (mainImage) {
            mainImage.src = product.mainImage;
            mainImage.alt = product.title;
        }
        
        const thumbnailContainer = document.querySelector(".thumbnail-container"); 
        
        if (thumbnailContainer) {
            thumbnailContainer.innerHTML = ""; 
            
            product.thumbnails.forEach((thumbSrc, index) => {
                const thumbImg = document.createElement('img');
                thumbImg.src = thumbSrc;
                thumbImg.alt = `Thumbnail ${index + 1}`;
                thumbImg.className = "thumbnail"; 
                
                if (index === 0) {
                    thumbImg.classList.add('active');
                }

                thumbImg.addEventListener('click', () => {
                    if (mainImage) mainImage.src = thumbSrc;
                    thumbnailContainer.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
                    thumbImg.classList.add('active');
                });
                
                thumbnailContainer.appendChild(thumbImg);
            });
        }

        // Cột Phải (Thông tin)
        const updateTextByQuery = (selector, text) => {
            const el = document.querySelector(selector);
            if (el) el.textContent = text;
        };
        
        const updateHtmlByQuery = (selector, html) => {
            const el = document.querySelector(selector);
            if (el) el.innerHTML = html;
        };

        // Cập nhật thông tin sản phẩm
        updateTextByQuery("#pd-title", product.title);
        updateTextByQuery("#pd-supplier", product.supplier);    
        updateTextByQuery("#pd-category", product.category);    
        updateTextByQuery("#pd-author", product.author);         
        updateTextByQuery("#pd-publisher", product.publisher);   
        updateTextByQuery("#pd-binding", product.binding);       
        updateTextByQuery("#pd-review-count", `(${product.reviewCount} đánh giá)`);
        updateTextByQuery("#pd-sold-count", `Đã bán ${product.soldCount}`);
        updateTextByQuery("#pd-current-price", formatPrice(product.currentPrice));
        updateTextByQuery("#pd-old-price", formatPrice(product.oldPrice));
        updateTextByQuery("#pd-discount", `-${Math.round(product.discount)}%`);

        // Cập nhật dữ liệu cho nút "Thêm vào giỏ"
        const addToCartBtn = document.querySelector(".add-to-cart-main");
        if (addToCartBtn) {
            addToCartBtn.dataset.id = product.id;
            addToCartBtn.dataset.name = product.title;
            addToCartBtn.dataset.price = product.currentPrice;
            addToCartBtn.dataset.image = product.mainImage;
        }

        // Cập nhật bảng thông số kỹ thuật và mô tả
        updateTextByQuery(".spec-table .spec-row:nth-child(1) .spec-value", product.sku);
        updateTextByQuery(".spec-table .spec-row:nth-child(2) .spec-value", product.releaseDate);
        updateTextByQuery(".spec-table .spec-row:nth-child(3) .spec-value", product.supplier);
        updateTextByQuery(".spec-table .spec-row:nth-child(4) .spec-value", product.author);
        updateTextByQuery(".spec-table .spec-row:nth-child(5) .spec-value", product.publisher);
        updateTextByQuery(".spec-table .spec-row:nth-child(6) .spec-value", product.year);
        updateTextByQuery(".spec-table .spec-row:nth-child(7) .spec-value", product.pages);
        updateTextByQuery(".spec-table .spec-row:nth-child(8) .spec-value", product.binding);
        updateHtmlByQuery(".product-description", `<h2>Mô tả sản phẩm</h2>${product.description}`);
    }
}); 