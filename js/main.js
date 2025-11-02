document.addEventListener('DOMContentLoaded', () => {
    // ======================================================
    // 1. LOGIC ĐĂNG NHẬP (GIỮ NGUYÊN CỦA BẠN)
    // ======================================================
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    const accountLink = document.getElementById('account-link');

    if (loggedInUser && accountLink) {
        // ... (Mã logic đăng nhập của bạn y như cũ) ...
        const userAccountDiv = document.createElement('div');
        userAccountDiv.className = 'action-item user-account';
        userAccountDiv.innerHTML = `
            <i class="far fa-user-circle"></i>
            <span class="welcome-text">${loggedInUser.username}</span>
            <div class="user-dropdown-menu">
                <div class="dropdown-header">
                     <div class="user-avatar-dropdown"><i class="fas fa-crown"></i></div>
                     <div class="user-info-dropdown">
                        <span class="dropdown-username">${loggedInUser.username}</span>
                        <span class="user-level">Thành viên</span>
                    </div>
                </div>
                <a href="#" class="dropdown-item"><i class="fas fa-box"></i><span>Đơn hàng của tôi</span></a>
                <a href="#" id="logout-btn" class="dropdown-item logout-item">
                    <i class="fas fa-sign-out-alt"></i><span>Thoát tài khoản</span>
                </a>
            </div>
        `;
        accountLink.parentNode.replaceChild(userAccountDiv, accountLink);

        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                sessionStorage.removeItem('loggedInUser');
                alert('Bạn đã đăng xuất.');
                window.location.reload();
            });
        }
    }

    // ======================================================
    // 2. LOGIC GIỎ HÀNG VÀ MODAL (ĐÃ THAY THẾ HOÀN TOÀN)
    // ======================================================

    // --- BIẾN TOÀN CỤC ---
    let cart = []; // Mảng chứa các sản phẩm trong giỏ
    // Lấy các phần tử DOM chính
    const cartOverlay = document.getElementById('cart-overlay');
    const sideCartContainer = document.getElementById('side-cart-container');
    const sideCartBody = document.getElementById('side-cart-body');
    const cartCountBadge = document.querySelector('.cart-count');
    const cartTotalPriceEl = document.getElementById('cart-total-price');
    const toastMessage = document.getElementById('add-to-cart-toast');

    // Nút checkout
    const goToCheckoutBtn = document.getElementById('go-to-checkout-btn');
    const checkoutModal = document.getElementById('checkout-modal');
    const closeCheckoutModalBtn = document.getElementById('close-checkout-modal-btn');
    const checkoutForm = document.getElementById('checkout-form');
    
    // --- TIỆN ÍCH ---
    // Hàm định dạng tiền tệ (ví dụ: 95000 -> "95.000 đ")
    const formatPrice = (price) => {
        if (typeof price !== 'number') {
            price = Number(price) || 0;
        }
        return price.toLocaleString('vi-VN') + ' đ';
    };

    // Hàm hiển thị thông báo "Đã thêm vào giỏ"
    const showToast = () => {
        // Kiểm tra xem toastMessage có tồn tại không
        if (!toastMessage) {
            console.warn('Không tìm thấy #add-to-cart-toast');
            return;
        }
        toastMessage.classList.add('active');
        setTimeout(() => {
            toastMessage.classList.remove('active');
        }, 2000); // Ẩn sau 2 giây
    };


    // --- LOGIC GIỎ HÀNG ---

    /**
     * Tải giỏ hàng từ LocalStorage khi trang vừa tải
     */
    function loadCartFromStorage() {
        const storedCart = localStorage.getItem('sguShopCart');
        if (storedCart) {
            cart = JSON.parse(storedCart);
            updateCartUI();
        }
    }

    /**
     * Lưu giỏ hàng vào LocalStorage
     */
    function saveCartToStorage() {
        localStorage.setItem('sguShopCart', JSON.stringify(cart));
    }

    /**
     * Cập nhật toàn bộ giao diện giỏ hàng (panel, tổng tiền, số lượng badge)
     */
    function updateCartUI() {
        // Kiểm tra các phần tử DOM trước khi sử dụng
        if (!sideCartBody || !cartTotalPriceEl || !cartCountBadge || !goToCheckoutBtn) {
            console.warn('Một vài phần tử DOM của giỏ hàng không tìm thấy.');
            return;
        }

        // 1. Nếu giỏ hàng rỗng, hiển thị thông báo
        if (cart.length === 0) {
            sideCartBody.innerHTML = '<p class="cart-empty-message">Giỏ hàng của bạn đang trống.</p>';
        } else {
            // 2. Nếu có, vẽ lại các sản phẩm
            sideCartBody.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-info">
                        <div>
                            <h4>${item.name}</h4>
                            <span class="cart-item-price">${formatPrice(item.price)}</span>
                            <span class="cart-item-quantity">Số lượng: ${item.quantity}</span>
                        </div>
                        <button class="cart-item-remove" data-id="${item.id}">&times;</button>
                    </div>
                </div>
            `).join('');
        }

        // 3. Cập nhật tổng tiền
        const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        cartTotalPriceEl.textContent = formatPrice(totalPrice);

        // 4. Cập nhật số lượng trên badge
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCountBadge.textContent = totalItems;

        // 5. Bật/tắt nút thanh toán
        goToCheckoutBtn.classList.toggle('disabled', cart.length === 0);
    }

    /**
     * Thêm sản phẩm vào giỏ hàng
     * (Hàm này được gọi bởi Event Listener)
     */
    function addToCart(productData, quantity = 1) {
        const { id, name, price, image } = productData;
        const numericPrice = parseFloat(price); // Đảm bảo giá là một con số

        // Kiểm tra xem sản phẩm đã có trong giỏ chưa
        const existingItem = cart.find(item => item.id === id);

        if (existingItem) {
            // Nếu có, chỉ tăng số lượng
            existingItem.quantity += quantity;
        } else {
            // Nếu chưa, thêm mới vào giỏ
            cart.push({ id, name, price: numericPrice, image, quantity });
        }

        // Cập nhật UI, lưu vào Storage và hiển thị thông báo
        updateCartUI();
        saveCartToStorage();
        showToast();
    }
    
    /**
     * Xóa sản phẩm khỏi giỏ hàng
     */
    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        updateCartUI();
        saveCartToStorage();
    }


    // --- GÁN SỰ KIỆN (EVENT LISTENERS) ---

    // 1. Mở/Đóng Side Cart
    const openCartTriggers = document.querySelectorAll('.open-cart-trigger');
    const closeCartBtn = document.getElementById('close-cart-btn');

    if (openCartTriggers.length > 0 && cartOverlay && sideCartContainer) {
        openCartTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                cartOverlay.classList.add('is-open');
                sideCartContainer.classList.add('is-open');
            });
        });
    }

    const closeCart = () => {
        if (cartOverlay) cartOverlay.classList.remove('is-open');
        if (sideCartContainer) sideCartContainer.classList.remove('is-open');
    };

    if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
    if (cartOverlay) cartOverlay.addEventListener('click', () => {
         // Chỉ đóng nếu modal checkout cũng đóng
        if (!checkoutModal || !checkoutModal.classList.contains('is-open')) {
            closeCart();
        }
    });


    // 2. Thêm vào giỏ hàng (SỬ DỤNG EVENT DELEGATION)
    // Lắng nghe trên toàn bộ trang
    document.body.addEventListener('click', (e) => {
        // Kiểm tra xem phần tử được click có phải là nút "Thêm vào giỏ" không
        const addToCartBtn = e.target.closest('.add-to-cart-btn, .add-to-cart-main');

        if (addToCartBtn) {
            e.preventDefault(); // Ngăn thẻ <a> điều hướng

            // Lấy thông tin từ data attributes
            const productData = {
                id: addToCartBtn.dataset.id,
                name: addToCartBtn.dataset.name,
                price: addToCartBtn.dataset.price,
                image: addToCartBtn.dataset.image
            };
            
            // Lấy số lượng từ input (nếu có, trên trang chi tiết)
            let quantity = 1;
            const quantityInput = document.getElementById('quantity-input');
            if (quantityInput) {
                quantity = parseInt(quantityInput.value, 10) || 1;
            }

            // Gọi hàm thêm vào giỏ
            addToCart(productData, quantity);
        }
        
        // 3. Xóa khỏi giỏ hàng (cũng dùng event delegation)
        const removeBtn = e.target.closest('.cart-item-remove');
        if (removeBtn) {
            e.preventDefault();
            const productId = removeBtn.dataset.id;
            removeFromCart(productId);
        }
    });

    // 4. Nút Tăng/Giảm số lượng (chỉ chạy trên trang product-detail)
    const quantityInput = document.getElementById('quantity-input');
    const increaseQtyBtn = document.getElementById('increase-qty');
    const decreaseQtyBtn = document.getElementById('decrease-qty');

    if (quantityInput && increaseQtyBtn && decreaseQtyBtn) {
        increaseQtyBtn.addEventListener('click', () => {
            quantityInput.value = parseInt(quantityInput.value, 10) + 1;
        });
        
        decreaseQtyBtn.addEventListener('click', () => {
            const currentValue = parseInt(quantityInput.value, 10);
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
            }
        });
    }
    
    // 5. Xử lý Checkout (Mở/Đóng Modal)
    
    // Nút "Thanh toán" trong Side Cart
    if (goToCheckoutBtn && checkoutModal && cartOverlay && sideCartContainer) {
        goToCheckoutBtn.addEventListener('click', () => {
            // Đóng side cart
            cartOverlay.classList.remove('is-open');
            sideCartContainer.classList.remove('is-open');
            
            // Mở modal checkout
            setTimeout(() => { // Thêm độ trễ nhỏ để hiệu ứng mượt
                checkoutModal.classList.add('is-open');
                cartOverlay.classList.add('is-open'); // Dùng lại overlay
            }, 300);
        });
    }
    
    const closeCheckout = () => {
        if (checkoutModal) checkoutModal.classList.remove('is-open');
        if (cartOverlay) cartOverlay.classList.remove('is-open');
    }

    // Nút "X" trên Modal Checkout
    if (closeCheckoutModalBtn) {
        closeCheckoutModalBtn.addEventListener('click', closeCheckout);
    }
    
    // Đóng modal checkout khi click overlay
    if (cartOverlay) {
        cartOverlay.addEventListener('click', () => {
             // Chỉ đóng nếu side-cart cũng đang đóng
            if (!sideCartContainer || !sideCartContainer.classList.contains('is-open')) {
                closeCheckout();
            }
        });
    }


    // Xử lý khi submit form đặt hàng
    if(checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Đặt hàng thành công! (Đây là thông báo giả lập)');
            
            // Xóa giỏ hàng
            cart = [];
            saveCartToStorage();
            updateCartUI();
            
            // Đóng modal
            closeCheckout();
            checkoutForm.reset();
        });
    }
    

    // --- KHỞI CHẠY ---
    // Tải giỏ hàng từ localStorage ngay khi trang mở
    loadCartFromStorage();
});
