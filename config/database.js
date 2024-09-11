const mongoose = require('mongoose');
require('dotenv').config();
const connectWithDb = () => {
    mongoose.connect(process.env.DATABASE_URL)
    .then(
        console.log("Database connection established")
        
    ).catch((error) => {
        console.log("database connection error: " + error);
        process.exit(1);
    })
};

module.exports = connectWithDb;