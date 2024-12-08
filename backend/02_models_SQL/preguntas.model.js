
// importamos la configuración de la base de datos y las consultas
const db = require('../05_config/db.config');
const queries = require('../04_queries/preguntas.queries');

// obtener todas las preguntas
exports.getAllPreguntas = async () => {
    try {
        const { rows } = await db.query(queries.getAllPreguntas);
        return rows;
    } catch (error) {
        throw error;
    }
};

// obtener una pregunta por id
exports.getPreguntaById = async (id) => {
    try {
        const { rows } = await db.query(queries.getPreguntaById, [id]);
        return rows[0]; 
    } catch (error) {
        throw error;
    }
};

// obtener una pregunta por id
exports.getPreguntaRespuestasById = async (id) => {
    try {
        const { rows } = await db.query(queries.getPreguntaRespuestasById, [id]);
        return rows; 
    } catch (error) {
        throw error;
    }
};

// crear una nueva pregunta
exports.createPregunta = async (pregunta, rol) => {

    const values = [
        pregunta, 
        rol
    ];
    
    try {
        const result = await db.query(queries.createPregunta, values);
        console.log(result);
        return result.rows[0];
    } catch (error) {
        console.error('Error al crear la pregunta:', error);
        throw error;
    }
};

// actualizar una pregunta
exports.updatePregunta = async (pregunta, rol) => {
    try {
        const { rows } = await db.query(queries.updatePregunta, [pregunta, rol]);
        return rows[0]; 
    } catch (error) {
        throw error;
    }
};

// eliminar una pregunta
exports.deletePregunta = async (id) => {
    try {
        const { rows } = await db.query(queries.deletePregunta, [id]);
        return rows[0]; 
    } catch (error) {
        throw error;
    }
};
