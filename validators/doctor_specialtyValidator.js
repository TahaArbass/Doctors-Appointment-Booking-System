const {body, validationResult} = require('express-validator');

const doctor_specialtyValidator = [
    body('specialty_id').exists().isInt().
        withMessage('Specialty id is required and must be an integer'),

    body('doctor_id').exists().isInt().
        withMessage('Doctor id is required and must be an integer'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }
];

module.exports = {doctor_specialtyValidator};