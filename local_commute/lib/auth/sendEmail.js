const moment = require('moment');
const nodemailer = require('nodemailer');
const sendEmail = async (req, res, next) => {

    req.session.authId = (+new Date()).toString(36);

    let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            service: 'Gmail',
            auth: {
                user: 'gjhong1129@gmail.com',
                pass: 'Sogo13!#!#'
            }
        });

        let email = req.params.emailAddr;
        let otp = req.session.authId;
        let mailOptions = {
            to: email,
            subject: '[뉴젠 근태 관리]가입 확인 메일 : ',
            html: "<h3>OTP for account verification is </h3>"  + "<h1 style='font-weight:bold;'>" + otp +"</h1>"
        };

        transporter.sendMail(
            mailOptions, (err, info)=>{
                if(err){
                    res.status(401).end();
                    return;
                }

            }
        );
        console.log(req.session.authId);
        return res.status(200).end();
}

module.exports = sendEmail;