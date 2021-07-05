const express = require('express');
//env
require('dotenv').config();;


const connectDB = require(".././config/db");
const { validate } = require('./models/user');

//routes
const userRoutes = require('./routes/auth');

connectDB();

const app = express()
app.use(express.json())

const { check } = require('express-validator');

validateSignupRequest = [
    check('firstName')
        .notEmpty()
        .withMessage('firstName is required')
];

app.use("/api/", validateSignupRequest, userRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))