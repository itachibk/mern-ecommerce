require('dotenv').config();
const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@ez-web.iyr0g.mongodb.net/myweb_02?retryWrites=true&w=majority`,
            {
                useCreateIndex: true,
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            }
        )

        console.log('MongoDB connected success!')
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

module.exports = connectDB