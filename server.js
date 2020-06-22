require('dotenv').config()
const express = require('express')
const cors = require('cors')

const MySql = require('./db')
const Feedback = require('./models/FeedbackModel')
const Verify = require('./models/VerifyModel')
const sendMail = require('./sendMail')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))

app.post('/verify', async (req, res) => {

})

app.post('/feedback', async (req, res) => {
    res.json({ status: 200, message: 'Done' })
})

app.listen(process.env.PORT || 5000, () => console.log(`Server Started on port ${process.env.PORT || 5000}...`))