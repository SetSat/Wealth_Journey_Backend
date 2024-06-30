const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../model/usermodel.js')
const salt = 10


router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: "User already exits" })
        }
        user = new User({ name, email, password })

        user.password = await bcrypt.hash(password, salt)
        await user.save()
        const payload = {
            user: {
                id: user._id,
                name: user.name
            }
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" })
        return res.status(200).json({ token })

    } catch (error) {

        console.error(error.message);
        return res.status(500).send('Server error');

    }
})
router.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        let user = await User.findOne({ email })
        if (!user) {
            console.log("user not found")
            return res.status(404).json({ message: "User not found" })

        }
        let isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            console.log("password wrong")
            return res.status(404).json({ message: "Invalid Credentials" })
        }
        const payload = {
            user: {
                id: user._id,
                name: user.name
            }
        }
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" }, (error, token) => {
            if (error) throw error
            res.json({ token })
        })
    } catch (error) {
        return res.status(500).send('Server Error')
    }

})
module.exports = router;
