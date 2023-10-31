require("dotenv").config();
const config = {
    db:{
        host: process.env.DB_HOST ,
        user: process.env.DB_USER ,
        password: process.env.DB_PASS ,
        database: process.env.DB_NAME ,
        port: process.env.DB_PORT || 3307, 
        connectionLimit: 10,
    }
}

module.exports = config;