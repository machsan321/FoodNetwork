const nodemailer = require("nodemailer");
var dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_ADD,
    pass: process.env.GMAIL_PASS,
  },
});

export function sendEmail(email_add: string, token: string) {
  const mailOptions = {
    from: process.env.GMAIL_ADD,
    to: email_add,
    subject: "FoodNetwork Confirmation Email",
    text: `http://localhost:${process.env.PORT}/confirmation/${token}`
  };

  transporter.sendMail(mailOptions, function (error: any, info: any) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
