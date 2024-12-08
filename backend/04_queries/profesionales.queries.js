
// obtenemos todos los profesionales
const getAllProfesionales = `
    SELECT * FROM profesionales
    ORDER BY profesional_id ASC;
`;

// obtenemos un profesional por id
const getProfesionalById = `
    SELECT * FROM profesionales WHERE profesional_id = $1;
`;
// creamos un nuevo profesional
// const createProfesional = `
//     INSERT INTO profesionales (ciudad, zip, ambito_laboral, especialidad)
//     VALUES ($1, $2, $3, $4) 
//     RETURNING profesional_id, ciudad, zip, ambito_laboral, especialidad;
// `;
const createProfesional = 
// `WITH
// selected_ambito AS (
//     -- Selecciona el ambito_id existente o inserta uno nuevo si no existe
//     SELECT ambito_id
//     FROM ambitos
//     WHERE ambito = $3
//     UNION ALL
//     SELECT ambito_id
//     FROM ambitos
//     WHERE ambito = $3
//     LIMIT 1 -- Solo selecciona un resultado
// ),
// selected_especialidad AS (
//     -- Selecciona el especialidad_id existente o inserta uno nuevo si no existe
//     SELECT especialidad_id
//     FROM especialidades
//     WHERE especialidad = $4 AND ambito_id = (SELECT ambito_id FROM selected_ambito LIMIT 1)
//     UNION ALL
//     SELECT especialidad_id
//     FROM especialidades
//     WHERE especialidad = $4 AND ambito_id = (SELECT ambito_id FROM selected_ambito LIMIT 1)
//     LIMIT 1 -- Solo selecciona un resultado
// )
// INSERT INTO profesionales (provincia, cod_postal, especialidad_id)
// VALUES (
//     $1,
//     $2,
//     (SELECT especialidad_id FROM selected_especialidad LIMIT 1)  -- Solo toma un ID
// )
// RETURNING profesional_id;

// `
`WITH 
-- Si no existe el ambito, lo inserta y devuelve el ambito_id
selected_ambito AS (
    INSERT INTO ambitos (ambito)
    SELECT $3
    WHERE NOT EXISTS (SELECT 1 FROM ambitos WHERE ambito = $3)
    RETURNING ambito_id
),
-- Recupera el ambito_id (puede venir de la inserción anterior o de una selección)
ambito_id AS (
    SELECT ambito_id FROM selected_ambito
    UNION ALL
    SELECT ambito_id FROM ambitos WHERE ambito = $3 LIMIT 1
),
-- Si no existe la especialidad para este ambito, lo inserta y devuelve el especialidad_id
selected_especialidad AS (
    INSERT INTO especialidades (especialidad, ambito_id)
    SELECT $4, (SELECT ambito_id FROM ambito_id LIMIT 1)
    WHERE NOT EXISTS (
        SELECT 1 
        FROM especialidades 
        WHERE especialidad = $4 
        AND ambito_id = (SELECT ambito_id FROM ambito_id LIMIT 1)
    )
    RETURNING especialidad_id
),
-- Recupera el especialidad_id de la inserción o selección anterior
especialidad_id AS (
    SELECT especialidad_id FROM selected_especialidad
    UNION ALL
    SELECT especialidad_id FROM especialidades 
    WHERE especialidad = $4 
    AND ambito_id = (SELECT ambito_id FROM ambito_id LIMIT 1)
    LIMIT 1
)
-- Inserta el profesional con el especialidad_id obtenido
INSERT INTO profesionales (provincia, cod_postal, especialidad_id)
VALUES (
    $1, 
    $2, 
    (SELECT especialidad_id FROM especialidad_id LIMIT 1)
)
RETURNING profesional_id;
`

// actualizar un profesional
const updateProfesional = `
    UPDATE profesionales SET ciudad = $1, zip = $2 WHERE profesional_id = $3 RETURNING *;
`;

// eliminar un profesional
const deleteProfesional = `
    DELETE FROM profesionales WHERE profesional_id = $1 RETURNING *;
`;

module.exports = {
    getAllProfesionales,
    getProfesionalById,
    createProfesional,
    updateProfesional,
    deleteProfesional
};
