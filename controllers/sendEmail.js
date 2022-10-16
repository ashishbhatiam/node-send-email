const nodemailer = require('nodemailer')
const { StatusCodes } = require('http-status-codes')
const sgMail = require('@sendgrid/mail')

const sendEmailEthereal = async (req, res) => {
  const transporter = await nodemailer.createTransport({
    host: process.env.SMTP_LOCAL_INFO_HOST,
    port: process.env.SMTP_LOCAL_INFO_PORT,
    auth: {
      user: process.env.SMTP_LOCAL_INFO_AUTH_USER,
      pass: process.env.SMTP_LOCAL_INFO_AUTH_PASSWORD
    }
  })

  const info = await transporter.sendMail({
    from: `"Node Email Sender" <${process.env.SMTP_LOCAL_INFO_AUTH_USER}>`, // Authorized Sender Email
    to: process.env.SMTP_LOCAL_INFO_AUTH_USER, // Recipient Email
    subject: 'Test Mail from Node Email Sender', // Subject line
    text: "Hey there, it's an Test Mail from Node Email Sender.", // plain text body
    html: "Hey there, it's an <i>Test Mail</i> from <b>Node Email Sender</b>." // html body
  })

  res.status(StatusCodes.OK).send('Hurray, Email Send Successfully!')
}

const sendEmailSendGrid = async (req, res) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)

  const msg = {
    to: process.env.SMTP_CLOUD_SENDER, // Recipient Email
    from: process.env.SMTP_CLOUD_SENDER, // Authorized Sender Email
    subject: 'Test Mail from Node Email Sender', // Subject line
    text: "Hey there, it's an Test Mail from Node Email Sender.", // plain text body
    html: "Hey there, it's an <i>Test Mail</i> from <b>Node Email Sender</b>." // html body
  }

  await sgMail.send(msg)
  res.status(StatusCodes.OK).send('Hurray, Email Send Successfully!')
}

module.exports = {
  sendEmailSendGrid,
  sendEmailEthereal
}
