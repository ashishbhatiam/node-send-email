const express = require('express')
const sendEmailRouter = express.Router()

const {
  sendEmailEthereal
} = require('../controllers/sendEmail')

sendEmailRouter.route('/local').get(sendEmailEthereal)

module.exports = sendEmailRouter
