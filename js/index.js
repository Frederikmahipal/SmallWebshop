document.addEventListener('DOMContentLoaded', (event) => {
    var email = sessionStorage.getItem('email');
    if (!email) {
        alert('access denied, please login')
        window.location.href = 'login.html';
    }
});

function logout() {
    sessionStorage.removeItem('email');
    console.log('User logged out');
    window.location.href = 'login.html';
}

