
// Lista de orígenes permitidos (local y producción)
const allowedOrigins = [
    'http://localhost:5173', // Desarrollo en localhost
    'https://00proyectofinalfrontend1.netlify.app', // Producción en Netlify
    'https://zero0-proyecto-final-frontend.onrender.com' // Producción en Render
];

const corsOptions = {
    origin: (origin, callback) => {
        // Verifica si el origen de la solicitud está en la lista de orígenes permitidos
        // También permite solicitudes sin origen (por ejemplo, cuando usas curl o herramientas como Postman)
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true); // Origen permitido
        } else {
            callback(new Error('Not allowed by CORS')); // Origen denegado
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie', 'Accept'], // Encabezados permitidos
    credentials: true, // Permitir el envío de cookies
    preflightContinue: false, // No continuar con la solicitud preflight
    optionsSuccessStatus: 204, // Status 204 para respuestas exitosas de OPTIONS
};
