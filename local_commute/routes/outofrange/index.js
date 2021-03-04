var express = require("express");
const createOutOfRangeUser = require("../../lib/outofrange/createOutOfRangeUser");
var router = express.Router();

router.post('/',createOutOfRangeUser);
//req.body
module.exports = router;