// Cart functions
function updateCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartTotal = document.querySelector(".cartTotal");
  if (cart.length > 0) {
  cartTotal.textContent = cart.reduce((total, product) => total + product.quantity, 0);
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

async function getProductsByCategory(category) {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}

// User functions
function checkout() {
  localStorage.clear();
}

function logout() {
  sessionStorage.removeItem("email");
  console.log("User logged out");
  window.location.href = "login.html";
}
