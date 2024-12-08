

// importamos el modelo de profesionales
const profesionalesModel = require('../02_models_SQL/profesionales.model');

// GET
// obtener todos los profesionales
const getAllProfesionales = async (req, res) => {
    try {
        const profesional = await profesionalesModel.getAllProfesionales();
        res.status(200).json(profesional);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los profesionales', error });
    }
};

// GET
// obtener un profesional por id
const getProfesionalById = async (req, res) => {
    const { id } = req.params;
    
    try {
        const profesional = await profesionalesModel.getProfesionalById(id);
        if (!profesional) {
            return res.status(404).json({ message: 'Profesional no encontrado' });
        }
        res.status(200).json(profesional);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el profesional', error });
    }
};

// POST
// crear un nuevo profesional
const createProfesional = async (req, res) => {
    const { provincia, cod_postal, ambito, especialidad } = req.body;

    try {
        const newProfesional = await profesionalesModel.createProfesional(provincia, cod_postal, ambito, especialidad);
        res.status(201).json(newProfesional);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el profesional', error });
    }
};

// PUT
// actualizar un profesional
const updateProfesional = async (req, res) => {
    const { id } = req.params;
    const { pais, zip } = req.body;

    try {
        const updatedUser = await profesionalesModel.updateProfesional(pais, zip, id);
        if (!updatedUser) {
            return res.status(404).json({ message: 'Profesional no encontrado' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el profesional', error });
    }
};

// DELETE
// eliminar un profesional
const deleteProfesional = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await profesionalesModel.deleteProfesional(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'Profesional no encontrado' });
        }
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el profesional', error });
    }
};

module.exports = { 
    getAllProfesionales,
    getProfesionalById,
    createProfesional, 
    updateProfesional, 
    deleteProfesional
};

