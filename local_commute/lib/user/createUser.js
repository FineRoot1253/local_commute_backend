const User = require("../../models").user;
const bcrypt = require('bcrypt');
const token = require('../util/token');
const path = require('path');


const createUser = async (req, res ,next) => {

    //session validate
    if(!req.session.user){
        res.status(401).end();
        return;
    }
    let userID = (+new Date).toString(36).slice(-12);
    //data parsing
    let {
        userId = userID,
        userName = req.session.user.userNm,
        email_addr,
        state,
        comp_id
    } = req.session.user;
    let userPwd = encrypt(req.session.user.userPwd);
    //Create
    const result = await User.create({
        userId : userID,
        userName,
        userPwd,
        email_addr,
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