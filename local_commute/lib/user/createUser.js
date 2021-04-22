const User = require("../../models").user;
const bcrypt = require('bcrypt');
const token = require('../util/token');
const path = require('path');


const createUser = async (req, res ,next) => {


   let {
        email_addr,
        user_type,
        userName = req.body.userNm,
        userPwd,
        state
    } = req.body;
    let userPwd_after_encrypt = encrypt(userPwd);
    //Create
    const result = await User.create({
        email_addr,
        user_type,
        userName,
        userPwd : userPwd_after_encrypt,
        state,
        comp_id : undefined
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
        console.log("생성후 리턴 예상 값 : ",returnValue);
        return res.send(returnValue);        
    }

    throw new Error('Error User create');

}

const createUserImage = async (req, res ,next) => {

    const file = req.file

    if (!file) {
      res.status(500).end();
      return ;
    }

    req.body.userProfileImagePath = file.path;
    if(req.method == "PUT") req.body.updateMode = true;

    next();
}

function encrypt(text){
    console.log(text);
    return bcrypt.hashSync(text, 10);
}

// const same = bcrypt.compareSync(password, encodedPassword)

module.exports = {createUser, createUserImage};