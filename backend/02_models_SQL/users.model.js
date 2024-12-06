
// importamos la configuración de la base de datos y las consultas
const bcrypt = require('bcryptjs');
const db = require('../05_config/db.config');
const queries = require('../04_queries/users.queries');

// obtener todos los usuarios
exports.getAllUsers = async () => {
    try {
        const { rows } = await db.query(queries.getAllUsers);
        return rows;
    } catch (error) {
        throw error;
    }
};

// obtener un usuario por id
exports.getUserById = async (id) => {
    try {
        const { rows } = await db.query(queries.getUserById, [id]);
        return rows[0]; // Retorna el primer usuario encontrado
    } catch (error) {
        throw error;
    }
};

exports.findUserByUsername = async (nombre) => {
    try {
        console.log("nombre", nombre)
        // Ejecutamos la consulta usando el nombre
        const { rows } = await db.query(queries.findUserByUsername, [nombre]);

        // Retornamos el primer usuario encontrado
        return rows[0]; // Retorna el primer usuario encontrado o undefined si no existe
    } catch (error) {
        throw error;  // Lanza el error si algo sale mal
    }
};

// crear un nuevo usuario
exports.createUser = async (pais, genero, orientacion, zip, edad, usuario_id) => {
    // Los valores se toman directamente de los parámetros
    const values = [
        pais, 
        genero, 
        orientacion,
        zip,
        edad
    ];
    
    try {
        const result = await db.query(queries.createUser, values);
        console.log(result);
        return result.rows[0];
    } catch (error) {
        console.error('Error al crear usuario:', error);
        throw error;
    }
};

exports.getUserByEmail = async (email) => {
    let client, result;
    try {
        client = await db.connect(); // Espera a abrir conexion
        const data = await client.query(queries.getUserByEmail, [email])
        result = data.rows
        
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

// actualizar un usuario
exports.updateUser = async (nombre, email, id) => {
    try {
        const { rows } = await db.query(queries.updateUser, [nombre, email, id]);
        return rows[0]; // Retorna el usuario actualizado
    } catch (error) {
        throw error;
    }
};

// eliminar un usuario
exports.deleteUser = async (id) => {
    try {
        const { rows } = await db.query(queries.deleteUser, [id]);
        return rows[0]; // Retorna el usuario eliminado
    } catch (error) {
        throw error;
    }
};
