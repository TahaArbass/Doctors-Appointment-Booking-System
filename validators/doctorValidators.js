const { body, validationResult } = require('express-validator');

const DoctorValidator = [
    
    body('first_name').exists().isLength({min: 3}).
        withMessage('First name is required and must be at least 3 characters long'),

    body('last_name').exists().isLength({min: 3}).
        withMessage('Last name is required and must be at least 3 characters long'),

    body('email').exists().isEmail().
        withMessage('Email is required and correct format is required'),

    // assuming we are in Lebanon
    body('phone_number')
        .exists().withMessage('Phone number is required')
        .matches(/^[0-9]{8}$/).withMessage('Phone number must be exactly 8 digits'),

    body('date_of_birth')
        .exists().withMessage('Date of birth is required')
        .matches(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/)
        .withMessage('Date of birth must be in the format YYYY-MM-DD'),

    body('password')
        .exists().withMessage('Password is required')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
        .withMessage('Password must include at least one uppercase letter, one lowercase letter, and one number'),

        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({errors: errors.array()});
            }
            next();
        }
];

module.exports = {DoctorValidator};