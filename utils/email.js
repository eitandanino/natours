const nodemailer = require('nodemailer');
const pug = require('pug');
const { htmlToText } = require('html-to-text');
const mailjetTransport = require('nodemailer-mailjet-transport');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Tantan <${process.env.EMAIL_FROM}>`;
  }
  newTransport() {
    // if (process.env.NODE_ENV === 'production') {
    if (process.env.NODE_ENV === 'production') {
      // sendgrid didnt work properly so i used mailjet is a lot faster and better
      return nodemailer.createTransport({
        service: 'Mailjet',
        auth: {
          user: process.env.MAILJET_API_KEY,
          pass: process.env.MAILJET_SECRET_KEY,
        },
      });
    }
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }
  // send the actual email
  async send(template, subject) {
    const html = pug.renderFile(
      `${__dirname}/../views/emails/${template}.pug`,
      {
        firstName: this.firstName,
        url: this.url,
        subject,
      }
    );

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText(html),
    };

    await this.newTransport().sendMail(mailOptions);
  }
  async sendWelcome() {
    await this.send('welcome', 'Welcome to the Natours Family');
  }
  async sendResetPassword() {
    await this.send(
      'passwordReset',
      'Reset your Password (Valid for 10 minutes)'
    );
  }
};
