import { showStep, nextStep, prevStep } from './formHelper.js';
import { validateFormStep } from './validation.js';
import { populateRegionCodes, populateCountryData, populateRegions, populateCities, populateCommunes } from './dataHelper.js';

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("signup-form");
    const steps = document.querySelectorAll(".step");
    let currentStep = 0;

    const showStep = (stepIndex) => {
        steps.forEach((step, index) => {
            step.style.display = index === stepIndex ? "block" : "none";
        });
    };

    const nextStep = () => {
        if (validateFormStep(steps[currentStep])) {
            if (currentStep === 0) {
                // Verificar si el correo ya está en uso
                const emailInput = document.getElementById("email");
                const email = emailInput.value;
                fetch(`/usuario/verificar-email/?email=${encodeURIComponent(email)}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data.is_taken) {
                            emailInput.setCustomValidity("Este correo electrónico ya está en uso.");
                            emailInput.reportValidity();
                        } else {
                            emailInput.setCustomValidity(""); // Clear any previous custom validity
                            currentStep++;
                            if (currentStep >= steps.length) {
                                currentStep = steps.length - 1;
                            }
                            showStep(currentStep);
                        }
                    });
            } else {
                currentStep++;
                if (currentStep >= steps.length) {
                    currentStep = steps.length - 1;
                }
                showStep(currentStep);
            }
        }
    };

    const prevStep = () => {
        currentStep--;
        if (currentStep < 0) {
            currentStep = 0;
        }
        showStep(currentStep);
    };

    form.addEventListener("submit", (e) => {
        if (!validateFormStep(steps[currentStep])) {
            e.preventDefault();
        } else {
            // Redirigir después de enviar el formulario
            window.location.href = "{% url 'autenticacion_login' %}";
        }
    });

    document.getElementById("next-step-1").addEventListener("click", nextStep);
    document.getElementById("next-step-2").addEventListener("click", nextStep);
    document.getElementById("next-step-3").addEventListener("click", nextStep);
    document.getElementById("prev-step-2").addEventListener("click", prevStep);
    document.getElementById("prev-step-3").addEventListener("click", prevStep);
    document.getElementById("prev-step-4").addEventListener("click", prevStep);

    document.getElementById("country").addEventListener("change", function() {
        populateRegions(this.value);
    });

    document.getElementById("region").addEventListener("change", function() {
        const country = document.getElementById("country").value;
        populateCities(country, this.value);
    });

    document.getElementById("city").addEventListener("change", function() {
        const country = document.getElementById("country").value;
        const region = document.getElementById("region").value;
        populateCommunes(country, region, this.value);
    });

    populateRegionCodes();
    populateCountryData();

    showStep(currentStep);
});

export const finalizeRegistration = () => {
    const form = document.getElementById("signup-form");
    if (validateFormStep(steps[currentStep])) {
        form.submit();
        window.location.href = "{% url 'autenticacion_login' %}";
    }
};
