const nodemailer = require('nodemailer');

/*
 * sendEmail
 */

exports.sendEmail = async ({ from, message, subject, to }) => {
  try {
    return await transporter.sendMail({ from, message, subject, to });
  } catch(error) {
    console.log('Email transporter not configured.');
    console.log(error);
  }
};
