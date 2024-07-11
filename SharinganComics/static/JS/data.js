// Definición de datos que se usarán en los formularios
export const data = {
    countries: [
        {
            name: "Chile",
            code: "CL",
            regions: [
                {
                    name: "Región Metropolitana",
                    code: "RM",
                    cities: [
                        {
                            name: "Santiago",
                            code: "SCL",
                            communes: ["Providencia", "Las Condes", "Vitacura"]
                        }
                    ]
                }
            ]
        }
    ]
};

// Códigos de región para el campo de selección
export const regionCodes = [
    { code: '+1', country: 'USA' },
    { code: '+44', country: 'UK' },
    { code: '+33', country: 'France' },
    // Agrega más códigos de región aquí
];
