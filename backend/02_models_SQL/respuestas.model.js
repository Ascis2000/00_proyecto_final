
// importamos la configuración de la base de datos y las consultas
const db = require('../05_config/db.config');
const queries = require('../04_queries/respuestas.queries');

// obtener todas las preguntas
exports.getAllRespuestas = async () => {
    try {
        const { rows } = await db.query(queries.getAllRespuestas);
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
exports.actualizarRespuestaPorId = async (respuesta_id, respuesta) => {
    const query = `UPDATE respuestas SET respuesta = $1 WHERE respuesta_id = $2 RETURNING *`
    try {
        const result = await db.query(query,[respuesta, respuesta_id]);
        return result.rows[0]; // Retorna la fila actualizada
    } catch (error) {
        console.error('Error en la consulta SQL:', error);
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

exports.getPreguntasConRespuestas = async () => {
    const query = `
      SELECT 
        p."pregunta_id",
        p."pregunta",
        r."respuesta_id",
        r."respuesta",
        r."rol"
      FROM "preguntas" p
      LEFT JOIN "preguntas_respuestas" pr ON p."pregunta_id" = pr."pregunta_id"
      LEFT JOIN "respuestas" r ON pr."respuesta_id" = r."respuesta_id"
      ORDER BY p."pregunta_id", r."respuesta_id";
    `;

    try {
        // Realizamos la consulta SQL
        const result = await db.query(query);  // Aquí se obtiene el objeto con los resultados
        const rows = result.rows;  // Accedemos a 'rows' que contiene el array de resultados

        if (!Array.isArray(rows)) {
            throw new Error('La respuesta de la base de datos no es un array');
        }

        console.log(rows);  // Log para inspeccionar el contenido de 'rows'

        const preguntas = [];

        // Organizar las respuestas por cada pregunta
        rows.forEach(row => {
            let pregunta = preguntas.find(p => p.pregunta_id === row.pregunta_id);

            if (!pregunta) {
                pregunta = {
                    pregunta_id: row.pregunta_id,
                    pregunta: row.pregunta,
                    usuario: row.usuario,
                    respuestas: [],
                };
                preguntas.push(pregunta);
            }

            if (row.respuesta_id) {
                pregunta.respuestas.push({
                    respuesta_id: row.respuesta_id,
                    respuesta: row.respuesta,
                    rol: row.rol,
                });
            }
        });

        return preguntas;
    } catch (error) {
        console.error('Error al obtener preguntas y respuestas:', error);
        throw error;
    }
};
