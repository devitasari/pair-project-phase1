'use strict';

const nodemailer = require('nodemailer');

function mailSender(email){
    let transport = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: 'doclocdevandre@gmail.com',
            pass: 'doclochacktiv8'
        }
    })
    
    let message = {
        from: 'doclocapp@gmail.com',
        to: email,
        subject: 'We Have Received Your Appointment',
        text: 'We have received your appointment, please refer to your home page on your app to check the details of the appointment. We will let you know the further updates.'
    }
    
    
    transport.sendMail(message, (err, info)=>{
    })

}

module.exports = mailSender