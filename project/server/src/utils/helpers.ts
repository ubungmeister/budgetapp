
const nodemailer = require("nodemailer");

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kidbugetapp@gmail.com',
        pass: 'xrwneibpcoeiwkwe'
  }
    });
