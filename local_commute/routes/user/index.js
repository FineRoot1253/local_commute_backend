var express = require("express");
const checkUser = require("../../lib/user/checkUser");
const createUser = require("../../lib/user/createUser");
const updateUser = require("../../lib/user/updateUser");
const deleteUser = require("../../lib/user/deleteUser");
var router = express.Router();

router.get('/user/:userId', checkUser);
//req.params.userId

router.post('/user', createUser, checkUser);
//req.body


router.put('/user/:userId', updateUser, checkUser);
//req.params.userId, req.body

router.delete('/user/:userId', deleteUser);
//req.params.userId

module.exports = router;