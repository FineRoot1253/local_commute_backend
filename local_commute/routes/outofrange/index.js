var express = require("express");
const createOutOfRangeUser = require("../../lib/outofrange/createOutOfRangeUser");
var router = express.Router();

router.post('/oor',createOutOfRangeUser);
//req.body
module.exports = router;