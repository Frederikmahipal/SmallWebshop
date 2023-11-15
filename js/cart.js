function insertCartItems() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartContainer = document.querySelector(".cart-items");
  cartContainer.innerHTML = "";
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
      insertCartItems();
    });
    cartContainer.appendChild(productElement);
  });

  const cartTotal = document.querySelector(".cartTotal");
  cartTotal.textContent = cart.reduce((total, product) => total + product.quantity, 0);

  //if cart has no items, display a message
  if (cart.length === 0) {
    const emptyCartMessage = document.createElement("p");
    emptyCartMessage.textContent = "Your cart is empty";
    cartContainer.appendChild(emptyCartMessage);
  }
}

insertCartItems();