var loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    
    try {
        const response = await fetch('http://localhost:3000/users?email=' + email + '&password=' + password);
        const data = await response.json();
        if (data.length > 0) {
            sessionStorage.setItem('email', email);
            console.log('User logged in');
            window.location.href = '/';
        } else {
            console.log('Invalid credentials');
            alert('invalid credentials')
        }
    } catch (error) {
        console.error(error);
    }
});
