const verifyOTP = async (req, res, next) => {

    console.log("OTP 세션 확인 : ",req.session.otp);
    console.log("OTP 파라미터 확인 : ",req.params.otp);

    if(!req.params.otp || req.session.otp != req.params.otp){

        res.status(401).end();
        return;
    }

    return res.status(200).end();    

}

module.exports = verifyOTP;

