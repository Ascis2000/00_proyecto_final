
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');


const path = require('path');

const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');
// const corsOptions = require('./05_config/corsConfig'); 
// app.use(cors(corsOptions));
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

// Usar CORS en la aplicación
app.use(cors(corsOptions));

// Manejar solicitudes OPTIONS (preflight) con el mismo conjunto de opciones
app.options('*', cors(corsOptions)); // 

// Middleware para manejar formularios y datos JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());


// Configura los archivos estáticos (CSS y JavaScript del frontend)
app.use(express.static(path.join(__dirname, 'public')));

// importamos el archivo de todas las rutas principales
const apiRoutes = require('./00_routes/routes');
app.use('/api', apiRoutes); // apiRoutes

// Ejemplo de ruta
app.get('/', (req, res) => {
    res.json({ message: "iniciada APP Proyecto final" });
});

const manage404 = require('./middlewares/manage404');

// Para todo el resto de rutas no contempladas
app.use('*', manage404);

// Configura el puerto y ejecuta la aplicación
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Servidor escuchando en el puerto ${port}`);
});