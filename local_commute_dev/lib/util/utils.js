'use strict';

var { nanoid } = require("nanoid");
const path = require('path');
const fs  = require('fs');
const jwt  = require('jsonwebtoken');

/** Private certificate used for signing JSON WebTokens*/
const privateKey = fs.readFileSync(path.join(__dirname, '../../certs/privatekey.pem'));

/** Public certificate used for verification.*/
const publicKey = fs.readFileSync(path.join(__dirname, '../../certs/certificate.pem'));

exports.createToken = ({ exp = 3600, sub = '' } = {}) =>{
    const token = jwt.sign({
        jti :  nanoid(),
        sub,
        exp: Math.floor(Date.now() / 1000) + exp,
    },privateKey,{
        algorithm: 'RS256'
    });

    return token;
};

exports.verifyTK = token => jwt.verify(token, publicKey);
