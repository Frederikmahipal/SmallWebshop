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
                  <button class="button button_add-to-cart button_secondary">Add to cart</button>
                </div>
            `;

    productElement.querySelector("button").addEventListener("click", () => {
      addToCart(product);
    });

    productElement.addEventListener("click", () => {
      console.log(product);
      const modal = document.querySelector(".product-modal");
      modal.innerHTML = `
      <div class="modal-content">
        <button class="close-button">⨉</button>
          <div class="modal-img"><img src="${product.image}" alt="${product.title}"/></div>
          <div class="modal-info">
            <div>
              <span>${product.category}</span>
              <h2>${product.title}</h2>
            </div>
            <div class="price-rating">
              <p class="price">$${product.price}</p>
              <p class="rating">
                <span>${product.rating.rate}
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                  </svg>
                </span> 
                ${product.rating.count} reviews
              </p>
            </div>
            <p>${product.description}</p>
            <button class="button">Add to cart</button>
          </div>
        </div>
      `;
      modal.setAttribute("open", "");

      modal.querySelector(".button").addEventListener("click", () => {
        addToCart(product);
      });
      modal.querySelector(".close-button").addEventListener("click", () => {
        modal.removeAttribute("open");
      });
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
