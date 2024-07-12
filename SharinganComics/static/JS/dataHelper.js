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
    const countryOptions = data.countries.map(country => ({ name: country.name, code: country.code }));
    populateSelect("country", countryOptions);
};

// Función para rellenar el campo select de regiones basado en el país seleccionado
export const populateRegions = (countryCode) => {
    const country = data.countries.find(c => c.code === countryCode);
    if (country) {
        const regionOptions = country.regions.map(region => ({ name: region.name, code: region.code }));
        populateSelect("region", regionOptions);
    }
};

// Función para rellenar el campo select de ciudades basado en la región seleccionada
export const populateCities = (countryCode, regionCode) => {
    const country = data.countries.find(c => c.code === countryCode);
    if (country) {
        const region = country.regions.find(r => r.code === regionCode);
        if (region) {
            const cityOptions = region.cities.map(city => ({ name: city.name, code: city.code }));
            populateSelect("city", cityOptions);
        }
    }
};

// Función para rellenar el campo select de comunas basado en la ciudad seleccionada
export const populateCommunes = (countryCode, regionCode, cityCode) => {
    const country = data.countries.find(c => c.code === countryCode);
    if (country) {
        const region = country.regions.find(r => r.code === regionCode);
        if (region) {
            const city = region.cities.find(c => c.code === cityCode);
            if (city) {
                populateSelect("commune", city.communes, false);
            }
        }
    }
};

// Al cargar el DOM, rellena los campos select correspondientes
document.addEventListener("DOMContentLoaded", () => {
    populateRegionCodes();
    populateCountryData();
});
