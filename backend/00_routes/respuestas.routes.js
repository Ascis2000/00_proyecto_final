
const express = require('express');
const router = express.Router();

// importamos el controlador de preguntas
const respuestasController = require('../01_controllers/respuestas.controller');

// ruta por defecto
// Ejemplo: http://localhost:3000/api/preguntas/
router.get('/', (req, res) => {
    res.json({ message: "Preguntas iniciadas" });
});

// Ejemplo: http://localhost:3000/api/preguntas/all
router.get('/all', respuestasController.getAllRespuestas); 

router.get('/preguntasyrespuestas', respuestasController.getPreguntas); 

// Ejemplo: http://localhost:3000/api/preguntas/1
router.get('/:id', respuestasController.getPreguntaById); 

// Ejemplo: http://localhost:3000/api/preguntas/pr/1
router.get('/pr/:id', respuestasController.getPreguntaRespuestasById); 

// Ejemplo: http://localhost:3000/api/preguntas/create
router.post('/create', respuestasController.createPregunta);

// Ejemplo: http://localhost:3000/api/preguntas/1
router.put('/:respuesta_id', respuestasController.actualizarRespuesta); 

// Ejemplo: http://localhost:3000/api/preguntas/delete/1
router.delete('/delete/:id', respuestasController.deletePregunta); 

module.exports = router;
