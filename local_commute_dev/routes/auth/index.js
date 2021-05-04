var express = require("express");
const loginSuccess = require('../../lib/auth/auth').loginSuccess;
const loginFailed = require('../../lib/auth/auth').loginFailed;
const tokenLoginSuccess = require('../../lib/auth/auth').tokenLoginSuccess;
const tokenLoginFailed = require('../../lib/auth/auth').tokenLoginFailed;
const logout = require('../../lib/auth/auth').logout;
const refreshToken = require('../../lib/auth/auth').refreshToken;
const passport = require('passport');

var router = express.Router();

// 유저 최초 로그인(Basic Login) ok
router.get('/initLogin',
    function (req, res, next) {
        passport.authenticate('basic', function (err, user, info) {
            console.log("유저 확인",user);
            console.log("에러 인포",info)
            if (err) {
                res.statusCode(500).send('???');
            } else if (info) {
                res.redirect('/auth/login/failed');
            } else {
                req.login(user, function (err) {
                    if (err) {
                        console.log("에러 인포",err)
                        res.sendStatus(500);
                    } else {
                        console.log("유저 이메일",user.email_addr)
                        req.body.user=user;
                        //req.user.email_addr = user.email_addr;
                        next();
                    }
                }
                )}
        })(req, res, next);
},loginSuccess);

//퍼미션 체크용 ok
router.get('/permCheck',
    function (req, res, next) {
        return res.send();
});

// 유저 토큰 로그인(Bearer Login, 자동 로그인 기능) ok
router.get('/tokenLogin',
    passport.authenticate('bearer',
        { successRedirect: '/auth/login/token/successed', failureRedirect: '/auth/login/token/failed', failureFlash: true }),
);

// 유저 엑세스 토큰 재생성 요청 ok
router.post('/token', refreshToken);

// 유저 최초 로그인 성공 ok
router.get('/login/successed', loginSuccess);

// 유저 최초 로그인 실패 ok
router.get('/login/failed', loginFailed);

// 유저 토큰 로그인 성공 ok
router.get('/login/token/successed', tokenLoginSuccess)

// 유저 토큰 로그인 실패 ok
router.get('/login/token/failed', tokenLoginFailed);

// 유저 로그아웃 ok
router.post('/logout', logout);

module.exports = router;