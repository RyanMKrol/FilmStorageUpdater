import nodemailer from "nodemailer"
import gmailCredentials from './../../credentials/GmailCredentials.json'

async function sendMail(subject, body) {
  let testAccount = await nodemailer.createTestAccount()
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: gmailCredentials
  })

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"FilmStorageUpdater" <ryankrol.m@gmail.com>',
    to: "ryankrol.m@gmail.com",
    subject: subject,
    text: body,
  })

  console.log("Message sent: %s", info.messageId)
}

export default sendMail
