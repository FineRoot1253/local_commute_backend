var express = require("express");
const checkUserOutsideData = require("../../lib/outside/checkUserOutsideData");
const createUserOutsideData = require("../../lib/outside/createUserOutsideData");
const updateUserOutsideData = require("../../lib/outside/updateUserOutsideData");


var router = express.Router();

// 유저 외근 정보 조회 ok
router.get('/:email_addr', checkUserOutsideData);
//req.params.userId  

// 유저 외근 정보 생성 ok
router.post('/', createUserOutsideData);
//req.body  

// 유저 외근 정보 업데이트 ok
router.put('/', updateUserOutsideData, checkUserOutsideData);
//req.body
module.exports = router;