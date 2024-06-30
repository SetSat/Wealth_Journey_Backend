const express = require('express')
const cors = require('cors')
const bodyparser = require('body-parser')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const PORT = process.env.PORT || 3000
const authrouter = require('./controller/auth.js')
const tranactionrouter = require('./controller/finance.js')

app.use(bodyparser.json())
app.use(cors())
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected...');
    } catch (err) {
        console.error(err.message);

    }
};
connectDB()
app.use("/api", authrouter)
app.use('/api', tranactionrouter)
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

