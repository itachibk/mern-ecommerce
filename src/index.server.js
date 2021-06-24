const express = require('express');
const env = require('dotenv');
const connectDB = require(".././config/db");
const cors = require('cors')
//env
env.config();
//routes
const userRoutes = require('./routes/user');




connectDB();
const app = express()
app.use(express.json())
app.use(cors())


app.use("/api/", userRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))