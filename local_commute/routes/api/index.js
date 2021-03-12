var express = require("express");
const validate = require('../../lib/util/validate');

var router = express.Router();

// 유저 최초 로그인(Basic Login)

router.get('/verifyFailed',(req, res)=>{
    return res.status(403).send('NEED REFRESH');
});

module.exports = router;