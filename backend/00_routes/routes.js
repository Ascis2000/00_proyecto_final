
const express = require('express');
const router = express.Router();

// AUTH
const authRoutes = require('./auth.routes');
router.use('/auth', authRoutes); 

// USUARIOS
const usersRoutes = require('./users.routes');
router.use('/users', usersRoutes);

module.exports = router;