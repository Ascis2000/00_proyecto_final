
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
const createProfesional = `
    INSERT INTO profesionales (ciudad, zip, ambito_laboral, especialidad)
    VALUES ($1, $2, $3, $4) 
    RETURNING profesional_id, ciudad, zip, ambito_laboral, especialidad;
`;

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
