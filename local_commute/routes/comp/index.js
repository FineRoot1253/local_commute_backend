var express = require("express");
const readCompList = require("../../lib/comp/readCompList").readCompList;
const readComp = require("../../lib/comp/readCompList").readComp;


var router = express.Router();

// 회사 정보 리스트 읽기
router.get('/list/:comp_name', readCompList);
//req.params.userId

// 회사 정보 읽기
router.get('/:compId', readComp);
//req.params.userId






module.exports = router;