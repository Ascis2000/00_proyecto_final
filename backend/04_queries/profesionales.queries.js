
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
`WITH
selected_ambito AS (
    -- Selecciona el ambito_id existente o inserta uno nuevo si no existe
    SELECT ambito_id
    FROM ambitos
    WHERE ambito = $3
    UNION ALL
    SELECT ambito_id
    FROM ambitos
    WHERE ambito = $3
    LIMIT 1 -- Solo selecciona un resultado
),
selected_especialidad AS (
    -- Selecciona el especialidad_id existente o inserta uno nuevo si no existe
    SELECT especialidad_id
    FROM especialidades
    WHERE especialidad = $4 AND ambito_id = (SELECT ambito_id FROM selected_ambito LIMIT 1)
    UNION ALL
    SELECT especialidad_id
    FROM especialidades
    WHERE especialidad = $4 AND ambito_id = (SELECT ambito_id FROM selected_ambito LIMIT 1)
    LIMIT 1 -- Solo selecciona un resultado
)
INSERT INTO profesionales (provincia, cod_postal, especialidad_id)
VALUES (
    $1,
    $2,
    (SELECT especialidad_id FROM selected_especialidad LIMIT 1)  -- Solo toma un ID
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
