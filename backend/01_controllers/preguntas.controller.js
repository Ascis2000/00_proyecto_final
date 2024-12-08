

// importamos el modelo de preguntas
const preguntasModel = require('../02_models_SQL/preguntas.model');

// GET
// obtener todos las preguntas
const getAllPreguntas = async (req, res) => {
    try {
        const preguntas = await preguntasModel.getAllPreguntas();
        res.status(200).json(preguntas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las preguntas', error });
    }
};

// GET
// obtener un preguntas por id
const getPreguntaById = async (req, res) => {
    const { id } = req.params;
    
    try {
        const pregunta = await preguntasModel.getPreguntaById(id);
        if (!pregunta) {
            return res.status(404).json({ message: 'pregunta no encontrada' });
        }
        res.status(200).json(pregunta);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la pregunta', error });
    }
};

// GET
// obtener una pregunta-respuestas por id
const getPreguntaRespuestasById = async (req, res) => {
    const { id } = req.params;
    
    try {
        const pregunta = await preguntasModel.getPreguntaRespuestasById(id);
        if (!pregunta) {
            return res.status(404).json({ message: 'pregunta no encontrada' });
        }
        res.status(200).json(pregunta);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la pregunta', error });
    }
};

// POST
// crear una nueva preguntas
const createPregunta = async (req, res) => {
    const { pregunta, rol } = req.body;

    try {
        const newPregunta = await preguntasModel.createPregunta(pregunta, rol);
        res.status(201).json(newPregunta);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la pregunta', error });
    }
};

// PUT
// actualizar un pregunta
const updatePregunta = async (req, res) => {
    const { id } = req.params;
    const { pais, zip } = req.body;

    try {
        const updatedPregunta = await preguntasModel.updatePregunta(pais, zip, id);
        if (!updatedPregunta) {
            return res.status(404).json({ message: 'pregunta no encontrada' });
        }
        res.status(200).json(updatedPregunta);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la pregunta', error });
    }
};

// DELETE
// eliminar una pregunta
const deletePregunta = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedPregunta = await preguntasModel.deletePregunta(id);
        if (!deletedPregunta) {
            return res.status(404).json({ message: 'pregunta no encontrada' });
        }
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la pregunta', error });
    }
};

module.exports = { 
    getAllPreguntas,
    getPreguntaById,
    getPreguntaRespuestasById,
    createPregunta, 
    updatePregunta, 
    deletePregunta
};

