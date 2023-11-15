async function displayProducts(category) {
  let products;

  const productGrid = document.querySelector(".product-grid");
  productGrid.innerHTML = "loading products...";

  if (category) {
    products = await getProductsByCategory(category);
  } else {
    products = await getAllProducts();
  }

  productGrid.innerHTML = "";

  products.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.innerHTML = `
                <h2>${product.title}</h2>
                <p>${product.description}</p>
                <p>${product.price}</p>
                <img src="${product.image}" alt="${product.title}"/>
                <button>Add to cart</button>
            `;

    productElement.querySelector("button").addEventListener("click", () => {
      addToCart(product);
    });

    productGrid.appendChild(productElement);
  });
}

displayProducts();

const categorySelect = document.getElementById("categorySelect");
if (categorySelect) {
  document.getElementById("categorySelect").addEventListener("change", function () {
    const category = this.value;
    displayProducts(category);
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
