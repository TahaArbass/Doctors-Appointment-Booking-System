const { body, validationResult } = require('express-validator');

const reviewValidator = [

    body('patient_id')
        .exists()
        .withMessage('patient_id is required')
        .isInt()
        .withMessage('patient_id must be an integer'),

    body('doctor_id')
        .exists()
        .withMessage('doctor_id is required')
        .isInt()
        .withMessage('doctor_id must be an integer'),

    body('rating')
        .exists()
        .withMessage('rating is required')
        .isInt({ min: 1, max: 5 })
        .withMessage('Rating must be an integer between 1 and 5'),

    body('comment')
        .optional()
        .isString()
        .withMessage('comment must be a string'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).send({ errors: errors.array() });
        }
        next();
    }
];

module.exports = reviewValidator;