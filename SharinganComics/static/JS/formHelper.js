import { validateFormStep } from './validation.js';

const steps = document.querySelectorAll(".step");
let currentStep = 0;
let currentUserData = {};

// Función para obtener datos del servidor
const fetchUsersData = () => {
    fetch('/usuario/get_users/')
        .then(response => response.json())
        .then(data => {
            // Aquí se puede manejar los datos si es necesario
        })
        .catch(error => {
            console.error('Error fetching users data:', error);
        });
};

// Inicializa la obtención de datos cuando el contenido del DOM se ha cargado
document.addEventListener('DOMContentLoaded', fetchUsersData);

// Muestra el paso actual del formulario
export const showStep = (step) => {
    steps.forEach((stepElement, index) => {
        stepElement.style.display = index === step ? "block" : "none";
    });
};

// Avanza al siguiente paso si la validación pasa
export const nextStep = () => {
    if (validateFormStep(steps[currentStep])) {
        saveStepData(currentStep);
        currentStep++;
        if (currentStep >= steps.length) {
            currentStep = steps.length - 1;
        }
        showStep(currentStep);
    }
};

// Retrocede al paso anterior
export const prevStep = () => {
    currentStep--;
    if (currentStep < 0) {
        currentStep = 0;
    }
    showStep(currentStep);
};

// Guarda los datos del formulario para el paso actual
const saveStepData = (step) => {
    const emailEl = document.getElementById("email");
    const passwordEl = document.getElementById("password");
    const usernameEl = document.getElementById("username");
    const nameEl = document.getElementById("name");
    const lastnameEl = document.getElementById("lastname");
    const phoneEl = document.getElementById("phone");
    const regionCodeEl = document.getElementById("region-code");
    const countryEl = document.getElementById("country");
    const regionEl = document.getElementById("region");
    const cityEl = document.getElementById("city");
    const communeEl = document.getElementById("commune");
    const streetEl = document.getElementById("street");
    const streetNumberEl = document.getElementById("street-number");
    const apartmentNumberEl = document.getElementById("apartment-number");
    const commentsEl = document.getElementById("comments");

    if (step === 0) {
        currentUserData.email = emailEl.value;
        currentUserData.password = passwordEl.value;
    }
    if (step === 1) {
        currentUserData.username = usernameEl.value;
        currentUserData.name = nameEl.value;
        currentUserData.lastname = lastnameEl.value;
        currentUserData.phone = phoneEl.value;
        currentUserData.regionCode = regionCodeEl.value;
    }
    if (step === 2) {
        currentUserData.country = countryEl.value;
        currentUserData.region = regionEl.value;
        currentUserData.city = cityEl.value;
        currentUserData.commune = communeEl.value;
    }
    if (step === 3) {
        currentUserData.street = streetEl.value;
        currentUserData.streetNumber = streetNumberEl.value;
        currentUserData.apartmentNumber = apartmentNumberEl.value || '';
        currentUserData.comments = commentsEl.value || '';
    }
    console.log(currentUserData);
};

// Finaliza el registro enviando los datos al servidor
export const finalizeRegistration = () => {
    if (validateFormStep(steps[currentStep])) {
        saveStepData(currentStep);
        fetch('/usuario/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCSRFToken(),
            },
            body: JSON.stringify(currentUserData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                alert("Registro completado");
                window.location.href = '/usuario/login/';
            } else {
                console.log(data.errors);
                alert("Error al registrar: " + JSON.stringify(data.errors));
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Error al registrar: " + error.message);
        });
    }
};

// Obtiene el token CSRF del formulario
const getCSRFToken = () => {
    return document.querySelector('[name=csrfmiddlewaretoken]').value;
};

// Muestra el paso inicial del formulario
showStep(currentStep);
