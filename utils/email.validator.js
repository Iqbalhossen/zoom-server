const nodemailer = require("nodemailer");
require("dotenv").config();
var moment = require("moment");
const sendForgotPasswordEmail = async (email, token) => {
  const date = new Date();
  const dateFormate = moment(date).format("MM-DD-YYYY, h:mm:ss a");
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
  try {
    const transpoter = nodemailer.createTransport({
      port: 587,
      host: "smtp.gmail.com",
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOption = {
      from: {
        name: "Task Ltd",
        address: process.env.EMAIL,
      },
      to: email,
      subject: `[Task Ltd] password reset link - ${dateFormate}`,
      //   text:'',
      html: `<p>password reset link: <a href=${resetLink}>Click to reset</a></p> `,
    };

    transpoter.sendMail(mailOption, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        // console.log('email send', info.response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sendForgotPasswordEmail };

