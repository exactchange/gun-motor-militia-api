/*
 * PlayBlacklisted
 * sendEmail
 */

const { GMAIL_SECRET } = process.env;
const nodemailer = require('nodemailer');

try {
  const transporter = nodemailer.createTransport(GMAIL_SECRET);
} catch(error) {
  console.log('Failed to configure an email transporter.');
  console.log(error);
}

exports.sendEmail = async ({ from, message, subject, to }) => {
  try {
    return await transporter.sendMail({ from, message, subject, to });
  } catch(error) {
    console.log('Email transporter not configured.');
    console.log(error);
  }
};
