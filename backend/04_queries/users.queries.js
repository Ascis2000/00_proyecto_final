
// obtenemos todos los usuarios
const getAllUsers = `
    SELECT * FROM usuarios
    ORDER BY usuario_id ASC;
`;

// obtenemos un usuario por id
const getUserById = `
    SELECT * FROM usuarios WHERE usuario_id = $1;
`;

const findUserByUsername = `
    SELECT id_user, nombre, email, password, role 
    FROM users 
    WHERE nombre = $1
`;

const getUserByEmail = `
    SELECT id_user, nombre, email, password, role 
    FROM users
    WHERE email=$1;
`;

// creamos un nuevo usuario
const createUser = `
    INSERT INTO usuarios (pais, genero, orientacion, zip, edad)
    VALUES ($1, $2, $3, $4, $5) 
    RETURNING usuario_id, pais, genero, orientacion, zip, edad;
`;

// actualizar un usuario
const updateUser = `
    UPDATE usuarios SET pais = $1, genero = $2 WHERE usuario_id = $3 RETURNING *;
`;

// eliminar un usuario
const deleteUser = `
    DELETE FROM usuarios WHERE usuario_id = $1 RETURNING *;
`;

module.exports = {
    getAllUsers,
    getUserById,
    findUserByUsername,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser
};
