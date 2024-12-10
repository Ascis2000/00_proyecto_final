
const express = require('express');
const router = express.Router();

// AUTH
const authRoutes = require('./auth.routes');
router.use('/auth', authRoutes); 

// USUARIOS
const usersRoutes = require('./users.routes');
router.use('/users', usersRoutes);

// PROFESIONALES
const profesionalesRoutes = require('./profesionales.routes');
router.use('/profesionales', profesionalesRoutes);

// PREGUNTAS
const preguntasRoutes = require('./preguntas.routes');
router.use('/preguntas', preguntasRoutes);

// PREGUNTAS
const respuestasRoutes = require('./respuestas.routes');
router.use('/respuestas', respuestasRoutes);

module.exports = router;