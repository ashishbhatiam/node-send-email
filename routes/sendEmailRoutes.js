const express = require('express')
const sendEmailRouter = express.Router()

const {
  sendEmailEthereal,
  sendEmailSendGrid
} = require('../controllers/sendEmail')

sendEmailRouter.route('/local').get(sendEmailEthereal)
sendEmailRouter.route('/production').get(sendEmailSendGrid)

module.exports = sendEmailRouter
