// Cart functions
function updateCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartTotal = document.querySelectorAll(".cartTotal");
  if (!cartTotal) return;
  if (cart.length > 0) {
    cartTotal.forEach((el) => (el.textContent = cart.reduce((total, product) => total + product.quantity, 0)));
  } else {
    cartTotal.forEach((el) => (el.textContent = ""));
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

const address = document.querySelector('#address')
address?.addEventListener('submit', (e) => {
  e.preventDefault()
  const contact = {
    firstName: address?.firstName.value,
    lastName: address?.lastName.value,
    address: address?.address.value,
    address2: address?.address2.value,
    city: address?.city.value,
    zipcode: address?.zipcode.value,
    country: address?.country.value,
  }
  console.log(contact)
  if (address?.saveInfo.checked) {
    sessionStorage.setItem('contact', JSON.stringify(contact))
  }
  window.location.href = '/payment.html'
})

function logout() {
  sessionStorage.removeItem("email");
  location.reload();
}

const email = sessionStorage.getItem("email");
const loginBtn = document.querySelectorAll(".login");
const logoutBtn = document.querySelectorAll(".logout");
if (email) {
  loginBtn?.forEach((btn) => btn.classList.add("hidden"));
  logoutBtn?.forEach((btn) => btn.classList.remove("hidden"));
  logoutBtn?.forEach((btn) => btn.addEventListener("click", () => logout()));
} else {
  loginBtn?.forEach((btn) => btn.classList.remove("hidden"));
  logoutBtn?.forEach((btn) => btn.classList.add("hidden"));
}
if (!email && window.location.href.includes("shop")) {
  window.location.href = "login.html";
}

document.querySelector(".menu-open")?.addEventListener("click", toggleMenu);
document.querySelector(".menu-close")?.addEventListener("click", toggleMenu);

function toggleMenu() {
  document.querySelector(".mobile-menu")?.classList.toggle("hidden");
  document.querySelector(".menu-open")?.classList.toggle("hidden");
  document.querySelector(".menu-close")?.classList.toggle("hidden");
}

