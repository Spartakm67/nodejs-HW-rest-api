const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require("dotenv").config();

// const nodemailer = require("nodemailer");
// const { UKR_NET_EMAIL, UKR_NET_PASSWORD } = process.env;
// const nodemailerConfig = {
//   host: "smtp.ukr.net",
//   port: 465,
//   secure: true,
//   auth: {
//     user: UKR_NET_EMAIL,
//     pass: UKR_NET_PASSWORD,
//   }
// };
// const transport = nodemailer.createTransport(nodemailerConfig);
// const email = {
//   from: UKR_NET_EMAIL,
//   to: "kajig63664@pyadu.com",
//   subject: "Verify your email",
//   html: `<a href="">Click to verify your email</a>`
// };
// transport.sendMail(email)
//   .then(() => console.log("Email send successfully"))
//   .catch(error => console.log(error.message));



const authRouter = require("./routes/api/auth-route");
const contactsRouter = require('./routes/api/contacts-route');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use('/api/auth', authRouter);
app.use('/api/contacts', contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message })
});

module.exports = app;
