
// obtenemos todos las preguntas
const getAllRespuestas = `
    SELECT * FROM respuestas
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
        r.rol

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
    getAllRespuestas,
    getPreguntaById,
    getPreguntaRespuestasById,
    createPregunta,
    updatePregunta,
    deletePregunta
};
