const express = require('express');
//env
const env = require('dotenv');
env.config();

const connectDB = require(".././config/db");

//routes
const userRoutes = require('./routes/user');

connectDB();

const app = express()
app.use(express.json())



app.use("/api/", userRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))