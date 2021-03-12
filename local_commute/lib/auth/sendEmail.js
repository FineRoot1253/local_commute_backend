const moment = require('moment');
const nodemailer = require('nodemailer');

/**
 * [authorization 서버 전용] 가입 시도 유저 유효성 성공시 경로 
 * 확인 이메일 전송
 */
const sendEmail = async (req, res, next) => {

    let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            service: 'Gmail',
            auth: {
                user: 'gjhong1129@gmail.com',
                pass: 'Mayora14!$!$'
            }
        });

        let email = req.session.email_addr;
        console.log(email);
        console.log(req.session.otp);
        let otp = req.session.otp;
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
        return res.status(200).end();
}

module.exports = sendEmail;