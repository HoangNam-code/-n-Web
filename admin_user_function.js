/**
 * admin_user_function.js
 * Xử lý các chức năng trong khu vực #user-function.
 * [PHIÊN BẢN ĐÃ SỬA LỖI VÀ HỢP NHẤT]
 */

// Giả định hàm getAllUsers và saveAllUsers đã được định nghĩa trong database.js

const USER_LIST_CONTAINER_ID = 'user-function .list-items';

// Hàm tạo HTML cho một người dùng
function createUserItemHTML(user) {
    // Thêm class 'border-lock' nếu tài khoản bị khóa
    const lockClass = user.isLocked ? 'border-lock' : '';
    const lockBtnText = user.isLocked ? 'Mở Khóa' : 'Khóa';
    const lockBtnColor = user.isLocked ? 'green' : 'red';
    
    return `
        <div class="item ${lockClass}" id="user-${user.id}">
            <p>${user.id}</p>
            <p>${user.username}</p>
            <p id="pass-${user.id}">${user.password}</p>
            <div class="btn-list">
                <button class="btn reset-btn blue" data-target="pass-${user.id}" data-user-id="${user.id}">Reset mật khẩu</button>
                <button class="btn lock-btn ${lockBtnColor}" data-user-id="${user.id}" data-locked="${user.isLocked}">${lockBtnText}</button>
            </div>
        </div>
    `;
}

// Hàm đọc dữ liệu từ Local Storage và hiển thị
function renderUserList() {
    const users = getAllUsers(); // Lấy dữ liệu từ database.js
    const listContainer = document.querySelector(`#${USER_LIST_CONTAINER_ID}`);
    
    if (!listContainer) return;

    // Tạo HTML cho toàn bộ danh sách
    let html = users.map(user => createUserItemHTML(user)).join('');
    
    // Ghi đè nội dung cũ bằng danh sách mới
    listContainer.innerHTML = html;
}

// Hàm xử lý Khóa/Mở Khóa
function toggleLockUser(userId) {
    let users = getAllUsers();
    const userIndex = users.findIndex(u => u.id == userId);
    
    if (userIndex !== -1) {
        users[userIndex].isLocked = !users[userIndex].isLocked; // Đảo ngược trạng thái
        saveAllUsers(users);
        window.dispatchEvent(new Event('usersUpdated'));
        alert(`Tài khoản ${users[userIndex].username} đã được ${users[userIndex].isLocked ? 'KHÓA' : 'MỞ KHÓA'}.`);
        renderUserList(); // Cập nhật lại giao diện
    }
}

// Hàm xử lý Reset mật khẩu (chỉ là mô phỏng)
function resetPassword(userId) {
    let users = getAllUsers();
    const userIndex = users.findIndex(u => u.id == userId);

    if (userIndex !== -1) {
        // Giả sử reset về mật khẩu mặc định mới 'newpass'
        users[userIndex].password = 'newpass'; 
        saveAllUsers(users);
        window.dispatchEvent(new Event('usersUpdated'));
        alert(`Đã reset mật khẩu cho ${users[userIndex].username} về 'newpass'.`);
        
        // [SỬA LỖI] Thêm dòng này để cập nhật lại giao diện
        renderUserList(); 
    }
}

// --- HÀM THÊM NGƯỜI DÙNG ---
function addNewUser(username, password) {
    let users = getAllUsers();
    
    // 1. Kiểm tra username đã tồn tại chưa
    if (users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
        return { success: false, message: 'Tên đăng nhập đã tồn tại.' };
    }
    
    // 2. Tạo ID mới (ID lớn nhất + 1)
    const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;

    // 3. Tạo đối tượng người dùng mới
    const newUser = {
        id: newId,
        username: username,
        password: password, // Trong thực tế cần mã hóa mật khẩu tại đây
        isLocked: false 
    };

    // 4. Thêm và lưu vào Local Storage
    users.push(newUser);
    saveAllUsers(users);
    window.dispatchEvent(new Event('usersUpdated'));
    return { success: true, message: 'Đã thêm người dùng mới thành công!' };
}


// --- HÀM XỬ LÝ CHÍNH ---
function handleUserManagement() {
    const userFunctionArea = document.getElementById('user-function');
    if (!userFunctionArea) return;

    const addUserModal = document.getElementById('add-user-modal');
    const addUserBtn = userFunctionArea.querySelector('.heading-wrap .add-btn');
    const closeFormBtn = userFunctionArea.querySelector('.close-modal-btn');
    const addUserForm = document.getElementById('add-user-form');
    const errorMessage = document.getElementById('add-user-error-message');

    // Kiểm tra các element modal có tồn tại không
    if (!addUserModal || !addUserBtn || !closeFormBtn || !addUserForm || !errorMessage) {
        console.error('Một vài phần tử của modal thêm user không tìm thấy.');
        // Vẫn tiếp tục để các chức năng khác (Reset, Lock) hoạt động
    }

    // 1. Hiển thị danh sách người dùng khi trang được tải
    renderUserList(); 

    // 2. Mở Modal khi nhấn nút "Thêm"
    if (addUserBtn) {
        addUserBtn.addEventListener('click', () => {
            if (addUserModal) {
                addUserModal.style.display = 'flex'; // Hiện modal
                addUserForm.reset(); // Reset form
                errorMessage.textContent = ''; // Xóa thông báo lỗi cũ
            }
        });
    }

    // 3. Đóng Modal khi nhấn nút "Đóng" hoặc click ra ngoài
    if (closeFormBtn) {
        closeFormBtn.addEventListener('click', () => {
            if (addUserModal) addUserModal.style.display = 'none';
        });
    }
    if (addUserModal) {
        addUserModal.addEventListener('click', (e) => {
            if (e.target === addUserModal) {
                addUserModal.style.display = 'none';
            }
        });
    }

    // 4. Xử lý submit Form Thêm Người Dùng
    if (addUserForm) {
        addUserForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const username = document.getElementById('new-username').value.trim();
            const password = document.getElementById('new-password').value.trim();
            
            if (username.length < 3 || password.length < 6) {
                errorMessage.textContent = 'Tên đăng nhập phải >= 3 ký tự, mật khẩu phải >= 6 ký tự.';
                return;
            }
            
            const result = addNewUser(username, password);
            
            if (result.success) {
                alert(result.message);
                renderUserList(); // Cập nhật danh sách mới
                if (addUserModal) addUserModal.style.display = 'none'; // Đóng form
            } else {
                errorMessage.textContent = result.message; // Hiển thị lỗi (tên đã tồn tại)
            }
        });
    }


    // 5. Xử lý các sự kiện nút bấm Khóa/Reset
    userFunctionArea.addEventListener('click', (e) => {
        const target = e.target;
        
        if (target.classList.contains('lock-btn')) {
            const userId = target.getAttribute('data-user-id');
            toggleLockUser(userId);
            
        } else if (target.classList.contains('reset-btn')) {
            const userId = target.getAttribute('data-user-id');
            resetPassword(userId);
        }
        // Nút 'add-btn' đã được xử lý riêng ở trên (mục 2)
    });

    console.log('User Management Fully Loaded (Consolidated & Fixed)');
}

// Gắn sự kiện khởi tạo sau khi DOM đã load
document.addEventListener('DOMContentLoaded', handleUserManagement);