var express = require("express");
const createOutOfRangeUser = require("../../lib/outofrange/createOutOfRangeUser");
var router = express.Router();

// 이탈 유저 기록 생성 ok
router.post('/',createOutOfRangeUser);
//req.body
module.exports = router;