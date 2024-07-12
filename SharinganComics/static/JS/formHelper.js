import { validateFormStep } from './validation.js';

const steps = document.querySelectorAll(".step");
let currentStep = 0;

export const showStep = (stepIndex) => {
    steps.forEach((stepElement, index) => {
        stepElement.style.display = index === stepIndex ? "block" : "none";
    });
};

export const nextStep = () => {
    if (validateFormStep(steps[currentStep])) {
        currentStep++;
        if (currentStep >= steps.length) {
            currentStep = steps.length - 1;
        }
        showStep(currentStep);
    }
};

export const prevStep = () => {
    currentStep--;
    if (currentStep < 0) {
        currentStep = 0;
    }
    showStep(currentStep);
};

showStep(currentStep);
