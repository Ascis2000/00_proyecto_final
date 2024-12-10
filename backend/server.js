
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');


const path = require('path');

const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');
const corsOptions = require('./05_config/corsConfig'); 
app.use(cors(corsOptions));

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