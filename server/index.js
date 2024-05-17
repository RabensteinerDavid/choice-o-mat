const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./db')
const questionRouter = require('./routes/question-router')

const app = express()
const apiPort = 3001

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())
app.use('/images', express.static('public/images'))
app.use('/lottie', express.static('public/lottie'))

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
  res.send('Server is running')
})

app.use('/api', questionRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))