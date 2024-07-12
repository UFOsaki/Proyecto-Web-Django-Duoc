// JavaScript para manejar el carrito de compras
let cartCount = 0;
const cartItems = {};

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const product = button.getAttribute('data-product');
            addToCart(product);
        });
    });

    updateCart();
});

function addToCart(product) {
    if (!cartItems[product]) {
        cartItems[product] = 0;
    }
    cartItems[product]++;
    cartCount++;
    updateCart();
}

function updateCart() {
    document.getElementById('cart-count').innerText = cartCount;
    const cartItemsList = document.getElementById('cart-items');
    cartItemsList.innerHTML = '';
    for (let product in cartItems) {
        if (cartItems[product] > 0) {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item';
            listItem.innerText = `${product} - Cantidad: ${cartItems[product]}`;
            cartItemsList.appendChild(listItem);
        }
    }
    if (cartCount === 0) {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.innerText = 'Tu carrito está vacío';
        cartItemsList.appendChild(listItem);
    }
}
