const Specialty = require('../models/specialty');

const getAllSpecialties = async (req, res) => {
    try {
      const specialties = await Specialty.findAll();
      res.json(specialties);
    } catch (error) {
      console.error(error);
    }
  };

const getSpecialtyById = async (req, res) => {
    const id = req.params.id;
    try {
        const specialty = await Specialty.findByPk(id);
        if (specialty) {
            res.json(specialty);
        }
        else {
            return res.status(404).json({ message: 'Specialty not found' });
        }
    }
    catch (error) {
        console.error(error);
    }
}

const getSpecialtyByName = async (req, res) => {
    const name = req.params.name;
    try {
        const specialty = await Specialty.findOne({ where: { name: name } });
        if (specialty) {
            res.json(specialty);
        }
        else {
            return res.status(404).json({ message: 'Specialty not found' });
        }
    }
    catch (error) {
        console.error(error);
    }
}

const createSpecialty = async (req, res) => {
    const name = req.body.name;
    
    try {
        const specialty = await Specialty.create( name );
        res.status(201).json(specialty);
    }
    catch (error) {
        console.error(error);
    }
}

const updateSpecialty = async (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    try {
        const specialty = await Specialty.findByPk(id);
        if (specialty) {
            specialty.name = name;
            specialty.save();
            res.json(specialty);
        }
        else {
            return res.status(404).json({ message: 'Specialty not found' });
        }
    }
    catch (error) {
        console.error(error);
    }
}

module.exports = {
    getAllSpecialties,
    getSpecialtyById,
    getSpecialtyByName,
    createSpecialty,
    updateSpecialty,
};