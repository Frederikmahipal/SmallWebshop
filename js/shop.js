async function displayProducts(category) {
  let products;

  const productGrid = document.querySelector(".product-grid");
  productGrid.innerHTML = "Loading products...";

  if (category) {
    products = await getProductsByCategory(category);
  } else {
    products = await getAllProducts();
  }

  if (!products) {
    productGrid.innerHTML = "Error loading products";
    return;
  }

  productGrid.innerHTML = "";

  products.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.classList.add("product-card");
    productElement.innerHTML = `
                <div class="product-img"><img src="${product.image}" alt="${product.title}"/></div>
                <div class="product-info">
                  <div class="title-price">
                    <h2>${product.title}</h2>
                    <p>$${product.price}</p>
                  </div>
                  <button>Add to cart</button>
                </div>
            `;

    productElement.querySelector("button").addEventListener("click", () => {
      addToCart(product);
    });

    productGrid.appendChild(productElement);
  });
}

let email = sessionStorage.getItem("email");
if (email) {
  displayProducts();
}
const categorySelect = document.querySelector(".categorySelect");
if (categorySelect) {
  categorySelect.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      categorySelect.querySelector(".active")?.classList.remove("active");
      button.classList.add("active");
      const category = button.value;
      displayProducts(category);
    });
  });
}

// function displayCart() {
//   let cart = JSON.parse(localStorage.getItem("cart")) || [];
//   const cartContainer = document.getElementById("cartContainer");
//   cartContainer.innerHTML = "";
//   cart.forEach((product) => {
//     const productElement = document.createElement("div");
//     productElement.innerHTML = `
//                 <h2>${product.title}</h2>
//                 <p>${product.price}</p>
//                 <img src="${product.image}" alt="${product.title}"/>
//                 <button class="removeButton">Remove</button>
//                 <button class="addButton">Add to cart</button>
//                 <p>Quantity: ${product.quantity}</p>
//             `;
//     productElement.querySelector(".removeButton").addEventListener("click", () => {
//       removeProduct(product);
//     });
//     productElement.querySelector(".addButton").addEventListener("click", () => {
//       addToCart(product);
//     });
//     cartContainer.appendChild(productElement);
//   });

//   const cartTotal = document.querySelector(".cartTotal");
//   cartTotal.textContent = cart.reduce((total, product) => total + product.quantity, 0);

//   //if cart has no items, display a message
//     if (cart.length === 0) {
//         const emptyCartMessage = document.createElement("p");
//         emptyCartMessage.textContent = "Your cart is empty";
//         cartContainer.appendChild(emptyCartMessage);
//     }
// }
