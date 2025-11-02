function renderMainContent() {
    var nav_btns = document.querySelectorAll('.function-nav-btn')
    nav_btns.forEach((nav_btn) => {
    nav_btn.onclick = function() {
        var curActive = document.querySelector('.function-area.active-function-area')
        if (curActive) curActive.classList.remove('active-function-area')
        var targetID = this.getAttribute('data-target');
        var newActiveArea = document.getElementById(targetID);

        if(newActiveArea) {
            newActiveArea.classList.add('active-function-area');
        }
    }
})
}

function start() {
    renderMainContent();
    resetPassWord();
    accountLockAndUnlock();
}

start();

