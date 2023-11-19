const { body, validationResult } = require('express-validator');

const AddressValidator = [

    body('street_address').exists().isLength({ min: 3 }).
        withMessage('Street address is required and must be at least 3 characters long'),

    body('city').exists().isLength({ min: 3 }).
        withMessage('City is required and must be at least 3 characters long'),

    body('country').exists().isLength({ min: 3 }).
        withMessage('Country is required and must be at least 3 characters long'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { AddressValidator };