
const express = require('express');
const router = express.Router();

// importamos el controlador de autenticacion
const authController = require('../01_controllers/auth.controller');

// definimos las rutas para las autenticaciones
router.get('/login', authController.login);         // GET /login
router.post('/login', authController.login);        // POST 
router.get('/logout', authController.logout);       // PUT /users/:id

module.exports = router;