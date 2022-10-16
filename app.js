require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

// router
const sendEmailRouter = require('./routes/sendEmailRoutes')

// error handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(express.json())

// routes
app.get('/', (req, res) => {
  res.send(
    '<h1>Node Send Email Project</h1><a href="/send-email/local">Click me to Send an Email using Fake Local SMTP Provider!</a>'
  )
})

app.use('/send-email', sendEmailRouter)
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5001

const start = async () => {
  try {
    app.listen(port, () => console.log(`Server is listening on PORT: ${port}`))
  } catch (error) {
    console.log(error)
  }
}

start()
