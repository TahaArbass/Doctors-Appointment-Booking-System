const Review = require("../models/review");
const Doctor = require("../models/doctor");
const Patient = require("../models/patient");


// get all reviews
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll();
    // res.status(200).json(reviews);
    res.render('detailReviews', { reviews: reviews });
  }

  catch (error) {
    console.error(error);
  }
};

// get review by id
const getReviewById = async (req, res) => {
  try {
    const id = req.params.id;
    const review = await Review.findByPk(id);

    res.status(200).json(review);
  }

  catch (error) {
    console.error(error);
  }
};

// get reviews by doctor id
const getReviewsByDoctorId = async (req, res) => {
  try {

    const doctor_id = req.params.doctor_id;
    const doctor = await Doctor.findByPk(doctor_id);

    if (!doctor) {
      res.status(404).json({ message: 'Doctor not found. No reviews.' });
    }

    else {
      const reviews = await Review.findAll({ where: { doctor_id: doctor_id } });

      if (reviews)
        res.status(200).json(reviews);

      else {
        res.status(404).json({ message: 'Reviews not found.' });
      }
    }

  }

  catch (error) {
    console.error(error);
  }
}

// get reviews by patient id
const getReviewsByPatientId = async (req, res) => {
  try {

    const patient_id = req.params.patient_id;
    const patient = await Patient.findByPk(patient_id);

    if (!patient) {
      res.status(404).json({ message: 'Doctor not found. No reviews.' });
    }

    else {
      const reviews = await Review.findAll({ where: { patient_id: patient_id } });

      if (reviews)
        res.status(200).json(reviews);

      else {
        res.status(404).json({ message: 'Reviews not found.' });
      }
    }

  }

  catch (error) {
    console.error(error);
  }
}

// get reviews by rating
const getReviewsByRating = async (req, res) => {
  const rating = req.params.rating;

  try {

    const reviews = await Review.findAll({ where: { rating: rating } });

    if (reviews)
      res.status(200).json(reviews);

    else {
      res.status(404).json({ message: 'Reviews not found.' });
    }
  }

  catch (error) {
    console.error(error);
  }
}

// get reviews by doctor id and patient id
const getReviewsByDoctorIdAndPatientId = async (req, res) => {
  const doctor_id = req.params.doctor_id;
  const patient_id = req.params.patient_id;

  try {
    const patient = await Patient.findByPk(patient_id);
    const doctor = await Doctor.findByPk(doctor_id);

    if (!patient || !doctor) {
      res.status(404).message({ message: "Patient or doctor not found." });
    }

    else {
      const reviews = await Review.findAll({ where: { doctor_id: doctor_id, patient_id: patient_id } });

      if (reviews)
        res.status(200).json(reviews);

      else {
        res.status(404).json({ message: 'Reviews not found.' });
      }
    }
  }

  catch (error) {
    console.error(error);
  }
}

// create a review
const createReview = async (req, res) => {
  const { doctor_id, patient_id, rating, comment } = req.body;

  try {
    const doctor = await Doctor.findByPk(doctor_id);
    const patient = await Patient.findByPk(patient_id);

    if (!doctor || !patient) {
      res.status(404).json({ message: "Patient or doctor not found." });
    }

    else {
      const review = await Review.create({ doctor_id, patient_id, rating, comment });

      if (review)
        res.redirect('/api/reviews');
        // res.status(201).json({
        //   message: 'Review created.',
        //   review: review,
        // });

      else {
        res.status(400).json({ message: 'Review not created.' });
      }
    }
  }

  catch (error) {
    console.error(error);
  }
}

// update a review
const updateReview = async (req, res) => {
  const id = req.params.id;

  try {
    const { patient_id, doctor_id, rating, comment } = req.body;

    const review = await Review.findByPk(id);

    if (!review) {
      res.status(404).json({ message: "Review not found." });
    }

    else {
      const updatedReview = await review.update({ patient_id, doctor_id, rating, comment });

      if (updatedReview)
        res.status(200).json({
          message: "Review updated.",
          review: updatedReview,
        });

      else {
        res.status(400).json({ message: "Review not updated." });
      }
    }
  }

  catch (error) {
    console.error(error);
  }
}

// delete a review
const deleteReview = async (req, res) => {
  const id = req.params.id;

  try {
    const review = await Review.findByPk(id);

    if (!review) {
      res.status(404).json({ message: "Review not found." });
    }

    else {
      const deletedReview = await review.destroy();

      if (deletedReview)
        res.redirect('/api/reviews');
        // res.status(200).json({ message: "Review deleted." });

      else {
        res.status(400).json({ message: "Review not deleted." });
      }
    }
  }

  catch (error) {
    console.error(error);
  }
}

module.exports = {
  getAllReviews,
  getReviewById,
  getReviewsByDoctorId,
  getReviewsByPatientId,
  getReviewsByRating,
  getReviewsByDoctorIdAndPatientId,
  createReview,
  updateReview,
  deleteReview,
};