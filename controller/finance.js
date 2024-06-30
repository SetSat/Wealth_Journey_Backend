const express = require('express')

const router = express.Router();

const Income = require('../model/incomemodel.js')
const Expence = require('../model/expencemodel.js')
const verifyToken = require('../middleware/authreq.js')

router.post('/income', verifyToken, async (req, res) => {
    const { amount, description } = req.body;
    const userId = req.user.user.id;

    try {
        const newIncome = new Income({ userId, income: amount, description });
        await newIncome.save();
        res.status(201).json(newIncome);
    } catch (error) {
        res.status(500).json({ message: 'Failed to add income', error });
    }
});


router.post('/expense', verifyToken, async (req, res) => {
    const { amount, description } = req.body;
    const userId = req.user.user.id;

    try {
        const newExpense = new Expence({ userId, income: amount, description });
        await newExpense.save();
        res.status(201).json(newExpense);
    } catch (error) {
        res.status(500).json({ message: 'Failed to add expense', error });
    }
});


router.get('/income', verifyToken, async (req, res) => {
    const userId = req.user.user.id;

    try {
        const incomes = await Income.find({ userId }).sort({ date: -1 });
        res.status(200).json(incomes);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve incomes', error });
    }
});


router.get('/expense', verifyToken, async (req, res) => {
    const userId = req.user.user.id;

    try {
        const expenses = await Expence.find({ userId }).sort({ date: -1 });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve expenses', error });
    }
});

module.exports = router;