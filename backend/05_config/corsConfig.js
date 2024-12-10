const allowedOrigins = [
    'http://localhost:5173', // Desarrollo
    'https://00proyectofinalfrontend1.netlify.app', // Producción en Netlify
    'https://zero0-proyecto-final-frontend.onrender.com' // Producción en Render
];

const corsOptions = {
    origin: (origin, callback) => {
        // Verifica si el origen es uno de los permitidos
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true); // Origen permitido
        } else {
            callback(new Error('Not allowed by CORS')); // Origen denegado
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'], // Asegúrate de permitir 'Cookie'
    credentials: true, // Esto es necesario para permitir el envío de cookies
};

module.exports = corsOptions;
