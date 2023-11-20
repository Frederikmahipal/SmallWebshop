// Cart functions
function updateCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartTotal = document.querySelector(".cartTotal");
  if (!cartTotal) return;
  if (cart.length > 0) {
    cartTotal.textContent = cart.reduce(
      (total, product) => total + product.quantity,
      0
    );
  } else {
    cartTotal.textContent = "";
  }
}

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingProductIndex = cart.findIndex((item) => item.id === product.id);
  if (existingProductIndex !== -1) {
    cart[existingProductIndex].quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

function removeFromCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingProductIndex = cart.findIndex((item) => item.id === product.id);
  if (existingProductIndex !== -1) {
    if (cart[existingProductIndex].quantity === 1) {
      cart.splice(existingProductIndex, 1);
    } else {
      cart[existingProductIndex].quantity--;
    }
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

updateCart();

// Product functions
async function getAllProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}

async function getSomeProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products?limit=3");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}

async function getProductsByCategory(category) {
  try {
    const response = await fetch(
      `https://fakestoreapi.com/products/category/${category}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}

// User functions
const payment = document.querySelector('#payment')
payment?.addEventListener('submit', (e) => {
  e.preventDefault()
  const card = {
    name: payment?.cardname.value,
    number: payment?.cardnumber.value,
    expMonth: payment?.cardmonth.value,
    expYear: payment?.cardyear.value,
    cvc: payment?.cvc.value
  }
  if (payment?.saveInfo.checked) {
    sessionStorage.setItem('card', JSON.stringify(card))
  }
  window.location.href = '/'
})

function logout() {
  sessionStorage.removeItem("email");
  location.reload();
}

const email = sessionStorage.getItem("email");
const loginBtn = document.querySelector(".login");
const logoutBtn = document.querySelector(".logout");
if (email) {
  loginBtn?.classList.add("hidden");
  logoutBtn?.classList.remove("hidden");
  logoutBtn?.addEventListener("click", () => {
    logout();
  });
} else {
  loginBtn?.classList.remove("hidden");
  logoutBtn?.classList.add("hidden");
}
if (!email && window.location.href.includes("shop")) {
  window.location.href = "login.html";
}

function validate() {
  sessionStorage.removeItem("email");
  location.reload();
}

document.querySelectorAll(".form").forEach(function (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Clear old error messages
    const oldErrors = document.querySelectorAll(".error-message");
    oldErrors.forEach(function (error) {
      error.remove();
    });

    // Get all form controls
    const fields = this.querySelectorAll("input, select");

    let isValid = true;

    // For each form control
    fields.forEach(function (field) {
      // If the field is not valid
      if (!field.checkValidity()) {
        isValid = false;

        // Create a new div element for the error message
        const errorMessage = document.createElement("div");
        errorMessage.className = "error-message";
        errorMessage.textContent = "Please fill out this field.";

        // Append the error message to the form
        field.parentElement.appendChild(errorMessage);
      }
    });

    if (isValid) {
      // Redirect to the URL specified in the data-redirect attribute
      window.location.href = this.dataset.redirect;
    }
  });
});
