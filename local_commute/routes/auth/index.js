var express = require("express");
// const checkUserValid = require("../../lib/auth/checkUserVaild");
// const registerUser = require("../../lib/auth/registerUser");
const sendEmail  = require("../../lib/auth/sendEmail");
var router = express.Router();

router.get('/:emailAddr', sendEmail);

// router.post('/register', checkUserValid, registerUser);
//req.body
module.exports = router;