import nodemailer from 'nodemailer';
const email = process.env.EMAIL;
const pass = process.env.EMAIL_PASS;

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: email,
    pass: pass,
  },
});

export const mailOptions = {
  from: 'dorplaut@gmail.com',
  to: 'dorplaut@gmail.com',
  subject: 'Hello ✔', // Subject line
  text: 'Hello world?', // plain text body
  html: '<b>Hello world?</b>', // html body
};
