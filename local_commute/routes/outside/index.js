var express = require("express");
const checkUserOutsideData = require("../../lib/outside/checkUserOutsideData");
const createUserOutsideData = require("../../lib/outside/createUserOutsideData");
const updateUserOutsideData = require("../../lib/outside/updateUserOutsideData");


var router = express.Router();


router.get('/outside/:userId', checkUserOutsideData);
//req.params.userId  

router.post('/outside', createUserOutsideData, checkUserOutsideData);
//req.body  

router.put('/outside/:userId', updateUserOutsideData, checkUserOutsideData);
//req.params.userId, req.body
module.exports = router;