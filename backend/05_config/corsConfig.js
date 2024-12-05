
const corsOptions = {
    origin: process.env.NODE_ENV === 'production' ? 'https://00proyectofinalfrontend.netlify.app/' : 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true
};

module.exports = corsOptions;