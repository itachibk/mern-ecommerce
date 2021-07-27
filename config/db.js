//Env config
const env = require('dotenv');
env.config();
//Mongoose require
const mongoose = require('mongoose')


//Kết nối đến database của mongoodb
const connectDB = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@ez-web.iyr0g.mongodb.net/myapp?retryWrites=true&w=majority`,
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