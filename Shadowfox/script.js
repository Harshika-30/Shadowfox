// Amazon Clone - Shadowfox

const products = [
    { id: 1, name: "Echo Dot (5th Gen)", price: 49.99, image: "https://m.media-amazon.com/images/I/61u48FEsQIL._AC_SL1000_.jpg", rating: 4.7 },
    { id: 2, name: "Fire TV Stick 4K", price: 39.99, image: "https://m.media-amazon.com/images/I/51CgKGfMelL._AC_SL1000_.jpg", rating: 4.6 },
    { id: 3, name: "Kindle Paperwhite", price: 129.99, image: "https://m.media-amazon.com/images/I/61nPiOO2wqL._AC_SL1000_.jpg", rating: 4.8 },
    { id: 4, name: "Amazon Basics Mouse", price: 12.99, image: "https://m.media-amazon.com/images/I/61LtuGzXeaL._AC_SL1500_.jpg", rating: 4.4 },
    { id: 5, name: "Echo Show 8", price: 89.99, image: "https://m.media-amazon.com/images/I/71rNJQ2g-EL._AC_SL1500_.jpg", rating: 4.5 },
    { id: 6, name: "Amazon Smart Plug", price: 24.99, image: "https://m.media-amazon.com/images/I/51j6yME1uXL._AC_SL1000_.jpg", rating: 4.3 }
];

const cart = {};

function renderProducts(list) {
    const productsDiv = document.getElementById('products');
    productsDiv.innerHTML = '';
    list.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <div class="rating">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))} (${product.rating})</div>
            <p class="price">$${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productsDiv.appendChild(productCard);
    });
}

function addToCart(id) {
    cart[id] = (cart[id] || 0) + 1;
    updateCartCount();
    renderCart();
}

function removeFromCart(id) {
    if (cart[id]) {
        cart[id]--;
        if (cart[id] === 0) delete cart[id];
        updateCartCount();
        renderCart();
    }
}

function updateCartCount() {
    document.getElementById('cart-count').textContent = Object.values(cart).reduce((a, b) => a + b, 0);
}

function renderCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItems.innerHTML = '';
    let total = 0;
    Object.keys(cart).forEach(id => {
        const product = products.find(p => p.id == id);
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="cart-thumb">
            <span>${product.name}</span>
            <span>Qty: ${cart[id]}</span>
            <span>$${(product.price * cart[id]).toFixed(2)}</span>
            <button onclick="removeFromCart(${id})">Remove</button>
        `;
        cartItems.appendChild(li);
        total += product.price * cart[id];
    });
    cartTotal.textContent = total.toFixed(2);
}

document.getElementById('search-btn').onclick = function() {
    const query = document.getElementById('search-bar').value.toLowerCase();
    renderProducts(products.filter(p => p.name.toLowerCase().includes(query)));
};

document.getElementById('cart-btn').onclick = function() {
    document.getElementById('cart-sidebar').classList.toggle('open');
};

document.getElementById('checkout-btn').onclick = function() {
    if (Object.keys(cart).length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert('Thank you for your purchase! (Demo only)');
    for (let id in cart) delete cart[id];
    updateCartCount();
    renderCart();
    document.getElementById('cart-sidebar').classList.remove('open');
};

// Initial render
renderProducts(products);
updateCartCount();
renderCart();
