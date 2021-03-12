var express = require("express");
const loginSuccess = require('../../lib/auth/auth').loginSuccess;
const loginFailed = require('../../lib/auth/auth').loginFailed;
const tokenLoginSuccess = require('../../lib/auth/auth').tokenLoginSuccess;
const tokenLoginFailed = require('../../lib/auth/auth').tokenLoginFailed;
const logout = require('../../lib/auth/auth').logout;
const refreshToken = require('../../lib/auth/auth').refreshToken;
const passport = require('passport');

var router = express.Router();

// 유저 최초 로그인(Basic Login)
router.get('/initLogin',
    passport.authenticate('basic', 
    {successRedirect: '/auth/login/successed', failureRedirect: '/auth/login/failed' }),
);

// 유저 토큰 로그인(Bearer Login, 자동 로그인 기능)
router.get('/tokenLogin',
    passport.authenticate('bearer', 
    {successRedirect: '/auth/login/token/successed', failureRedirect: '/auth/login/token/failed' ,failureFlash: true}),
);

// 유저 엑세스 토큰 재생성 요청
router.post('/token', refreshToken);

// 유저 최초 로그인 성공
router.get('/login/successed', loginSuccess)

// 유저 최초 로그인 실패
router.get('/login/failed', loginFailed);

// 유저 토큰 로그인 성공
router.get('/login/token/successed', tokenLoginSuccess)

// 유저 토큰 로그인 실패
router.get('/login/token/failed', tokenLoginFailed);

// 유저 로그아웃
router.post('/logout', logout);

module.exports = router;