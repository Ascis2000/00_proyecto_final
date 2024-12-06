
const express = require('express');
const router = express.Router();

// importamos el controlador de usuarios
const usersController = require('../01_controllers/users.controller');

const authMiddleware = require('../middlewares/authMiddleware');
const authorizeRole = require('../middlewares/roleMiddleware');

/* router.get('/user/dashboard', authMiddleware, authorizeRole('user'), mostrarUser);
router.get('/admin/dashboard', authMiddleware, authorizeRole('admin'), mostrarAdmin); */

// definimos las rutas para los usuarios
// Ejemplo: http://localhost:3000/api/users/
router.get('/', usersController.getAllUsers); 

// Ejemplo: http://localhost:3000/api/users/1
router.get('/:id', usersController.getUserById); 

// Ejemplo: http://localhost:3000/api/users/create
router.post('/create', usersController.createUser);

router.put('/:id', usersController.updateUser); 

// Ejemplo: http://localhost:3000/api/users/delete/1
router.delete('/delete/:id', usersController.deleteUser);

module.exports = router;
