import { data, regionCodes } from './data.js';

// Función para rellenar un campo select con opciones
const populateSelect = (id, options, includeBlank = true) => {
    const select = document.getElementById(id);
    select.innerHTML = "";
    if (includeBlank) {
        const blankOption = document.createElement("option");
        blankOption.value = "";
        blankOption.textContent = "Seleccionar";
        select.appendChild(blankOption);
    }
    options.forEach(option => {
        const opt = document.createElement("option");
        if (typeof option === 'object' && option.name && option.code) {
            opt.value = option.code;
            opt.textContent = `${option.name} (${option.code})`;
        } else if (typeof option === 'object' && option.name) {
            opt.value = option.name;
            opt.textContent = option.name;
        } else if (typeof option === 'object') {
            opt.value = option.code;
            opt.textContent = option.code;
        } else {
            opt.value = option;
            opt.textContent = option;
        }
        select.appendChild(opt);
    });
};

// Función para rellenar el campo select de códigos de región
export const populateRegionCodes = () => {
    populateSelect("region-code", regionCodes, false);
};

// Función para rellenar el campo select de países
export const populateCountryData = () => {
    populateSelect("country", data.countries);
};

// Al cargar el DOM, rellena los campos select correspondientes
document.addEventListener("DOMContentLoaded", () => {
    populateRegionCodes();
    populateCountryData();
});

// Maneja el cambio en el select de países para actualizar las regiones
const handleCountryChange = () => {
    const countryCode = document.getElementById("country").value;
    const country = data.countries.find(c => c.code === countryCode);
    if (country) {
        populateSelect("region", country.regions);
        document.getElementById("region").disabled = false;
    } else {
        populateSelect("region", []);
        document.getElementById("region").disabled = true;
    }
    populateSelect("city", []);
    document.getElementById("city").disabled = true;
    populateSelect("commune", []);
    document.getElementById("commune").disabled = true;
};

// Maneja el cambio en el select de regiones para actualizar las ciudades
const handleRegionChange = () => {
    const countryCode = document.getElementById("country").value;
    const regionCode = document.getElementById("region").value;
    const country = data.countries.find(c => c.code === countryCode);
    const region = country ? country.regions.find(r => r.code === regionCode) : null;
    if (region) {
        populateSelect("city", region.cities);
        document.getElementById("city").disabled = false;
    } else {
        populateSelect("city", []);
        document.getElementById("city").disabled = true;
    }
    populateSelect("commune", []);
    document.getElementById("commune").disabled = true;
};

// Maneja el cambio en el select de ciudades para actualizar las comunas
const handleCityChange = () => {
    const countryCode = document.getElementById("country").value;
    const regionCode = document.getElementById("region").value;
    const cityCode = document.getElementById("city").value;
    const country = data.countries.find(c => c.code === countryCode);
    const region = country ? country.regions.find(r => r.code === regionCode) : null;
    const city = region ? region.cities.find(c => c.code === cityCode) : null;
    if (city) {
        populateSelect("commune", city.communes.map(c => ({ name: c })));
        document.getElementById("commune").disabled = false;
    } else {
        populateSelect("commune", []);
        document.getElementById("commune").disabled = true;
    }
};

// Asigna eventos para manejar cambios en los selects
document.getElementById("country").addEventListener("change", handleCountryChange);
document.getElementById("region").addEventListener("change", handleRegionChange);
document.getElementById("city").addEventListener("change", handleCityChange);
