const express = require("express");

require("dotenv").config();

const bodyParser = require('body-parser');

// setting up my port
const port = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(bodyParser.json());


// getting routes
const patients = require('./routes/patient.route');
const specialties = require('./routes/specialty.route');
const doctors = require("./routes/doctor.route");
const addresses = require("./routes/address.route");
const doctor_specialties = require("./routes/doctor_specialties.route");
const appointments = require("./routes/appointment.route");
const reviews = require("./routes/review.route");

// patient routes
app.use('/api/patients', patients);

// specialty routes
app.use('/api/specialties', specialties);

// doctors routes
app.use("/api/doctors", doctors);

// addresses route
app.use("/api/addresses", addresses);

// doctor_specialties route
app.use("api/doctor_specialties", doctor_specialties);

// appointments route
app.use("/api/appointments", appointments);

// reviews route
app.use("/api/reviews", reviews);

// just making sure that I am on the right port
app.listen(port, () => {
    console.log(`my app is listening ${port}`);

});