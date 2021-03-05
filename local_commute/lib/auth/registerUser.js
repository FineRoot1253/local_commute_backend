const nanoid = require('nanoid');


const registerUser = async (req, res, next) => {
    let authId = nanoid(6);
    req.session.authId = authId;
    


    console.log(nanoid);
    

}

module.exports = registerUser;

