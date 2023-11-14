const { json } = require("body-parser");
const Patient = require("../models/patient");
const Address = require("../models/address");
// const createPatient = async (req, res) => {
//   try {
//     const newPatient = await Patient.create({
//       first_name: req.body.firstName,
//       last_name: req.body.lastName,
//       email: req.body.email,
//       phone_number: req.body.phoneNumber,
//       date_of_birth: req.body.dateOfBirth,
//       password: req.body.password,
//     });
//     return newPatient.toJSON();
//   } catch (error) {
//     console.error('Error creating patient', error);
//   }
// };

const createPatient = async (req, res) => {
  const { first_name, last_name, email, phone_number, date_of_birth, password, address_id } = req.body;

  console.log(req.body)
  

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

const updatePatient = async (req, res) => {
  try {
    const updatedPatient = await Patient.update(
      {
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        email: req.body.email,
        phone_number: req.body.phoneNumber,
        date_of_birth: req.body.dateOfBirth,
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
    if (patient) {
      const deletedPatient = await patient.destroy();
      return deletedPatient.toJSON();
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient,
};
