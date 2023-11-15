const { json } = require("body-parser");
const Patient = require("../models/patient");
const Address = require("../models/address");

const createPatient = async (req, res) => {
  const { first_name, last_name, email, phone_number, date_of_birth, password, address_id } = req.body;

  try {

    const existingAddress = await Address.findByPk(address_id);

    if (!existingAddress) {
      return res.status(400).json({ error: 'Address not found' });
    }

    const patient = await Patient.create({
      first_name,
      last_name,
      email,
      phone_number,
      date_of_birth,
      password,
      address_id,
    });
    res.status(201).json(patient);
  } catch (error) {
    console.error(error);
  }
};


const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.findAll();
    res.json(patients);
  } catch (error) {
    console.error(error);
  }
};

const getPatientById = async (req, res) => {
  const id = req.params.id;
  try {
    const patient = await Patient.findByPk(id);
    if (patient) {
      res.json(patient);
    }
    else {
      return res.status(404).json({ message: 'Patient not found' });
    }
  } catch (error) {
    console.error(error);
  }
};

const getPatientByName = async (req, res) => {
  const first_name = req.params.first_name;
  const last_name = req.params.last_name;
  try {
    const patient = await Patient.findAll({where: {first_name: first_name, last_name: last_name}});
    if (patient) {
      res.json(patient);
    }
    else {
      return res.status(404).json({ message: 'Patient not found' });
    }
  } catch (error) {
    console.error(error);
  }
};

const getPatientByPhoneNumber = async (req, res) => {
  const phone_number = req.params.phone_number;
  try {
    const patient = await Patient.findAll({where: {phone_number: phone_number}});
    if (patient) {
      res.json(patient);
    }
    else {
      return res.status(404).json({ message: 'Patient not found' });
    }
  } catch (error) {
    console.error(error);
  }
};

const updatePatient = async (req, res) => {
  try {
    const updatedPatient = await Patient.update(
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone_number: req.body.phone_number,
        date_of_birth: req.body.date_of_birth,
        password: req.body.password,
      },
      { where: { id: req.body.id } }
    );
    res.json(updatedPatient);
  } catch (error) {
    console.error(error);
  }
};

const deletePatient = async (req, res) => {
  try {
    const id = req.params.id;
    const patient = await Patient.findByPk(id);

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    const deletedPatient = await patient.destroy();
    
    // Send a JSON response indicating success
    res.json({
      success: true,
      message: 'Patient deleted successfully',
      deletedPatient: deletedPatient.toJSON(),
    });

  } catch (error) {
    console.error(error);
    
    // Send a JSON response indicating failure
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createPatient,
  getAllPatients,
  getPatientById,
  getPatientByName,
  getPatientByPhoneNumber,
  updatePatient,
  deletePatient,
};
