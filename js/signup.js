document.getElementById('signupForm').addEventListener('submit', async function(event) {
  event.preventDefault();
   
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  var confirmPassword = document.getElementById('confirmPassword').value;

  if (password !== confirmPassword) {
    alert('Passwords do not match');
    return; 
  }
   
  //TODO: password req
  try {
    const response = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email, password: password, confirmPassword: confirmPassword })
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
});
