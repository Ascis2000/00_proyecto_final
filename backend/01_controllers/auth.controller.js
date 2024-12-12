const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const authModel = require('../02_models_SQL/auth.model');
const { createToken } = require('../05_config/jsonWebToken');

// const login = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await authModel.login(email, password);

//         if (user) {
//             const token = createToken(user);

//             // Configurar las opciones de la cookie dependiendo del entorno
//             const cookieOptions = {
//                 httpOnly: true, // Mejor mantener esto como true para evitar accesos de JavaScript
//                 sameSite: 'None', // Necesario para solicitudes cross-origin
//                 secure: true, // Solo usar secure en producción
//                 path: '/', // Ruta para la cookie
//             };

//             res.cookie('token', token, cookieOptions)
//                 .status(200)
//                 .json({ success: true, ...user });
//         } else {
//             res.status(400).json({ success: false, msg: "Credenciales incorrectas" });
//         }
//     } catch (error) {
//         res.status(500).json({ success: false, msg: error.message });
//     }
// };


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await authModel.login(email, password);

        if (user) {
            const token = createToken(user);

            const cookieOptions = {
                httpOnly: false, // Permite acceder desde JS
                sameSite: 'None', // Cambiar a None para solicitudes cross-origin
                secure: true, // Necesario si usas HTTPS
                path: '/', // Ruta para la cookie
            };

            res.cookie('token', token, cookieOptions)
                .status(200)
                .json({ success: true, ...user });
        } else {
            res.status(400).json({ success: false, msg: "Credenciales incorrectas" });
        }
    } catch (error) {
        res.status(500).json({ success: false, msg: error.message });
    }
};



function logout(req, res) {
    console.log('hola')

    res.clearCookie('token', {
        httpOnly: false,   // Mismo valor que en el login
        sameSite: 'strict', // Mismo valor que en el login
        path: '/',         // Mismo valor que en el login
    });
    res.status(200).json({ success: true, msg: 'Logout exitoso' });
}


const mostrarUser = async (req, res) => {
    try {

        const token = req.cookies.token;

        if (!token) {

        }

        // Decodifica el token (asegúrate de tener la misma clave secreta con la que se generó el token)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Extrae el id del token
        const userId = decoded.id;

        const misAds = await adService.getAllAds();

        res.render('userDashboard', {
            role: 'user',
            userid: userId,
            ads: misAds
        });

    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

const mostrarAdmin = async (req, res) => {
    try {

        const misAds = await adService.getAllAds();

        res.render('adminDashboard', {
            role: 'admin',
            ads: misAds
        });

    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

module.exports = { login, mostrarUser, mostrarAdmin, logout };
