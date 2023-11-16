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