var express = require("express");
const checkUserOutsideData = require("../../lib/outside/checkUserOutsideData");
const createUserOutsideData = require("../../lib/outside/createUserOutsideData");
const updateUserOutsideData = require("../../lib/outside/updateUserOutsideData");


var router = express.Router();

// 유저 외근 정보 조회
router.get('/:userId', checkUserOutsideData);
//req.params.userId  

// 유저 외근 정보 생성
router.post('/', createUserOutsideData);
//req.body  

// 유저 외근 정보 업데이트
router.put('/:userId', updateUserOutsideData, checkUserOutsideData);
//req.params.userId, req.body
module.exports = router;