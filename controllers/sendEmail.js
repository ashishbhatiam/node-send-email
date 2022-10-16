const nodemailer = require('nodemailer')
const { StatusCodes } = require('http-status-codes')

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

module.exports = {
  sendEmailEthereal
}
