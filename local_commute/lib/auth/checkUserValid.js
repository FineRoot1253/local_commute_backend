const User = require("../../models").user;

const checkUserValid = async (req, res ,next) => {
    
    if(!req.params.authId && req.session.authId != req.params.authId){
        res.status(401).end();
        return;
    }

    next();

}



module.exports = checkUserValid;