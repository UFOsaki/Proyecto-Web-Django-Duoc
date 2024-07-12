document.addEventListener('DOMContentLoaded', function() {
    // Crear el botón del carrito
    const cartButton = document.createElement('a');
    cartButton.href = '#';
    cartButton.className = 'btn btn-outline-light me-3 d-none d-lg-inline';
    cartButton.role = 'button';
    cartButton.id = 'cart-button';
    cartButton.innerHTML = '<i class="fas fa-shopping-cart"></i> Carrito';
    const navbarContainer = document.querySelector('.navbar .container-fluid');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    // Si el usuario está logueado, agregar el botón del carrito a la barra de navegación
    if (isLoggedIn) {
        navbarContainer.appendChild(cartButton);
    }

    const cartItemsContainer = document.getElementById('cart-items'); // Contenedor de los items del carrito
    const cartTotalElement = document.getElementById('cart-total'); // Elemento del total del carrito

    // Función para cargar el carrito desde el localStorage
    function loadCart() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartItemsContainer.innerHTML = '';
        let total = 0;

        // Para cada item en el carrito, crear un elemento de lista
        cart.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
            listItem.innerHTML = `
                ${item.title} - $${item.price} x ${item.quantity}
                <div>
                    <button class="btn btn-sm btn-success add-item" data-index="${index}">+</button>
                    <span class="mx-2">${item.quantity}</span>
                    <button class="btn btn-sm btn-danger remove-item" data-index="${index}">-</button>
                </div>
            `;
            total += item.price * item.quantity;
            cartItemsContainer.appendChild(listItem);
        });

        cartTotalElement.textContent = total; // Actualizar el total del carrito
    }

    // Función para agregar un manga al carrito
    function addToCart(manga) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItemIndex = cart.findIndex(item => item.title === manga.title);
        
        if (existingItemIndex !== -1) {
            cart[existingItemIndex].quantity += 1;
        } else {
            manga.quantity = 1;
            cart.push(manga);
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCart();
    }

    // Función para remover un manga del carrito
    function removeFromCart(index) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
        } else {
            cart.splice(index, 1);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        loadCart();
    }

    // Evento para mostrar el carrito al hacer click en el botón del carrito
    cartButton.addEventListener('click', function() {
        const cartOffcanvas = new bootstrap.Offcanvas(document.getElementById('cartOffcanvas'));
        cartOffcanvas.show();
        loadCart();
    });

    // Evento para manejar la adición y remoción de items del carrito
    cartItemsContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-item')) {
            const index = e.target.getAttribute('data-index');
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart[index].quantity += 1;
            localStorage.setItem('cart', JSON.stringify(cart));
            loadCart();
        }

        if (e.target.classList.contains('remove-item')) {
            const index = e.target.getAttribute('data-index');
            removeFromCart(index);
        }
    });

    // Evento para agregar un manga al carrito al hacer click en el botón "Agregar al carrito"
    document.getElementById('add-to-cart-button').addEventListener('click', function() {
        const mangaId = this.getAttribute('data-id');
        fetch(`https://api-rest-manga.onrender.com/images/${mangaId}`)
            .then(response => response.json())
            .then(manga => {
                const mangaToAdd = {
                    title: manga.title,
                    price: Math.floor(Math.random() * (35000 - 2000 + 1)) + 2000
                };
                addToCart(mangaToAdd);
                const detailsModal = bootstrap.Modal.getInstance(document.getElementById('detailsModal'));
                detailsModal.hide();
            })
            .catch(error => console.error('Error adding manga to cart:', error));
    });

    // Evento para realizar la compra al hacer click en el botón "Comprar"
    document.getElementById('checkout-button').addEventListener('click', function() {
        alert('Compra realizada con éxito');
        localStorage.removeItem('cart');
        loadCart();
    });

    loadCart(); // Cargar el carrito al cargar la página
});
