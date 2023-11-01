async function fetchAllProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        displayProducts(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

function displayProducts(products) {
    const productContainer = document.getElementById('productContainer');


    productContainer.innerHTML = '';

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.innerHTML = `
                <h2>${product.title}</h2>
                <p>${product.description}</p>
                <p>${product.price}</p>
                <img src="${product.image}" alt="${product.title}"/>
                <button>Add to cart</button>
            `;

        productElement.querySelector('button').addEventListener('click', () => {
            addToCart(product);
        });

        productContainer.appendChild(productElement);
    });
}

async function fetchProductsByCategory(category) {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
        const data = await response.json();
        displayProducts(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

document.getElementById('categorySelect').addEventListener('change', function () {
    const category = this.value;
    if (category) {
        fetchProductsByCategory(category);
    } else {
        fetchAllProducts();
    }
});

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
}

function checkout() {
    localStorage.clear();
}

//fetches all products when site loads
fetchAllProducts();