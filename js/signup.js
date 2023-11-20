document
  .getElementById("signupForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    var passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

    if (!emailRegex.test(email)) {
      alert("Enter a valid email adress");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!passwordRegex.test(password)) {
      alert(
        "Password must be between 8 and 20 characters, and contain lowercase and uppercase letters, numbers, and special characters"
      );
      return;
    }

    try {
      let response = await fetch("http://localhost:3000/users?email=" + email);
      let data = await response.json();

      if (data.length > 0) {
        alert("Email already exists");
        return;
      } else {
        let response = await fetch("http://localhost:3000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            confirmPassword: confirmPassword,
          }),
        });
        let data = await response.json();
      }
    } catch (error) {
      console.error(error);
    }
  });
