
// obtenemos todos las preguntas
const getAllPreguntas = `
    SELECT * FROM preguntas
    ORDER BY pregunta_id ASC;
`;

// obtenemos una pregunta y sus respuestas por id
const getPreguntaById = `
    SELECT *
    FROM preguntas
    WHERE pregunta_id = $1
`;

// obtenemos una pregunta y sus respuestas por id
const getPreguntaRespuestasById = `
    SELECT 
        p.pregunta AS pregunta,
        r.respuesta_id,
        r.respuesta,
        r.rol,
        r.fin

    FROM public.preguntas_respuestas pr
        JOIN public.respuestas r
        ON pr.respuesta_id = r.respuesta_id
            JOIN public.preguntas p
            ON pr.pregunta_id = p.pregunta_id
    WHERE pr.pregunta_id = $1
    ORDER BY r.respuesta_id ASC;
`;

// crear una pregunta
const createPregunta = `
`

// actualizar una pregunta
const updatePregunta = `
`;

// eliminar una pregunta
const deletePregunta = `
`;

module.exports = {
    getAllPreguntas,
    getPreguntaById,
    getPreguntaRespuestasById,
    createPregunta,
    updatePregunta,
    deletePregunta
};
