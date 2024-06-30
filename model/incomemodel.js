const mongoose = require('mongoose')

const incomeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, required: true, ref: "User"

    },
    income: {
        type: Number, required: true,
    },
    description: {
        type: String, required: true
    },
    date: {
        type: Date, default: Date.now
    }
})
module.exports = mongoose.model("Income", incomeSchema)