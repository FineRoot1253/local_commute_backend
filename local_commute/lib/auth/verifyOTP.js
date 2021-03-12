const verifyOTP = async (req, res, next) => {

    if(!req.params.otp && req.session.otp != req.params.authId){
        res.status(401).end();
        return;
    }

    next();
    

}

module.exports = verifyOTP;

