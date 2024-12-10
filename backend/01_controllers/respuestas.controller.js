// importamos el modelo de preguntas
const respuestasModel = require('../02_models_SQL/respuestas.model');

// GET
// obtener todos las preguntas
const getAllRespuestas = async (req, res) => {
    try {
        const respuestas = await respuestasModel.getAllRespuestas();
        res.status(200).json(respuestas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las preguntas', error });
    }
};

// GET
// obtener un preguntas por id
const getPreguntaById = async (req, res) => {
    const { id } = req.params;

    try {
        const pregunta = await respuestasModel.getPreguntaById(id);
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
        const pregunta = await respuestasModel.getPreguntaRespuestasById(id);
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
        const newPregunta = await respuestasModel.createPregunta(pregunta, rol);
        res.status(201).json(newPregunta);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la pregunta', error });
    }
};

// PUT
// actualizar un pregunta
const actualizarRespuesta = async (req, res) => {
    const { respuesta_id } = req.params; // ID de la respuesta desde la URL
    const { respuesta } = req.body; // Nueva respuesta desde el cuerpo de la solicitud

    // Validar entrada
    if (!respuesta) {
        return res.status(400).json({ error: 'El campo "respuesta" es obligatorio.' });
    }

    try {
        // Llama al modelo para actualizar la respuesta
        const respuestaActualizada = await respuestasModel.actualizarRespuestaPorId(respuesta_id, respuesta);

        // Si no se encuentra la respuesta
        if (!respuestaActualizada) {
            return res.status(404).json({ error: 'No se encontró la respuesta con el ID proporcionado.' });
        }

        res.json({ message: 'Respuesta actualizada con éxito.', respuesta: respuestaActualizada });
    } catch (error) {
        console.error('Error al actualizar la respuesta:', error);
        res.status(500).json({ error: 'Error al actualizar la respuesta.' });
    }
};

// DELETE
// eliminar una pregunta
const deletePregunta = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedPregunta = await respuestasModel.deletePregunta(id);
        if (!deletedPregunta) {
            return res.status(404).json({ message: 'pregunta no encontrada' });
        }
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la pregunta', error });
    }
};

const getPreguntas = async (req, res) => {
    try {
        const preguntas = await respuestasModel.getPreguntasConRespuestas();
        res.json(preguntas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las preguntas y respuestas.' });
    }
};

module.exports = {
    getAllRespuestas,
    getPreguntaById,
    getPreguntaRespuestasById,
    createPregunta,
    actualizarRespuesta,
    deletePregunta,
    getPreguntas
};

