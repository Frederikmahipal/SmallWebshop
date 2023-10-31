document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();
   
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return; 
    }
   
    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email, password: password, confirmPassword: confirmPassword })
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
});

