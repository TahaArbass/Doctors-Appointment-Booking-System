const Doctor_Specialty = require("../models/doctor_specialty");
const Doctor = require("../models/doctor");
const Specialty = require("../models/specialty");

// search for all doctor specialties linking
const getAllDoctor_Specialties = async (req, res) => {
    try {

        const doctor_specialties = await Doctor_Specialty.findAll();

        res.status(200).json(doctor_specialties);

    } catch (error) {
        console.error(error);
    }
};

// use id to search
const getDoctor_SpecialtyById = async (req, res) => {
    const id = req.params.id;
    try {

        const doctor_specialty = await Doctor_Specialty.findByPk(id);

        if (doctor_specialty) {
            res.status(200).json(doctor_specialty);
        }
        else {
            return res.status(404).json({ message: 'Doctor_Specialty not found' });
        }
    }
    catch (error) {
        console.error(error);
    }
}

// use doctor id to search
const getDoctor_SpecialtyByDoctorId = async (req, res) => {
    const doctor_id = req.params.doctor_id;
    try {
        const doctor_specialty = await Doctor_Specialty.findAll({ where: { doctor_id: doctor_id } });
        if (doctor_specialty) {
            res.status(200).json(doctor_specialty);
        }
        else {
            return res.status(404).json({ message: 'Doctor_Specialty not found' });
        }
    } catch (error) {
        console.error(error);
    }
}

// use specialty id to search
const getDoctor_SpecialtyBySpecialtyId = async (req, res) => {
    const specialty_id = req.params.specialty_id;
    try {

        const doctor_specialty = await Doctor_Specialty.findAll({ where: { specialty_id: specialty_id } });

        if (doctor_specialty) {
            res.status(200).json(doctor_specialty);
        }
        else {
            return res.status(404).json({ message: 'Doctor_Specialty not found' });
        }
    }
    catch (error) {
        console.error(error);
    }
}

// create a doctor specialty linking
const createDoctor_Specialty = async (req, res) => {
    const { doctor_id, specialty_id } = req.body;
    try {

        //  search for doctor if it exists
        const doctor = await Doctor.findByPk(doctor_id);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        // search for specialty if it exists
        const specialty = await Specialty.findByPk(specialty_id);
        if (!specialty) {
            return res.status(404).json({ message: 'Specialty not found' });
        }

        const doctor_specialty = await Doctor_Specialty.create(
            { doctor_id: doctor_id, specialty_id: specialty_id });

        res.status(201).json(doctor_specialty);
    }
    catch (error) {
        console.error(error);
    }
}

// update a doctor specialty linking
const updateDoctor_Specialty = async (req, res) => {
    const id = req.params.id;
    const { doctor_id, specialty_id } = req.body;
    try {

        const doctor_specialty = await Doctor_Specialty.update({ doctor_id: doctor_id, specialty_id: specialty_id },
            { where: { id: id } });
        if (doctor_specialty) {
            res.status(200).json(doctor_specialty);
        }
        else {
            return res.status(404).json({ message: 'Doctor_Specialty not found' });
        }
    }
    catch (error) {
        console.error(error);
    }
}

// delete the linking 
const deleteDoctor_Specialty = async (req, res) => {
    const id = req.params.id;
    try {
        // find and delete
        const doctor_specialty = await Doctor_Specialty.destroy({ where: { id: id } });

        if (doctor_specialty) {
            res.status(200).json({ message: 'Doctor_Specialty deleted' });
        }
        else {
            return res.status(404).json({ message: 'Doctor_Specialty not found and not deleted' });
        }
    }
    catch (error) {
        console.error(error);
    }
}

module.exports = {
    getAllDoctor_Specialties,
    getDoctor_SpecialtyById,
    getDoctor_SpecialtyByDoctorId,
    getDoctor_SpecialtyBySpecialtyId,
    createDoctor_Specialty,
    updateDoctor_Specialty,
    deleteDoctor_Specialty
};
