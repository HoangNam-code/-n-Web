// ShopUser.js - nâng cấp: thumbnails, modal, toasts, export/import, password confirm
(() => {
  // ---------- Data (thêm thumbnail) ----------
  const PRODUCTS = [
    {
      id: 1,
      ten: "Đắc Nhân Tâm",
      gia: 120000,
      phanLoai: "Kỹ năng sống",
      thumbnail: "https://picsum.photos/id/1011/400/300",
    },
    {
      id: 2,
      ten: "Nhà Giả Kim",
      gia: 95000,
      phanLoai: "Tiểu thuyết",
      thumbnail: "https://picsum.photos/id/1012/400/300",
    },
    {
      id: 3,
      ten: "Cà phê cùng Tony",
      gia: 80000,
      phanLoai: "Kỹ năng sống",
      thumbnail: "https://picsum.photos/id/1013/400/300",
    },
    {
      id: 4,
      ten: "Tư Duy Nhanh và Chậm",
      gia: 150000,
      phanLoai: "Khoa học",
      thumbnail: "https://picsum.photos/id/1014/400/300",
    },
    {
      id: 5,
      ten: "Truy hồn",
      gia: 211000,
      phanLoai: "Khoa học",
      thumbnail: "https://picsum.photos/id/1005/400/300",
    },
    {
      id: 6,
      ten: "Sách Thánh",
      gia: 261000,
      phanLoai: "Kỹ năng sống",
      thumbnail: "https://picsum.photos/id/1006/400/300",
    },
    {
      id: 7,
      ten: "Harry Potter",
      gia: 350000,
      phanLoai: "Tiểu thuyết",
      thumbnail: "https://picsum.photos/id/1008/400/300",
    },
    {
      id: 8,
      ten: "One Piece",
      gia: 20000,
      phanLoai: "Truyện tranh",
      thumbnail: "https://picsum.photos/id/1001/400/300",
    },
    {
      id: 9,
      ten: "Doraemon",
      gia: 20000,
      phanLoai: "Truyện tranh",
      thumbnail: "https://picsum.photos/id/1002/400/300",
    },
    {
      id: 10,
      ten: "Thám tử lừng danh Conan",
      gia: 20000,
      phanLoai: "Truyện tranh",
      thumbnail: "https://picsum.photos/id/1003/400/300",
    },
    {
      id: 11,
      ten: "Kimetsu no yaiba",
      gia: 20000,
      phanLoai: "Truyện tranh",
      thumbnail: "https://picsum.photos/id/1004/400/300",
    },
    {
      id: 12,
      ten: "Ảo Ảnh Hạnh Phúc",
      gia: 100000,
      phanLoai: "Tiểu thuyết",
      thumbnail: "https://picsum.photos/id/1020/400/300",
    },
    {
      id: 13,
      ten: "Tuổi trẻ đáng giá bao nhiêu",
      gia: 90000,
      phanLoai: "Tâm lý học",
      thumbnail: "https://picsum.photos/id/1021/400/300",
    },
    {
      id: 14,
      ten: "Làm giàu không khó",
      gia: 80000,
      phanLoai: "Kỹ năng sống",
      thumbnail: "https://picsum.photos/id/1022/400/300",
    },
    {
      id: 15,
      ten: "Đại dương đen",
      gia: 100000,
      phanLoai: "Tâm lý học",
      thumbnail: "https://picsum.photos/id/1023/400/300",
    },
    {
      id: 16,
      ten: "Sự im lặng của bầy cừu",
      gia: 90000,
      phanLoai: "Tâm lý học",
      thumbnail: "https://picsum.photos/id/1024/400/300",
    },
    {
      id: 17,
      ten: "Hồ Sơ Pháp Y",
      gia: 90000,
      phanLoai: "Tâm lý học",
      thumbnail: "https://picsum.photos/id/1025/400/300",
    },
    {
      id: 18,
      ten: "Bear Town",
      gia: 150000,
      phanLoai: "Tâm lý học",
      thumbnail: "https://picsum.photos/id/1033/400/300",
    },
    {
      id: 19,
      ten: "Tắt Đèn",
      gia: 200000,
      phanLoai: "Truyện ngắn",
      thumbnail: "https://picsum.photos/id/1035/400/300",
    },
    {
      id: 20,
      ten: "Truyện Kiều",
      gia: 400000,
      phanLoai: "Truyện ngắn",
      thumbnail: "https://picsum.photos/id/1036/400/300",
    },
    {
      id: 21,
      ten: "Tự truyện của một Yogi",
      gia: 300000,
      phanLoai: "Tự truyện",
      thumbnail: "https://picsum.photos/id/1037/400/300",
    },
    {
      id: 22,
      ten: "Tự truyện của Osho",
      gia: 2500000,
      phanLoai: "Tự truyện",
      thumbnail: "https://picsum.photos/id/1038/400/300",
    },
  ];

  // ---------- State ----------
  let currentPage = 1;
  const itemsPerPage = 8;

  // ---------- Storage helpers ----------
  function getUsers() {
    return JSON.parse(localStorage.getItem("users") || "{}");
  }
  function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
  }
  function getCurrentUsername() {
    return localStorage.getItem("currentUser");
  }
  function setCurrentUsername(username) {
    if (username) localStorage.setItem("currentUser", username);
    else localStorage.removeItem("currentUser");
  }
  function getCart() {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  }
  function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // ---------- Toast (non-blocking) ----------
  function showToast(title, msg, ms = 3000) {
    const wrap = document.getElementById("toast-wrap");
    if (!wrap) return;
    const t = document.createElement("div");
    t.className = "toast";
    t.innerHTML = `<div class="title">${escapeHtml(
      title
    )}</div><div class="msg">${escapeHtml(msg)}</div>`;
    wrap.appendChild(t);
    setTimeout(() => {
      t.style.opacity = "0";
      setTimeout(() => t.remove(), 300);
    }, ms);
  }

  // ---------- Page & Auth ----------
  function allPages() {
    return document.querySelectorAll(".page-content");
  }
  const PROTECTED_PAGES = [
    "page-danh-sach-sp",
    "page-quan-ly-ca-nhan",
    "page-gio-hang",
    "page-don-hang",
  ];

  function switchPage(pageId) {
    const isLoggedIn = !!getCurrentUsername();
    if (PROTECTED_PAGES.includes(pageId) && !isLoggedIn) {
      showToast(
        "Yêu cầu đăng nhập",
        "Vui lòng đăng nhập để xem nội dung này.",
        2500
      );
      pageId = "page-dang-nhap";
    }
    allPages().forEach((p) => (p.style.display = "none"));
    const active = document.getElementById(pageId);
    if (active) active.style.display = "block";
    if (pageId === "page-danh-sach-sp") applyFilters(1);
    if (pageId === "page-gio-hang") renderCart();
    if (pageId === "page-don-hang") renderOrders();
  }

  function handleRegister() {
    const username = document.getElementById("reg-username").value.trim();
    const password = document.getElementById("reg-password").value;
    const passConfirm = document.getElementById("reg-password-confirm").value;
    const hoTen = document.getElementById("reg-fullname").value.trim();
    const phone = document.getElementById("reg-phone").value.trim();
    const email = document.getElementById("reg-email").value.trim();
    const dob = document.getElementById("reg-dob").value;

    if (
      !username ||
      !password ||
      !passConfirm ||
      !hoTen ||
      !phone ||
      !email ||
      !dob
    ) {
      showToast("Thiếu thông tin", "Vui lòng điền đầy đủ thông tin.", 2500);
      return;
    }
    if (password.length < 6) {
      showToast("Mật khẩu yếu", "Mật khẩu tối thiểu 6 ký tự.", 2500);
      return;
    }
    if (password !== passConfirm) {
      showToast("Mật khẩu không khớp", "Vui lòng xác nhận mật khẩu.", 2500);
      return;
    }

    const users = getUsers();
    if (users[username]) {
      showToast("Trùng tên", "Tên đăng nhập đã tồn tại.", 2500);
      return;
    }
    if (Object.values(users).some((u) => u.email === email)) {
      showToast("Trùng email", "Email đã được dùng.", 2500);
      return;
    }

    users[username] = { username, password, hoTen, phone, email, dob };
    saveUsers(users);
    showToast("Thành công", "Đăng ký thành công! Vui lòng đăng nhập.", 2600);
    switchPage("page-dang-nhap");
  }

  function handleLogin() {
    const usernameOrEmail = document
      .getElementById("login-username")
      .value.trim();
    const password = document.getElementById("login-password").value;
    if (!usernameOrEmail || !password) {
      showToast(
        "Thiếu thông tin",
        "Vui lòng nhập tài khoản và mật khẩu.",
        2200
      );
      return;
    }
    const users = getUsers();
    let user = users[usernameOrEmail];
    if (!user)
      user = Object.values(users).find((u) => u.email === usernameOrEmail);
    if (!user) {
      showToast(
        "Không tồn tại",
        "Tài khoản không tồn tại. Vui lòng đăng ký.",
        2500
      );
      switchPage("page-dang-ky");
      return;
    }
    if (user.password !== password) {
      showToast("Sai mật khẩu", "Vui lòng thử lại.", 2200);
      return;
    }
    setCurrentUsername(user.username);
    showUserInfo();
    showToast("Đăng nhập", `Xin chào ${user.hoTen}`, 1800);
    switchPage("page-danh-sach-sp");
  }

  function dangXuat() {
    setCurrentUsername(null);
    document.getElementById("user-info-widget").innerHTML =
      "<button onclick=\"switchPage('page-dang-ky')\">Đăng ký</button> <button onclick=\"switchPage('page-dang-nhap')\">Đăng nhập</button>";
    document.getElementById("nav-ql-ca-nhan").style.display = "none";
    showToast("Đăng xuất", "Bạn đã đăng xuất.", 1800);
    switchPage("page-dang-nhap");
  }

  function showUserInfo() {
    const username = getCurrentUsername();
    if (!username) return;
    const users = getUsers();
    const user = users[username];
    if (!user) return;
    document.getElementById("user-info-widget").innerHTML = `
      Xin chào, <strong>${escapeHtml(
        user.hoTen
      )}</strong>! | <a id="logout-link" href="#">Đăng xuất</a>
    `;
    document.getElementById("logout-link").onclick = (e) => {
      e.preventDefault();
      dangXuat();
    };
    document.getElementById("nav-ql-ca-nhan").style.display = "inline";
    document.getElementById("tt_ho_ten") &&
      (document.getElementById("tt_ho_ten").value = user.hoTen || "");
    document.getElementById("tt_email") &&
      (document.getElementById("tt_email").value = user.email || "");
    document.getElementById("tt_phone") &&
      (document.getElementById("tt_phone").value = user.phone || "");
    document.getElementById("tt_dob") &&
      (document.getElementById("tt_dob").value = user.dob || "");
  }

  function capNhatThongTin() {
    const hoTenMoi = document.getElementById("tt_ho_ten").value.trim();
    const emailMoi = document.getElementById("tt_email").value.trim();
    const phoneMoi = document.getElementById("tt_phone").value.trim();
    const dobMoi = document.getElementById("tt_dob").value;

    const username = getCurrentUsername();
    if (!username) {
      showToast("Chưa đăng nhập", "Vui lòng đăng nhập.", 2200);
      return;
    }
    const users = getUsers();
    const user = users[username];
    if (!user) return;

    if (
      Object.values(users).some(
        (u) => u.username !== username && u.email === emailMoi
      )
    ) {
      showToast("Email đã dùng", "Email đã được sử dụng.", 2400);
      return;
    }

    user.hoTen = hoTenMoi || user.hoTen;
    user.email = emailMoi || user.email;
    user.phone = phoneMoi || user.phone;
    user.dob = dobMoi || user.dob;
    users[username] = user;
    saveUsers(users);
    showUserInfo();
    showToast("Hoàn tất", "Cập nhật thông tin cá nhân thành công.", 2000);
    switchPage("page-danh-sach-sp");
  }

  // ---------- Products / filters / pagination ----------
  function loadCategories() {
    const select = document.getElementById("filter-category");
    if (!select) return;
    const cats = Array.from(
      new Set(PRODUCTS.map((p) => p.phanLoai.trim()))
    ).sort((a, b) => a.localeCompare(b, "vi"));
    select.innerHTML = '<option value="">-- Tất cả Phân loại --</option>';
    cats.forEach((cat) => {
      const opt = document.createElement("option");
      opt.value = cat;
      opt.textContent = cat;
      select.appendChild(opt);
    });
  }

  function applyFilters(page = 1) {
    const nameQuery = (
      document.getElementById("search-name")?.value || ""
    ).toLowerCase();
    const category = document.getElementById("filter-category")?.value || "";
    const minPriceRaw = document.getElementById("filter-min-price")?.value;
    const maxPriceRaw = document.getElementById("filter-max-price")?.value;
    const minPrice = minPriceRaw ? parseFloat(minPriceRaw) : 0;
    const maxPrice = maxPriceRaw ? parseFloat(maxPriceRaw) : Infinity;

    const filtered = PRODUCTS.filter((p) => {
      const matchesName = p.ten.toLowerCase().includes(nameQuery);
      const matchesCat = category === "" || p.phanLoai === category;
      const matchesPrice = p.gia >= minPrice && p.gia <= maxPrice;
      return matchesName && matchesCat && matchesPrice;
    });

    currentPage = page;
    renderProducts(filtered);
    renderPagination(filtered.length);
  }

  function renderProducts(products) {
    const container = document.getElementById("product-list");
    if (!container) return;
    container.innerHTML = "";
    const start = (currentPage - 1) * itemsPerPage;
    const onPage = products.slice(start, start + itemsPerPage);
    onPage.forEach((product) => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${escapeAttr(product.thumbnail)}" alt="${escapeAttr(
        product.ten
      )}" onerror="this.style.opacity=.6" />
        <h4>${escapeHtml(product.ten)}</h4>
        <p>Phân loại: ${escapeHtml(product.phanLoai)}</p>
        <p>Giá: ${product.gia.toLocaleString("vi-VN")} VNĐ</p>
        <div style="display:flex;gap:8px;justify-content:center;margin-top:8px">
          <button data-action="detail" data-id="${product.id}">Chi Tiết</button>
          <button data-action="add" data-id="${
            product.id
          }">Thêm vào giỏ</button>
        </div>
      `;
      container.appendChild(card);
    });

    // event delegation
    container.onclick = (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;
      const action = btn.dataset.action;
      const id = Number(btn.dataset.id);
      if (action === "detail") showProductModal(id);
      if (action === "add") {
        const p = PRODUCTS.find((x) => x.id === id);
        p && addToCart(p.id, p.ten, p.gia);
      }
    };
  }

  function renderPagination(totalItems) {
    const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
    const container = document.getElementById("pagination-controls");
    if (!container) return;
    container.innerHTML = "";
    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement("button");
      btn.textContent = i;
      btn.onclick = () => applyFilters(i);
      if (i === currentPage) {
        btn.style.backgroundColor = "white";
        btn.style.color = "#0077b6";
        btn.style.border = "2px solid #0077b6";
      }
      container.appendChild(btn);
    }
  }

  // ---------- Modal detail ----------
  function showProductModal(id) {
    const product = PRODUCTS.find((p) => p.id === id);
    const modal = document.getElementById("modal");
    const body = document.getElementById("modal-body");
    if (!product || !modal || !body) return;
    body.innerHTML = `
      <div style="display:flex;gap:12px;align-items:flex-start;flex-wrap:wrap;">
        <img src="${escapeAttr(product.thumbnail)}" alt="${escapeAttr(
      product.ten
    )}" style="width:260px;height:180px;object-fit:cover;border-radius:6px"/>
        <div style="flex:1;min-width:220px">
          <h3>${escapeHtml(product.ten)}</h3>
          <p><strong>Phân loại:</strong> ${escapeHtml(product.phanLoai)}</p>
          <p><strong>Giá:</strong> ${product.gia.toLocaleString()} VNĐ</p>
          <p>Đây là mô tả mẫu. Bạn có thể thêm nội dung thực tế vào trường mô tả của sản phẩm.</p>
          <div style="margin-top:8px;display:flex;gap:8px;align-items:center">
            <input id="modal-qty" type="number" min="1" value="1" style="width:80px;padding:6px;border-radius:6px;border:1px solid #ccc"/>
            <button id="modal-add">Thêm vào giỏ</button>
          </div>
        </div>
      </div>
    `;
    document.getElementById("modal-close").onclick = closeModal;
    document.getElementById("modal-add").onclick = () => {
      const q = Number(document.getElementById("modal-qty").value) || 1;
      addToCart(product.id, product.ten, product.gia, q);
      closeModal();
      switchPage("page-gio-hang");
    };
    modal.setAttribute("aria-hidden", "false");
  }
  function closeModal() {
    const modal = document.getElementById("modal");
    if (!modal) return;
    modal.setAttribute("aria-hidden", "true");
  }

  // ---------- Cart ----------
  function addToCart(productId, name, price, quantity = 1) {
    const cart = getCart();
    const idNum = Number(productId);
    const existing = cart.find((i) => Number(i.productId) === idNum);
    if (existing)
      existing.quantity = (existing.quantity || 0) + Number(quantity);
    else
      cart.push({ productId: idNum, name, price, quantity: Number(quantity) });
    saveCart(cart);
    showToast("Giỏ hàng", "Đã thêm sản phẩm vào giỏ hàng.", 1700);
    renderCart();
  }

  function removeFromCart(productId) {
    const idNum = Number(productId);
    const newCart = getCart().filter((i) => Number(i.productId) !== idNum);
    saveCart(newCart);
    renderCart();
  }

  function renderCart() {
    const container = document.getElementById("cart-items");
    const totalElem = document.getElementById("total-price");
    if (!container || !totalElem) return;
    const cart = getCart();
    if (!cart.length) {
      container.innerHTML = "<p>Giỏ hàng trống</p>";
      totalElem.textContent = "0đ";
      return;
    }
    container.innerHTML = cart
      .map(
        (item) => `
      <div class="cart-item">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <div>
            <strong>${escapeHtml(item.name)}</strong><br/>
            Số lượng: <input type="number" min="1" value="${
              item.quantity
            }" data-id="${
          item.productId
        }" class="cart-qty" style="width:70px;padding:6px;border-radius:6px;border:1px solid #ccc;"/>
          </div>
          <div style="text-align:right">
            <div>${(item.price * item.quantity).toLocaleString()}đ</div>
            <button data-remove="${item.productId}">Xóa</button>
          </div>
        </div>
      </div>
    `
      )
      .join("");

    container
      .querySelectorAll("[data-remove]")
      .forEach(
        (btn) => (btn.onclick = () => removeFromCart(btn.dataset.remove))
      );
    container.querySelectorAll(".cart-qty").forEach((input) => {
      input.onchange = () => {
        const id = Number(input.dataset.id);
        const qty = Math.max(1, Number(input.value) || 1);
        const cart = getCart();
        const it = cart.find((i) => Number(i.productId) === id);
        if (it) {
          it.quantity = qty;
          saveCart(cart);
          renderCart();
        }
      };
    });

    const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);
    totalElem.textContent = total.toLocaleString() + "đ";
  }

  // ---------- Checkout & Orders ----------
  function saveShippingInfo() {
    const name = document.getElementById("ship-name")?.value?.trim();
    const address = document.getElementById("ship-address")?.value?.trim();
    const phone = document.getElementById("ship-phone")?.value?.trim();
    if (!name || !address || !phone) {
      showToast(
        "Thiếu thông tin",
        "Vui lòng nhập đủ thông tin giao hàng!",
        2500
      );
      return null;
    }
    const info = { name, address, phone };
    localStorage.setItem("shippingInfo", JSON.stringify(info));
    return info;
  }

  function checkout() {
    const shipping = saveShippingInfo();
    if (!shipping) return;
    const payment =
      document.querySelector('input[name="payment"]:checked')?.value || "cod";
    const cart = getCart();
    if (!cart.length) {
      showToast("Giỏ hàng trống", "Không thể thanh toán.", 2000);
      return;
    }
    const order = {
      id: Date.now(),
      items: cart,
      shipping,
      payment,
      total: cart.reduce((s, i) => s + i.price * i.quantity, 0),
      date: new Date().toLocaleString(),
    };
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.removeItem("cart");
    showToast("Thanh toán", "Đặt hàng thành công!", 2200);
    renderCart();
    switchPage("page-don-hang");
  }

  function renderOrders() {
    const container = document.getElementById("order-list");
    if (!container) return;
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    if (!orders.length) {
      container.innerHTML = "<p>Chưa có đơn hàng nào.</p>";
      return;
    }
    container.innerHTML = orders
      .map(
        (o) => `
      <div class="order">
        <h3>Đơn hàng #${o.id}</h3>
        <p>Ngày: ${o.date}</p>
        <p>Người nhận: ${escapeHtml(o.shipping.name)}</p>
        <p>Địa chỉ: ${escapeHtml(o.shipping.address)}</p>
        <p>Thanh toán: ${escapeHtml(o.payment)}</p>
        <p>Tổng: ${o.total.toLocaleString()}đ</p>
        <details><summary>Chi tiết mặt hàng</summary>
          ${o.items
            .map(
              (it) =>
                `<div>${escapeHtml(it.name)} x${it.quantity} — ${(
                  it.price * it.quantity
                ).toLocaleString()}đ</div>`
            )
            .join("")}
        </details>
      </div>
    `
      )
      .join("");
  }

  // ---------- Export / Import (backup) ----------
  function exportData() {
    const data = {
      users: getUsers(),
      cart: getCart(),
      orders: JSON.parse(localStorage.getItem("orders") || "[]"),
      shippingInfo: JSON.parse(localStorage.getItem("shippingInfo") || "null"),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bookshop_backup_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    showToast("Xuất dữ liệu", "Dữ liệu đã được tải về.", 2000);
  }

  function importData(file) {
    if (!file) return;
    const reader = new FileReader();
    showToast("Nhập dữ liệu", "Đang xử lý...", 2000);
    reader.onload = function (e) {
      try {
        const obj = JSON.parse(e.target.result);
        if (obj.users) localStorage.setItem("users", JSON.stringify(obj.users));
        if (obj.cart) localStorage.setItem("cart", JSON.stringify(obj.cart));
        if (obj.orders)
          localStorage.setItem("orders", JSON.stringify(obj.orders));
        if (obj.shippingInfo)
          localStorage.setItem(
            "shippingInfo",
            JSON.stringify(obj.shippingInfo)
          );
        showToast("Nhập dữ liệu", "Nhập dữ liệu thành công.", 2000);
        // re-init views
        showUserInfo();
        renderCart();
        renderOrders();
        loadCategories();
        applyFilters(1);
      } catch (err) {
        showToast(
          "Lỗi",
          "Không thể đọc file. Hãy kiểm tra định dạng JSON.",
          3000
        );
      }
    };
    reader.readAsText(file);
  }

  // ---------- Utils ----------
  function escapeHtml(str) {
    if (typeof str !== "string") return str;
    return str.replace(
      /[&<>"']/g,
      (m) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        }[m])
    );
  }
  function escapeAttr(s) {
    return String(s).replace(/"/g, "&quot;");
  }

  // ---------- Init ----------
  function init() {
    document
      .getElementById("btn-register")
      ?.addEventListener("click", handleRegister);
    document
      .getElementById("btn-login")
      ?.addEventListener("click", handleLogin);
    document
      .getElementById("btn-update-profile")
      ?.addEventListener("click", capNhatThongTin);
    document
      .getElementById("btn-apply-filters")
      ?.addEventListener("click", () => applyFilters(1));
    document
      .getElementById("btn-checkout")
      ?.addEventListener("click", checkout);
    document
      .getElementById("btn-export")
      ?.addEventListener("click", exportData);
    document.getElementById("import-file")?.addEventListener("change", (e) => {
      const f = e.target.files[0];
      if (!f) return;
      // show tiny loader toast and import
      importData(f);
      e.target.value = ""; // reset input so user can import same file again if needed
    });

    // modal close on overlay click
    document.getElementById("modal")?.addEventListener("click", (e) => {
      if (e.target.id === "modal") closeModal();
    });

    if (getCurrentUsername()) {
      showUserInfo();
      switchPage("page-danh-sach-sp");
    } else switchPage("page-dang-nhap");

    loadCategories();
    applyFilters(1);
    renderCart();
    renderOrders();
  }

  document.addEventListener("DOMContentLoaded", init);

  // expose functions used in inline html or console
  window.switchPage = switchPage;
  window.addToCart = addToCart;
  window.showProductModal = showProductModal;
  window.dangXuat = dangXuat;
})();
