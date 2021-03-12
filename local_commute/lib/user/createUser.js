const User = require("../../models").user;
const bcrypt = require('bcrypt');
const token = require('../util/token');

const createUser = async (req, res ,next) => {

    //session validate
    if(!req.session.user){
        res.status(401).end();
        return;
    }
    //data parsing
    let {
        userId,
        userName = req.session.user.userNm,
        email_addr,
        state,
        onWorkTime,
        offWorkTime
    } = req.session.user;
    let userPwd = encrypt(req.session.user.userPwd);
    //Create
    const result = await User.create({
        userId,
        userName,
        userPwd,
        email_addr,
        state,
        onWorkTime,
        offWorkTime
    });
    /**
     * TODO : find accessToken, need to create if not exists
     * @returns {Object} object is set {user : result.dataValues, accessToken : accessToken, refreshToken: refreshToken}
     */
    let returnValue = Object.create(null);
    returnValue.user = result.dataValues;
    
     const tokens = await token.generateTokens(email_addr);
    
     if (tokens === false) {
        res.status(401).end();
        return;
    }
    if (tokens.length === 1) {
        res.status(401).end();
        return;
    }
    if (tokens.length === 2) {
        returnValue.accessToken = tokens[0];
        returnValue.refreshToken = tokens[1]; 
        return res.send(returnValue);        
    }
    throw new Error('Error User create');
}

function encrypt(text){
    console.log(text);
    return bcrypt.hashSync(text, 10);
}

// const same = bcrypt.compareSync(password, encodedPassword)

module.exports = createUser;