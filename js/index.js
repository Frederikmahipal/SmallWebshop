document.addEventListener("DOMContentLoaded", () => {
  let email = sessionStorage.getItem("email");
  if (!email) {
    alert("access denied, please login");
    window.location.href = "login.html";
  }
});


