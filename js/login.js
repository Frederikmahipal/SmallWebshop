
var loginForm = document.getElementById('loginForm');


    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        
        fetch('http://localhost:3000/users?email=' + email + '&password=' + password)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                sessionStorage.setItem('email', email);
                console.log('User logged in');
                window.location.href = 'index.html';
            } else {
                console.log('Invalid credentials');
                alert('invalid credentials')
            }
        })
        .catch(error => console.error(error));
    });


