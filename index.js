const express = require("express");
const moment = require("moment");
// const config = require("./db/config");
// const { query } = require("./db/db");

require("dotenv").config();

const bodyParser = require('body-parser');
//const cors = require('cors');

const port = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(bodyParser.json());

// getting routes
const patients = require('./routes/patient.route');
const specialties = require('./routes/specialty.route');

// patient routes
app.use('/api/patients', patients);

// specialty routes
app.use('/api/specialties', specialties);



app.listen(port, ()=>{
    console.log(`my app is listening ${port}`);

})

