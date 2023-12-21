const { where } = require("sequelize");
const Appointment = require("../models/appointment");
const Doctor = require("../models/doctor");
const Patient = require("../models/patient");

// search for all appointments
const getAllAppointments = async (req, res) => {

    try {
        const appointments = await Appointment.findAll();

        // res.status(200).json(appointments);
        res.render('detailAppointments', { appointments: appointments });
    } catch (error) {
        console.error(error);
    }
}

// search for appointment by its ID
const getAppointmentById = async (req, res) => {
    const id = req.params.id;

    try {

        const appointment = await Appointment.findByPk(id);

        if (appointment) {
            res.status(200).json(appointment);
        }

        else {
            return res.status(404).json({ message: 'Patient not found' });
        }
    }
    catch (error) {
        console.error(error);
    }

}

// search for appointments using doctor id
const getAppointmentByDoctorId = async (req, res) => {
    const doctor_id = req.params.doctor_id;

    try {

        const doctor = await Doctor.findByPk(doctor_id);

        if (!doctor)
            res.status(404).json({ message: 'Doctor not found. No appointments.' });

        else {

            const appointments = await Appointment.findAll({ where: { doctor_id: doctor_id } });

            if (appointments)
                res.status(200).json(appointments);

            else {
                res.status(404).json({ message: 'Appointments not found.' });
            }
        }
    }

    catch (error) {
        console.error(error);
    }
}

// search for appointments using patient id
const getAppointmentByPatientId = async (req, res) => {
    const patient_id = req.params.patient_id;

    try {

        const patient = await Patient.findByPk(patient_id);

        if (!patient)
            res.status(404).json({ message: 'Patient not found. No appointments.' });

        else {

            const appointments = await Appointment.findAll({ where: { patient_id: patient_id } });

            if (appointments)
                res.status(200).json(appointments);

            else {
                res.status(404).json({ message: 'Appointments not found.' });
            }
        }
    }

    catch (error) {
        console.error(error);
    }
}

// search for appointments using status
const getAppointmentByStatus = async (req, res) => {
    const status = req.params.status;

    try {

        const appointments = await Appointment.findAll({
            where:
                { status: status }
        });

        if (appointments)
            res.status(200).json(appointments);

        else {
            res.status(404).json({ message: 'Appointments not found.' });
        }
    }

    catch (error) {
        console.error(error);
    }
}


// search for appointments using status
const getAppointmentByDate = async (req, res) => {
    const appointment_datetime = req.params.appointment_datetime;

    try {

        const appointments = await Appointment.findAll({
            where:
                { appointment_datetime: appointment_datetime }
        });

        if (appointments)
            res.status(200).json(appointments);

        else {
            res.status(404).json({ message: 'Appointments not found.' });
        }
    }

    catch (error) {
        console.error(error);
    }
}


// create an appointment
const createAppointment = async (req, res) => {

    const { doctor_id, patient_id, appointment_datetime, status, reason } = req.body;

    try {
        // check if patient and doctor exists
        const patient = await Patient.findByPk(patient_id);

        if (!patient)
            res.status(404).json({ message: 'Patient not found. Can not create appointment.' });

        const doctor = await Doctor.findByPk(doctor_id);

        if (!doctor)
            res.status(404).json({ message: 'Doctor not found. Can not create appointment.' });

        // create the appointment
        const appointment = await Appointment.create({
            doctor_id,
            patient_id,
            appointment_datetime,
            status,
            reason,
        });

        // res.status(201).json({
        //     message: 'Appointment created successfully.',
        //     appointment: appointment.toJSON
        // });
        res.redirect('/api/appointments');

    }

    catch (error) {
        console.error(error);
    }
}

// update an appointment (for admin)
const updateAppointment = async (req, res) => {
    const { doctor_id, patient_id, appointment_datetime, status, reason } = req.body;

    try {

        // check if patient and doctor exists
        const patient = await Patient.findByPk(patient_id);

        if (!patient)
            res.status(404).json({ message: 'Patient not found. Can not create appointment.' });

        const doctor = await Doctor.findByPk(doctor_id);

        if (!doctor)
            res.status(404).json({ message: 'Doctor not found. Can not create appointment.' });

        // update
        const updatedAppointment = await Appointment.update({
            doctor_id,
            patient_id,
            appointment_datetime,
            status,
            reason,
        }, {where : { id: req.body.id }});

        if (!updatedAppointment) {
            return res.status(404).json({ error: 'Appointment not updated' });
        }
        res.redirect('/api/appointments');
        // res.status(200).json({
        //     message: 'Appointment updated successfully',
        //     updatedAppointment: updatedAppointment.toJSON,
        // });
    }

    catch (error) {
        console.error(error);
    }
}

// update an appointment
const updateAppointmentForPatient = async (req, res) => {
    const { doctor_id, patient_id, appointment_datetime, status, reason } = req.body;

    try {

        // check if patient and doctor exists
        const patient = await Patient.findByPk(patient_id);

        if (!patient)
            res.status(404).json({ message: 'Patient not found. Can not create appointment.' });

        const doctor = await Doctor.findByPk(doctor_id);

        if (!doctor)
            res.status(404).json({ message: 'Doctor not found. Can not create appointment.' });

        // update
        const updatedAppointment = await Appointment.update({
            doctor_id,
            patient_id,
            appointment_datetime,
            status,
            reason,
        }, {where : { id: req.body.id }});

        if (!updatedAppointment) {
            return res.status(404).json({ error: 'Appointment not updated' });
        }
        res.redirect('/api/appointments');
        // res.status(200).json({
        //     message: 'Appointment updated successfully',
        //     updatedAppointment: updatedAppointment.toJSON,
        // });
    }

    catch (error) {
        console.error(error);
    }
}

// delete an appointment
const deleteAppointment = async (req, res) => {
    const id = req.params.id;

    try {

        const appointment = await Appointment.findByPk(id);

        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }

        const deletedAppointment = await appointment.destroy();

        // Send a JSON response indicating success
        // res.status(200).json({
        //     message: 'Appointment deleted successfully',
        //     deletedAppointment: deletedAppointment.toJSON(),
        // });
        res.redirect('/api/appointments');
    }

    catch (error) {
        console.error(error);
    }
}


module.exports = {
    getAllAppointments,
    getAppointmentById,
    getAppointmentByDoctorId,
    getAppointmentByPatientId,
    getAppointmentByDate,
    getAppointmentByStatus,
    createAppointment,
    updateAppointment,
    deleteAppointment
}