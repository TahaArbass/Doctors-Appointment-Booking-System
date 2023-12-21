const Specialty = require('../models/specialty');

const getAllSpecialties = async (req, res) => {
    try {
      const specialties = await Specialty.findAll();
    //   res.status(200).json(specialties);
    res.render('detailSpecialties', {specialties: specialties});
    } catch (error) {
      console.error(error);
    }
  };

const getSpecialtyById = async (req, res) => {
    const id = req.params.id;
    try {
        const specialty = await Specialty.findByPk(id);
        if (specialty) {
            res.status(200).json(specialty);
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
            res.status(200).json(specialty);
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
        const createdSpecialty = await Specialty.create({name: name});
        res.redirect('/api/specialties');
        // res.status(201).json({
        //     message:"Specialty created successfully",
        //     createdSpecialty: createdSpecialty.toJSON()});
    }
    catch (error) {
        console.error(error);
    }
}

const updateSpecialty = async (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    try {
        const updatedSpecialty = await Specialty.findByPk(id);
        if (updatedSpecialty) {
            updatedSpecialty.name = name;
            updatedSpecialty.save();
            // res.status(200).json({
            //     message:"Specialty updated successfully",
            //     updatedSpecialty: updatedSpecialty.toJSON()});
            res.redirect('/api/specialties');
        }
        else {
            return res.status(404).json({ message: 'Specialty not found' });
        }
    }
    catch (error) {
        console.error(error);
    }
}

const deleteSpecialty = async (req, res) => {
    try {
        const id = req.params.id;
        const specialty = await Specialty.findByPk(id);
    
        if (!specialty) {
          return res.status(404).json({ error: 'Specialty not found' });
        }
        else{
             await specialty.destroy();
            // res.status(200).json({
            //     message: 'Specialty deleted successfully',
            //     deletedSpecialty: deletedSpecialty.toJSON(),
            // });
            res.redirect('/api/specialties');
        }    
      } catch (error) {
        console.error(error);
      }
}

module.exports = {
    getAllSpecialties,
    getSpecialtyById,
    getSpecialtyByName,
    createSpecialty,
    updateSpecialty,
    deleteSpecialty,
};