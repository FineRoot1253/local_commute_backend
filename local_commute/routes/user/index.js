var express = require("express");
const readUser = require("../../lib/user/readUser").readUser;
const createUser = require("../../lib/user/createUser");
const updateUser = require("../../lib/user/updateUser");
const deleteUser = require("../../lib/user/deleteUser");
const checkUserVaild = require("../../lib/auth/checkUserValid");
const verifyOTP = require("../../lib/auth/verifyOTP");
const sendEmail = require('../../lib/auth/sendEmail');
var router = express.Router();

// 유저정보 읽기
router.get('/:userId', readUser);
//req.params.userId

// 가입 전 유저 체크
router.post('/verify', checkUserVaild, sendEmail);
//req.body

/** 유저 가입
 *  필요 조건 
 *      1) 가입전 유저 체크로 세션이 유지 되어 d야함
*/
router.get('/register/:authId', verifyOTP, createUser);
 
// 유저정보 업데이트
router.put('/:userId', updateUser, readUser);
//req.params.userId, req.body

////////////////////////////////////////////

//유저 삭제
router.delete('/:userId', deleteUser);
//req.params.userId

module.exports = router;