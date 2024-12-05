
const allowedOrigins = [
    'http://localhost:5173', // Desarrollo
    'https://00proyectofinalfrontend1.netlify.app', // Producción en Netlify
    'https://zero0-proyecto-final-frontend.onrender.com' // Producción en Render
];

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true); // Origen permitido
        } else {
            callback(new Error('Not allowed by CORS')); // Origen denegado
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true
};

module.exports = corsOptions;