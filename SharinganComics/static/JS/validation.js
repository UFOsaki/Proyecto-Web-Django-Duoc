// Validar el formato del correo electrónico
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar correos electrónicos
    return emailRegex.test(email); // Retorna true si el correo es válido, false si no lo es
};

// Validar que las contraseñas coincidan
export const validatePasswordsMatch = (password, confirmPassword) => {
    return password === confirmPassword; // Retorna true si las contraseñas coinciden, false si no
};

// Validar que un campo no esté vacío
export const validateNotEmpty = (value) => {
    return value.trim() !== ""; // Retorna true si el valor no está vacío después de quitar espacios en blanco
};

// Validar el formato del nombre
export const validateName = (name) => {
    const nameRegex = /^[a-zA-Z\s]+$/; // Expresión regular para validar nombres (solo letras y espacios)
    return nameRegex.test(name); // Retorna true si el nombre es válido, false si no lo es
};

// Validar el formato del teléfono
export const validatePhone = (phone) => {
    const phoneRegex = /^\d+$/; // Expresión regular para validar teléfonos (solo números)
    return phoneRegex.test(phone); // Retorna true si el teléfono es válido, false si no lo es
};

// Validación del formulario por paso
export const validateFormStep = (step) => {
    let valid = true; // Inicializa la variable valid en true
    const inputs = step.querySelectorAll("input, textarea, select"); // Selecciona todos los inputs, textareas y selects del paso actual

    // Itera sobre cada input en el paso actual
    inputs.forEach(input => {
        // Si el campo no es 'apartment-number' o 'comments' y está vacío, muestra un mensaje de error
        if (input.id !== 'apartment-number' && input.id !== 'comments' && !validateNotEmpty(input.value)) {
            input.setCustomValidity("Campo obligatorio."); // Establece un mensaje de validez
            input.reportValidity(); // Muestra el mensaje de validez
            valid = false; // Establece valid en false
        } else {
            input.setCustomValidity(""); // Limpia el mensaje de validez
        }
    });

    // Validaciones específicas para el paso 1
    if (step.id === "step-1") {
        const email = document.getElementById("email").value;
        if (!validateEmail(email)) { // Valida el correo electrónico
            document.getElementById("email").setCustomValidity("Por favor ingrese un correo válido.");
            document.getElementById("email").reportValidity();
            valid = false;
        }

        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;
        if (!validatePasswordsMatch(password, confirmPassword)) { // Valida que las contraseñas coincidan
            document.getElementById("confirm-password").setCustomValidity("Las contraseñas no coinciden.");
            document.getElementById("confirm-password").reportValidity();
            valid = false;
        }
    }

    // Validaciones específicas para el paso 2
    if (step.id === "step-2") {
        const name = document.getElementById("name").value;
        if (!validateName(name)) { // Valida el nombre
            document.getElementById("name").setCustomValidity("El nombre solo puede contener letras.");
            document.getElementById("name").reportValidity();
            valid = false;
        }

        const lastname = document.getElementById("lastname").value;
        if (!validateName(lastname)) { // Valida el apellido
            document.getElementById("lastname").setCustomValidity("El apellido solo puede contener letras.");
            document.getElementById("lastname").reportValidity();
            valid = false;
        }

        const phone = document.getElementById("phone").value;
        if (!validatePhone(phone)) { // Valida el teléfono
            document.getElementById("phone").setCustomValidity("El número de teléfono solo puede contener números.");
            document.getElementById("phone").reportValidity();
            valid = false;
        }
    }

    return valid; // Retorna true si todas las validaciones pasan, false si alguna falla
};
