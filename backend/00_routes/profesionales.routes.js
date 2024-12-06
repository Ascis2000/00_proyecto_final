
const express = require('express');
const router = express.Router();

// importamos el controlador de profesionales
const profesionalesController = require('../01_controllers/profesionales.controller');

const authMiddleware = require('../middlewares/authMiddleware');
const authorizeRole = require('../middlewares/roleMiddleware');

/* router.get('/user/dashboard', authMiddleware, authorizeRole('user'), mostrarUser);
router.get('/admin/dashboard', authMiddleware, authorizeRole('admin'), mostrarAdmin); */

// definimos las rutas para los usuarios
// Ejemplo: http://localhost:3000/api/profesionales/
router.get('/', profesionalesController.getAllProfesionales); 

// Ejemplo: http://localhost:3000/api/profesionales/1
router.get('/:id', profesionalesController.getProfesionalById); 

// Ejemplo: http://localhost:3000/api/profesionales/create
router.post('/create', profesionalesController.createProfesional);

router.put('/:id', profesionalesController.updateProfesional); 

// Ejemplo: http://localhost:3000/api/profesionales/delete/1
router.delete('/delete/:id', profesionalesController.deleteProfesional); 

module.exports = router;
