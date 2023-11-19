const express = require('express');

const router = express.Router();

const {
    getAllReviews,
    getReviewById,
    getReviewsByDoctorId,
    getReviewsByPatientId,
    getReviewsByDoctorIdAndPatientId,
    getReviewsByRating,
    createReview,
    updateReview,
    deleteReview
} = require("../services/review.services");

const reviewValidator = require("../validators/reviewValidator");

// getters routes
router.get("/", getAllReviews);

router.get("/:id", getReviewById);

router.get("/doctor/:doctor_id", getReviewsByDoctorId);

router.get("/patient/:patient_id", getReviewsByPatientId);

router.get("/doctor/:doctor_id/patient/:patient_id", getReviewsByDoctorIdAndPatientId);

router.get("/rating/:rating", getReviewsByRating);

// create, update, delete routes

router.post("/", reviewValidator, createReview);

router.put("/id/:id",reviewValidator, updateReview);

router.delete("/id/:id", deleteReview);

module.exports = router;