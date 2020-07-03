const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});
admin.initializeApp();
var CONFIG = require('./config.json');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: CONFIG.GMAIL_USER,
        pass: CONFIG.GMAIL_PASSOWRD
    }
});

exports.sendMail = functions.https.onCall((data, context) => {

    const toEmail = data.toEmail;
    const subject = data.subject;
    const message = data.message
    
    const mailOptions = {
        from: toEmail, 
        to: "florinrususite@gmail.com",
        subject: '[florin-rusu-me]' + subject, // email subject
        html: message + ' from: ' + toEmail
    };

    console.log(mailOptions);
    console.log('A ajuns aci');

    // returning result
    return transporter.sendMail(mailOptions, (erro, info) => {
        if(erro){
            return "Not sent" + erro;
        }
        return 'Sent'
    }); 
});
