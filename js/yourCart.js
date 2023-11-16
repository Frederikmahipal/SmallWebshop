function renderCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartContainer = document.querySelector("#yourCart");
  cartContainer.innerHTML = `
    <h2>Your cart</h2>
    <div class="cart-content">
      <div class="cart-items"></div>
    </div>
    <div class="order-summary">
      <div class="summary-container">
        <div class="subtotal">
          <p>Subtotal</p>
          <p class="subtotal-price"></p>
        </div>
        <div class="shipping">
          <p>Shipping</p>
          <p class="shipping-price"></p>
        </div>
        <div class="line"></div>
        <div class="total">
          <p>Total</p>
          <p class="total-price"></p>
        </div>
      </div>
    </div>
  `;
  const cartItems = document.querySelector(".cart-items");
  cart.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.className = "cart-item";
    productElement.innerHTML = `
                <div class="product-img"><img src="${product.image}" alt="${product.title}"/></div>
                <div class="product-info">
                    <h2>${product.title}</h2>
                    <p>Quantity: ${product.quantity}</p>
                    <span class="removeButton">Remove</span>
                    </div>
                    <p class="price">$${product.price}</p>
            `;
    productElement.querySelector(".removeButton").addEventListener("click", () => {
      removeFromCart(product);
      loadCart();
    });
    cartItems.appendChild(productElement);
  });

  //if cart has no items, display a message
  if (cart.length === 0) {
    const emptyCartMessage = document.createElement("p");
    emptyCartMessage.className = "empty-cart-message";
    emptyCartMessage.textContent = "Your cart is empty";
    cartContainer.appendChild(emptyCartMessage);
    const orderSummary = document.querySelector(".order-summary");
    orderSummary.style.display = "none";
  }

  const shippingPrice = 20;

  const cartSubtotal = document.querySelector(".subtotal-price");
  cartSubtotal.textContent = "$"+cart.reduce((total, product) => total + product.price*product.quantity, 0).toFixed(2);
  const shipping = document.querySelector(".shipping-price");
  shipping.textContent = "$"+shippingPrice;
  const cartTotal = document.querySelector(".total-price");
  cartTotal.textContent = "$"+(cart.reduce((total, product) => total + product.price*product.quantity, 0 + shippingPrice).toFixed(2));
}

renderCart();