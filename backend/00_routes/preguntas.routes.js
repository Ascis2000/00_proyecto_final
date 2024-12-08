
const express = require('express');
const router = express.Router();

// importamos el controlador de preguntas
const preguntasController = require('../01_controllers/preguntas.controller');

// ruta por defecto
// Ejemplo: http://localhost:3000/api/preguntas/
router.get('/', (req, res) => {
    res.json({ message: "Preguntas iniciadas" });
});

// Ejemplo: http://localhost:3000/api/preguntas/all
router.get('/all', preguntasController.getAllPreguntas); 

// Ejemplo: http://localhost:3000/api/preguntas/1
router.get('/:id', preguntasController.getPreguntaById); 

// Ejemplo: http://localhost:3000/api/preguntas/pr/1
router.get('/pr/:id', preguntasController.getPreguntaRespuestasById); 

// Ejemplo: http://localhost:3000/api/preguntas/create
router.post('/create', preguntasController.createPregunta);

// Ejemplo: http://localhost:3000/api/preguntas/1
router.put('/:id', preguntasController.updatePregunta); 

// Ejemplo: http://localhost:3000/api/preguntas/delete/1
router.delete('/delete/:id', preguntasController.deletePregunta); 

module.exports = router;
