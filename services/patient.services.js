const Patient = require("../models/patient");
const Address = require("../models/address");
const { generateToken } = require("../utils/auth");
const bcrypt = require('bcrypt');

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

    const token = generateToken({id: patient.id});

    // res.status(201).json({
    //   message: 'Patient created successfully',
    //   patient: patient.toJSON(),
    //   token,
    // });

    res.redirect('/api/patients/');

  } catch (error) {
    console.error(error);
  }
};


const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.findAll();
    res.render('detailPatient', {patients: patients});
    // res.status(200).json(patients);
  } catch (error) {
    console.error(error);
  }
};

const getPatientById = async (req, res) => {
  const id = req.params.id;
  try {
    const patient = await Patient.findByPk(id);
    if (patient) {
      res.status(200).json(patient);
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
      res.status(200).json(patient);
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
      res.status(200).json(patient);
    }
    else {
      return res.status(404).json({ message: 'Patient not found' });
    }
  } catch (error) {
    console.error(error);
  }
};

//get patient by email
const getPatientByEmail = async (req, res) => {
  const email = req.params.email;
  try {
    const patient = await Patient.findAll({where: {email: email}});
    if (patient) {
      res.status(200).json(patient);
    }
    else {
      return res.status(404).json({ message: 'Patient not found' });
    }
  } catch (error) {
    console.error(error);
  }
};

// const updatePatient = async (req, res) => {
//   try {
//     const updatedPatient = await Patient.update(
//       {
//         first_name: req.body.first_name,
//         last_name: req.body.last_name,
//         email: req.body.email,
//         phone_number: req.body.phone_number,
//         date_of_birth: req.body.date_of_birth,
//         password: req.body.password,
//       },
//       { where: { id: req.body.id } }
//     );

//     if(!updatedPatient) {
//       // return res.status(404).json({ error: 'Patient not found' });
//       res.render('updatePatient', {error: 'Patient not found'});
//     }

//     // res.status(200).json({
//     //   message: 'Patient updated successfully',
//     //   updatedPatient: updatedPatient.toJSON,
//     // });

//     res.render('updatePatient',
//      {message: 'Patient updated successfully',
//       updatedPatient: updatedPatient.toJSON});

//   } catch (error) {
//     console.error(error);
//   }
// };

const updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findOne({ where: { id: req.body.id } });

    if(!patient) {
      res.render('updatePatient', {error: 'Patient not found'});
      return;
    }

    patient.first_name = req.body.first_name;
    patient.last_name = req.body.last_name;
    patient.email = req.body.email;
    patient.phone_number = req.body.phone_number;
    patient.date_of_birth = req.body.date_of_birth;
    patient.password = req.body.password;

    const updatedPatient = await patient.save();

    // res.render('updatePatient', {
    //   message: 'Patient updated successfully',
    //   updatedPatient: updatedPatient
    // });

    res.redirect('/api/patients/');
      
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
    
    // // Send a JSON response indicating success
    // res.status(200).json({
    //   message: 'Patient deleted successfully',
    //   deletedPatient: deletedPatient.toJSON(),
    // });

    res.redirect('/api/patients/');

  } catch (error) {
    console.error(error);
  }
};

// signup patient
const signupPatient = async (req, res) => {
  createPatient(req, res);
}



// login patient
const loginPatient = async (req, res) => {
  const { email, password } = req.body;

  try {
    const patient = await Patient.findOne({ where: { email } });

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    const passwordValid = await bcrypt.compare(password, patient.password);

    if (!passwordValid) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    const token = generateToken(patient.id);

    res.status(200).json({
      message: 'Patient logged in successfully',
      token,
    });
  }
  catch (error) {
    console.error(error);
  }
}

module.exports = {
  createPatient,
  getAllPatients,
  getPatientById,
  getPatientByName,
  getPatientByPhoneNumber,
  getPatientByEmail,
  updatePatient,
  deletePatient,
  signupPatient,
  loginPatient,
};
