function renderUsersInformation() {
    
}
















function resetPassWord() {
    var resetpass_btns = document.querySelectorAll('.reset-btn')
    resetpass_btns.forEach(function (resetpass_btn) {
        resetpass_btn.onclick = function () {
            var password = document.getElementById(this.getAttribute('data-target'));
            if (password) {
                password.innerText = '0'; //Sửa
            }
        }
    })
}

function accountLockAndUnlock() {
    var lock_btns = document.querySelectorAll('.lock-btn')
    lock_btns.forEach(function(lock_btn) {
        lock_btn.onclick = function() {
            var user = document.getElementById(lock_btn.getAttribute('data-target'));
            var curText = this.innerText;
            if (curText === 'Khóa') {
                user.classList.add('border-lock');
                this.innerText = 'Mở khóa';
                this.classList.remove('red');
                this.classList.add('green');
                this.style.color = '#000'
            }
            else if (curText === 'Mở khóa') {
                user.classList.remove('border-lock');
                this.innerText = 'Khóa';
                this.classList.add('red');
                this.classList.remove('green');
                this.style.color = '#fff'
            }
        }
    })
}