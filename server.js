require('dotenv').config()
const express = require('express')
const cors = require('cors')

const MySql = require('./db')
const Feedback = require('./models/FeedbackModel')
const sendMail = require('./sendMail')
const random = require('./random')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))

app.post('/verify', async (req, res) => {

    if (!req.body.email.includes('@technonjr.org'))
        return res.status(400).json({ status: 400, message: 'Email ID must be College Email ID!' })

    const foundFeedback = await Feedback.findOne({
        where: {
            email: req.body.email
        }
    })
    if (foundFeedback)
        return res.status(400).json({ status: 400, message: 'You have already taken the survey!' })

    const code = random(6)

    sendMail(req.body.email, 'Your Verification Code for Student Satisfaction Survey', `${code}`)

    res.json({ status: 200, message: 'Verification Code Sent To Your Email!', code })
})

app.get('/feedback', async (req, res) => {
    if (req.query.apiKey !== process.env.API_KEY)
        return res.status(401).json({ status: 401, message: 'Not Allowed!' })
    try {
        const foundFeedbacks = await Feedback.findAll()
        res.json({ status: 200, message: 'List of All Feedbacks!', data: { feedbacks: foundFeedbacks } })
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.toString() })
    }
})

app.post('/feedback', async (req, res) => {
    try {
        await Feedback.create(req.body)
        res.status(201).json({ status: 201 })
    } catch (err) {
        if (err.name === 'SequelizeUniqueConstraintError')
            return res.status(400).json({ status: 400, message: 'You have already taken the survey!' })
        console.log(err)
        res.status(500).json({ status: 500, message: err.toString() })
    }
})

app.listen(process.env.PORT || 5000, () => console.log(`Server Started on port ${process.env.PORT || 5000}...`))