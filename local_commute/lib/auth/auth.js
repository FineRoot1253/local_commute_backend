'use strict';

const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const { Strategy: BearerStrategy } = require('passport-http-bearer');
const token = require('../util/token');
const express = require('express-session');
const validate = require('../util/validate');
const bcrypt = require('bcrypt');
const User = require("../../models").user;

/**
 * [authorization 서버 전용] Passport 전용, 
 * 유저 최초 로그인 (Basic Auth)
 */
passport.use(new BasicStrategy(async (email_addr, password, done) => {

    const userResult = await User.findOne({
        where: {
            email_addr: email_addr
        }
    });

    if (!userResult) done(null, false);
    else if (!bcrypt.compareSync(password, userResult.dataValues.userPwd)) done(null, false);
    else done(null, userResult.dataValues);
}));

/**
 * [authorization 서버 전용] Passport 전용, 
 * 유저 토큰 로그인 (Bearer Auth)
 */
passport.use(new BearerStrategy(async (accessToken, done) => {
    try {
        console.log('토큰 권한 인증 검색');
        let userResult;
        const tokenInfo = await token.findOne(accessToken);
        console.log(`검증시작 : `);
        // console.dir(tokenInfo);
        userResult = await validate.verifyACTK(tokenInfo, accessToken);
        console.log('토큰 인증 성공!');
        done(null, userResult);
    } catch (err) {
        let beforeSending = err.toString().split(':')[1].trim();
        done(null, false, {
            message: beforeSending
        });
    }
}));

/**
 * [authorization 서버 전용] Passport 전용, 
 * 로그인 성공후 일회성 호출, 
 * 세션(req.session.user) 세팅
 */
passport.serializeUser((user, done) => {
    done(null, user.email_addr);
});

/**
 * [authorization 서버 전용] Passport 세션 관리
 * 로그인 성공후 페이지 방문 마다 호출,
 * 유저DB를 매번 조회해 세션에 저장하게 됨,
 */
passport.deserializeUser(async (email_addr, done) => {

    let user = await User.findOne({
        where: {
            email_addr: email_addr
        }
    });
    if (!user) done(err);
    else done(null, user);
});

/**
 * [authorization 서버 전용] 엑세스 토큰 재생성 요청 경로
 */
const refreshToken = async (req, res, next) => {
try{
    var tok = {};

    let refreshToken = req.body.refreshToken;
    let tokenInfo;
    let resultVerifiy;

    tokenInfo = await token.findOne(refreshToken);

    resultVerifiy = validate.verifyRFTK(tokenInfo, refreshToken);

    let accessToken = await token.generateACToken(resultVerifiy.email_addr);
    
    tok.access_token = accessToken;
    tok.refresh_token = refreshToken;

    var json = JSON.stringify(tok);
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Pragma', 'no-cache');
    return res.json(json);
}catch(err){
    return res.status(401).send('NEED BASIC LOGIN');
}

}

/**
 * [authorization 서버 전용] Basic 로그인 성공시 경로
 */
const loginSuccess = async (req, res, next) => {
    let tokens = await token.generateTokens(req.user.email_addr);
    var tok = {};
    tok.access_token = tokens[0];
    tok.refresh_token = tokens[1];

    var json = JSON.stringify(tok);
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Pragma', 'no-cache');
    return res.json(json);
};

/**
 * [authorization 서버 전용] Basic 로그인 실패시 경로
 */
const loginFailed = (req, res, next) => {
    return res.sendStatus(401);
};

/**
 * [authorization 서버 전용] 로그아웃 경로
 */
const logout = async (req, res, next) => {
    let { accessToken, refreshToken } = req.body;
    token.revokeTokens(accessToken, refreshToken);
    req.session=null;
    req.logout();

    return res.sendStatus(200);
};

/**
 * [authorization 서버 전용] 토큰 로그인 성공시 경로
 */
const tokenLoginSuccess = async (req, res, next) => {
    return res.sendStatus(200);
};

/**
 * [authorization 서버 전용] 토큰 로그인 실패시 경로
 */
const tokenLoginFailed = (req, res, next) => {
    console.log(`에러 메시지 전송 직전 파싱 직전 : ${req.session.flash.error[0]}`);
    var dump = req.session.flash.error[0].split(',')[2].split('=')[1];
    let msg = dump.substring(1, dump.length - 1)
    return res.status(403).send(msg);
};

module.exports = { loginSuccess, loginFailed, refreshToken, logout, tokenLoginSuccess, tokenLoginFailed };