const express = require("express");
const moment = require("moment");
const config = require("./db/config");
const { query } = require("./db/db");

require("dotenv").config();

const bodyParser = require('body-parser');
const cors = require('cors');

const port = process.env.PORT || 3001;

const app = express();

app.get("/", async(req, res)=>{
    let sql = "select * from users";
    const users = await query(sql);
    res.status(200).json(users);
});


// app.use('/api/users', users);
// app.use('/api/clients', clients);


app.listen(port, ()=>{
    console.log(`my app is listening ${port}`);

})

