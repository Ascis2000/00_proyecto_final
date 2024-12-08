
// importamos la configuración de la base de datos y las consultas
const db = require('../05_config/db.config');
const queries = require('../04_queries/profesionales.queries');

// obtener todos los profesionales
exports.getAllProfesionales = async () => {
    try {
        const { rows } = await db.query(queries.getAllProfesionales);
        return rows;
    } catch (error) {
        throw error;
    }
};

// obtener un profesional por id
exports.getProfesionalById = async (id) => {
    try {
        const { rows } = await db.query(queries.getProfesionalById, [id]);
        return rows[0]; // Retorna el primer profesional encontrado
    } catch (error) {
        throw error;
    }
};

// crear un nuevo profesional
exports.createProfesional = async (provincia, cod_postal, ambito, especialidad) => {
    // Los valores se toman directamente de los parámetros
    const values = [
        provincia, 
        cod_postal, 
        ambito,
        especialidad
    ];
    
    try {
        const result = await db.query(queries.createProfesional, values);
        console.log(result);
        return result.rows[0];
    } catch (error) {
        console.error('Error al crear profesional:', error);
        throw error;
    }
};

// actualizar un profesional
exports.updateProfesional = async (ciudad, zip, id) => {
    try {
        const { rows } = await db.query(queries.updateProfesional, [ciudad, zip, id]);
        return rows[0]; // Retorna el profesional actualizado
    } catch (error) {
        throw error;
    }
};

// eliminar un profesional
exports.deleteProfesional = async (id) => {
    try {
        const { rows } = await db.query(queries.deleteProfesional, [id]);
        return rows[0]; // Retorna el profesional eliminado
    } catch (error) {
        throw error;
    }
};
