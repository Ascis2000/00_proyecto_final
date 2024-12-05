
// obtenemos todos los usuarios
const getAllUsers = `
    SELECT * FROM users;
`;

// obtenemos un usuario por id
const getUserById = `
    SELECT * FROM users WHERE id_user = $1;
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
    INSERT INTO users (nombre, email, password, role)
    VALUES ($1, $2, $3, $4) 
    RETURNING id_user, nombre, email, role;
`;

// actualizar un usuario
const updateUser = `
    UPDATE users SET nombre = $1, email = $2 WHERE id_user = $3 RETURNING *;
`;

// eliminar un usuario
const deleteUser = `
    DELETE FROM users WHERE id_user = $1 RETURNING *;
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
