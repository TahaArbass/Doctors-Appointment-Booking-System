const { body, validationResult } = require('express-validator');

const SpecialtyValidator = [
    body('name').exists().isLength({min: 3})
    .withMessage('First name is required and must be at least 3 characters long')
    .matches(/^[a-zA-Z]+$/).withMessage('Specialty name must be only letters'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }
];

module.exports = {SpecialtyValidator};