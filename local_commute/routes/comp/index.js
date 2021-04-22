var express = require("express");
const readCompList = require("../../lib/comp/readCompList").readCompList;
const readComp = require("../../lib/comp/readCompList").readComp;
const createComp = require("../../lib/comp/createComp");
const updateComp = require("../../lib/comp/updateComp");


var router = express.Router();

// 회사 정보 리스트 읽기 ok
router.get('/list/:comp_name', readCompList);
//req.params.userId

// 회사 정보 읽기 ok
router.get('/:compId', readComp);
//req.params.userId

// 회사 생성 요청 ok
router.post('/register', createComp);
//req.params.userId

// 회사 정보 업데이트 ok
router.put('/:compId', updateComp);
//req.params.userId




module.exports = router;