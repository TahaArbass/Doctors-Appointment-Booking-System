const Doctor = require("../models/doctor");
const Address = require("../models/address");

// create a doctor
const createDoctor = async (req, res) => {
  const { first_name, last_name, email, phone_number, date_of_birth, password, clinic_address_id } = req.body;

  try {

    // check if the address exists
    const existingAddress = await Address.findByPk(clinic_address_id);

    if (!existingAddress) {
      return res.status(400).json({ error: 'Address not found' });
    }

    // then create the doctor
    const createdDoctor = await Doctor.create({
      first_name,
      last_name,
      email,
      phone_number,
      date_of_birth,
      password,
      clinic_address_id,
    });
    res.status(201).json(createdDoctor);
  } catch (error) {
    console.error(error);
  }
};

const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.findAll();
    res.json(doctors);
  } catch (error) {
    console.error(error);
  }
};

// search for doctor by his ID
const getDoctorById = async (req, res) => {
  const id = req.params.id;
  try {
    const doctor = await Doctor.findByPk(id);
    if (doctor) {
      res.status(200).json(doctor);
    }
    else {
      return res.status(404).json({ message: 'doctor not found' });
    }
  } catch (error) {
    console.error(error);
  }
};

// search for doctor by his full name
const getDoctorByName = async (req, res) => {
  const first_name = req.params.first_name;
  const last_name = req.params.last_name;
  try {
    const doctor = await Doctor.findAll({where: {first_name: first_name, last_name: last_name}});
    if (doctor) {
      res.status(200).json(doctor);
    }
    else {
      return res.status(404).json({ message: 'Doctor not found' });
    }
  } catch (error) {
    console.error(error);
  }
};

// search for doctor by phone number
const getDoctorByPhoneNumber = async (req, res) => {
  const phone_number = req.params.phone_number;
  try {
    const doctor = await Doctor.findAll({where: {phone_number: phone_number}});
    if (doctor) {
      res.status(200).json(doctor);
    }
    else {
      return res.status(404).json({ message: 'doctor not found' });
    }
  } catch (error) {
    console.error(error);
  }
};

// search for doctor by email
const getDoctorByEmail = async (req, res) => {
  const email = req.params.email;
  try {
    const doctor = await Doctor.findOne({where: {email: email}});
    if (doctor) {
      res.status(200).json(doctor);
    }
    else {
      return res.status(404).json({ message: 'Patient not found' });
    }
  } catch (error) {
    console.error(error);
  }
};

const updateDoctor = async (req, res) => {
  try {

    // search for doctor then update
    const updatedDoctor = await Doctor.update(
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone_number: req.body.phone_number,
        date_of_birth: req.body.date_of_birth,
        password: req.body.password,
      },
      { where: { id: req.params.id } }
    );

    if(!updatedDoctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    res.status(200).json({
      message: 'Doctor updated successfully',
      updatedDoctor: updatedDoctor.toJSON,
    });

  } catch (error) {
    console.error(error);
  }
};

const deleteDoctor = async (req, res) => {
  try {
    const id = req.params.id;

    // find the doctor
    const doctor = await Doctor.findByPk(id);

    if (!doctor) {
      return res.status(404).json({ error: 'doctor not found' });
    }

    // delete it
    const deletedDoctor = await doctor.destroy();
    
    res.status(200).json({
      message: 'doctor deleted successfully',
      deletedDoctor: deletedDoctor.toJSON(),
    });

  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getAllDoctors,
  getDoctorById,
  getDoctorByName,
  getDoctorByPhoneNumber,
  getDoctorByEmail,
  createDoctor,
  updateDoctor,
  deleteDoctor
};
