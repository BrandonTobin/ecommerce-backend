const express = require("express");
const app = express();

const cors = require('cors')
const morgan = require('morgan')

const gameController = require('./controllers/gameController')
const reviewController = require('./controllers/reviewController')
const authController = require('./controllers/authController')


require("dotenv").config();
require("./config/db.connection")

const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.use('/game', gameController)
app.use('/review', reviewController)
app.use('/auth', authController)
app.get('/', (req, res) => res.redirect('/game'))

app.listen(PORT, () => {
  console.log(`listening on: ${PORT}`)
})