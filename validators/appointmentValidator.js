const {body, validationResult} = require('express-validator');

const AppointmentValidator = [
    body('doctor_id').exists().isInt().
        withMessage('Doctor id is required and must be an integer'),

    body('patient_id').exists().isInt().
        withMessage('Patient id is required and must be an integer'),

    body('appointment_datetime').exists().isISO8601().
        withMessage('Appointment date and time is required and must be in the format YYYY-MM-DD HH:MM:SS'),

    body('status').exists().isIn(['pending','scheduled','canceled','completed']).
        withMessage('Status is required and must be one of the following: pending, scheduled, canceled, completed'),

    body('reason').optional().isLength({min: 3}).
        withMessage('Reason must be at least 3 characters long'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }
];

module.exports = {AppointmentValidator};