// Función para verificar el estado de la sesión y actualizar la UI
const checkSession = () => {
    fetch('/check_session/')
        .then(response => response.json())
        .then(data => {
            const navbarContainer = document.querySelector('.navbar .container-fluid');

            // Limpiar cualquier enlace existente en la barra de navegación
            const existingButtons = document.querySelectorAll('#login-button, #signup-button, #profile-link');
            existingButtons.forEach(button => button.remove());

            if (data.is_logged_in) {
                console.log('Usuario logueado');
                const profileLink = document.createElement('a');
                profileLink.href = 'profile/'; // Ruta de Django para el perfil
                profileLink.className = 'btn btn-outline-light me-3 d-none d-lg-inline';
                profileLink.role = 'button';
                profileLink.textContent = 'Profile';
                profileLink.id = 'profile-link';

                navbarContainer.appendChild(profileLink);

                // Añadir enlace de perfil en dispositivos móviles
                const mobileProfileLink = document.createElement('li');
                mobileProfileLink.className = 'nav-item d-lg-none';
                mobileProfileLink.innerHTML = '<a class="nav-link" href="profile/">Profile</a>'; // Ruta de Django para el perfil
                const mobileNav = document.querySelector('ul.navbar-nav.d-lg-none');
                mobileNav.appendChild(mobileProfileLink);
            } else {
                console.log('Usuario no logueado');
                const loginButton = document.createElement('a');
                loginButton.href = '/autenticacion/login/'; // Ruta de Django para el login
                loginButton.className = 'btn btn-outline-light me-3 d-none d-lg-inline';
                loginButton.role = 'button';
                loginButton.textContent = 'Login';
                loginButton.id = 'login-button';

                const signupButton = document.createElement('a');
                signupButton.href = '/usuario/register/'; // Ruta de Django para el registro
                signupButton.className = 'btn btn-outline-light me-3 d-none d-lg-inline';
                signupButton.role = 'button';
                signupButton.textContent = 'Sign Up';
                signupButton.id = 'signup-button';

                navbarContainer.appendChild(loginButton);
                navbarContainer.appendChild(signupButton);

                // Añadir enlaces de login y signup en dispositivos móviles
                const mobileLoginLink = document.createElement('li');
                mobileLoginLink.className = 'nav-item d-lg-none';
                mobileLoginLink.innerHTML = '<a class="nav-link" href="/usuario/login/">Login</a>'; // Ruta de Django para el login
                
                const mobileSignupLink = document.createElement('li');
                mobileSignupLink.className = 'nav-item d-lg-none';
                mobileSignupLink.innerHTML = '<a class="nav-link" href="/usuario/register/">Sign Up</a>'; // Ruta de Django para el registro

                const mobileNav = document.querySelector('ul.navbar-nav.d-lg-none');
                mobileNav.appendChild(mobileLoginLink);
                mobileNav.appendChild(mobileSignupLink);
            }
        })
        .catch(error => console.error('Error:', error));
};

// Ejecutar la función al cargar el DOM
document.addEventListener('DOMContentLoaded', checkSession);
