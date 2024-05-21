const ejs = require('ejs');
const nodemailer = require("nodemailer");
const path = require('path');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'srikotigadwali@gmail.com',
    pass: 'angprmspjsamzzhj'
  }
});

let renderTemplate = (data, relativePath) => {
  return new Promise((resolve, reject) => {
    ejs.renderFile(
      path.join(__dirname, '../mailers', relativePath),
      data,
      function (err, template) {
        if (err) {
          console.log('Error in rendering template:', err);
          reject(err);
        } else {
          resolve(template);
        }
      }
    );
  });
};

module.exports = {
  transporter: transporter,
  renderTemplate: renderTemplate
};